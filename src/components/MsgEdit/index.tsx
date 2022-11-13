/**
 * 消息模版编辑器
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import ContentEditable from 'react-contenteditable';
import { position } from 'caret-pos';
import { 
  getSelectionAndRange, getRangeParentNode, isRangeInContainer,
  createElement, createInsertNode, replaceName, formatText,
  getTextNodeValue, regStartWithEmpty, regEndWithEmpty,
} from './utils';
import './index.less';

export interface IMsgEditProps {
  value: any;
  onChange: any;
  maxLength?: number;
  insertArray?: string[];
}

let isDeleteKey = false;

const MsgEdit: React.FC<IMsgEditProps> = ({ 
  value='', 
  onChange, 
  maxLength=100,
  insertArray=['#客户名称#', '#员工昵称#']
}) => {
  const editRef = useRef<any>();
  const [editValue, setEditValue] = useState('');
  const valueLen = value.length;
  // todo: 尽量不用ref
  const infoRef = useRef({
    value: value,
    valueLen: value.length,
    editValue: editValue,
  });

  // const reg = new RegExp('(\\s#客户名称#\\s|\\s#用户昵称#\\s)', 'ig');
  const regInsertNames = useMemo(() => {
    return new RegExp(insertArray.map((name) => `\\s${name}\\s`).join('|'), 'ig');
  }, [insertArray]);
  const regInsertNames2 = useMemo(() => {
    return new RegExp(insertArray.map((name) => `${name}`).join('|'), 'ig');
  }, [insertArray]);

  useEffect(() => {
    const node = editRef.current;
    infoRef.current.value = value;
    infoRef.current.valueLen = value.length;
    infoRef.current.editValue = editValue;
    if (node && value && value !== formatText(node.innerText, regInsertNames)) {
      setEditValue(replaceName(value, regInsertNames2));
    }
  }, [value])
  
  // edit change
  const handleChange = (e: any) => {
    let _editValue = e.target.value;
    const currentValue = formatText(editRef.current.innerText, regInsertNames)
    if (value === currentValue) {
      return;
    }
    if (!isDeleteKey && currentValue.length > maxLength) {
      editRef.current.innerHTML = _editValue = replaceName(value, regInsertNames2);
      position(editRef.current, editRef.current.innerText.length);
      setEditValue(_editValue);
      onChange && onChange(value);
      return;
    }
    setEditValue(_editValue);
    onChange && onChange(currentValue);
  }

  // 粘贴
  const handlePaste = (e: any) => {
    e.preventDefault();
		let sourceText = (e.originalEvent || e).clipboardData.getData('text/plain');
    let text = sourceText;
    if (infoRef.current.valueLen + text.length > maxLength) {
      return;
    }
    if (insertArray.some((name) => text.indexOf(name) !== -1)) {
      text = replaceName(text, regInsertNames2);
    }
   
    const _editValue = infoRef.current.editValue + text; 
    setEditValue(_editValue);
    onChange && onChange(infoRef.current.value + sourceText)
  }

  const handleDeleteKeyDown = ({ currentRange, currentSelection }: any) => {
    const node = editRef.current;
    if (!currentSelection || !currentRange || !node) {
      return;
    }
    // 事件循环
    // dom keydown之后 内容变化前
    const prevParentInnerText = currentRange.startContainer.parentElement.innerText;
    // dom keydown之后 内容变化后
    setTimeout(() => {
      const anchorNode = currentSelection.anchorNode;
      if (!anchorNode) {
        return;
      }
      let removeNode: any = null;
      const parentElement = anchorNode.parentElement;
      // delete 1.删除前面的空格需要连带删除插入的内容
      if (anchorNode.nextSibling && anchorNode.nextSibling.className === 'msg-edit-txt') {
        removeNode = anchorNode.nextSibling;
      }
      // delete 2.正常的删除
      if (
        parentElement.className === 'msg-edit-txt' &&
        (
          insertArray.some((name) => prevParentInnerText === name) ||
          insertArray.some((name) => parentElement.innerText.indexOf(name) !== -1)
        )
      ) {
        removeNode = parentElement;
      }
      // delete 存在需要删除的节点
      if (removeNode) {
        // 被删除节点的下一个兄弟节点
        const removeNodeNext = removeNode.nextSibling;
        // 本删除节点的上一个兄弟节点
        const removeNodePre = removeNode.previousSibling;
        // 记录删除之前的光标位置
        const beforeDelPost = position(node).pos;
        // 删除节点
        removeNode.parentNode?.removeChild(removeNode);
        // 记录删除之后的光标位置
        const afterDelPos = position(node).pos;
        // step a.带后面空格删除  ` #客户名称# `
        if (beforeDelPost - afterDelPos === 6) {
          // 连带 自动就删掉了 不需要处理
        } else {
          // 没删除空格 需要手动去删除
          const [selecttion1, range1] = getSelectionAndRange();
          const removeNodeNextVal = getTextNodeValue(removeNodeNext);
          if (regStartWithEmpty.test(removeNodeNextVal)) {
            range1.setStart(removeNodeNext, 0)
            range1.setEnd(removeNodeNext, 1)
            range1.deleteContents();
          }
        }

        // step b.删除前面的空格
        if (removeNodePre) {
          let node2: any = document.createElement('div');
          node2.appendChild(removeNodePre.cloneNode());
          if (regEndWithEmpty.test(node2.innerText)) {
            const [selecttion1, range1] = getSelectionAndRange();
            range1.setStart(removeNodePre, node2.innerText.length - 1)
            range1.setEnd(removeNodePre, node2.innerText.length)
            range1.deleteContents();
          }
        }
        return;
      }
      // reverse 1.需要将span 转为 strong
      if (
        parentElement.className.indexOf('msg-edit-span') !== -1 &&
        insertArray.some((name) => parentElement.innerText === name)
      ) {
        const pos = position(editRef.current);
        const oStrong = createElement(
          'strong',
          'msg-edit-txt',
          parentElement?.innerText || '',
        );
        parentElement.parentNode?.insertBefore(oStrong, parentElement)
        parentElement.parentNode?.removeChild(parentElement);
        position(node, pos.pos)
      }
    });
  }
  const handleKeyDown = (e: any) => {
    const { keyCode } = e;
    const [currentSelection, currentRange] = getSelectionAndRange();
    isDeleteKey = keyCode === 8;
    // 删除的按键
    if (keyCode === 8) {
      return handleDeleteKeyDown({ currentRange, currentSelection });
    }

    // 其它按键
    
    setTimeout(() => {
      const parentElement = getRangeParentNode(currentRange);
      // 当前输入的节点是否是需要插入的节点, 如果是需要转为span去掉高亮
      if (
        parentElement?.className === 'msg-edit-txt' &&
        insertArray.every((name) => parentElement.innerText !== name)
      ) {
        const parentElementContainer = parentElement.parentNode;
        const pos = position(editRef.current);
        const oSpan = createElement(
          'span',
          'msg-edit-span',
          parentElement.innerText,
        );
        parentElementContainer?.insertBefore(oSpan, parentElement)
        parentElementContainer?.removeChild(parentElement);
        position(editRef.current, pos.pos);
      }
    });
  }

  // 点击插入模版
  const onBtnClick = (name: string) => {
    // valueLen + 8
    if (valueLen + name.length > maxLength) {
      editRef.current.focus();
      return;
    }
    // 编辑器node节点
    const node = editRef.current;
    // 得到Selection、Range对象
    const [selection, range] = getSelectionAndRange();
    // 非空判断
    if (!node || !selection || !range) {
      return;
    }
    const parentNode = getRangeParentNode(range);
    
    if (!isRangeInContainer(range, node)) {
      return;
    }
    if (!parentNode || parentNode.className === 'msg-edit-txt') {
      return;
    }
    const anchorNode = selection.anchorNode
    // 删除换行的节点 <div><br></div>
    if (
      anchorNode?.tagName === 'DIV' &&
      anchorNode.className.indexOf('msg-edit-content') === -1
    ) {
      node.removeChild(selection.anchorNode)
    }

    // 创建插入标签 并且前后带空格
    const insertFrag = createInsertNode(name);
    // 将 Fragment 中的内容放入 range 中
    range.insertNode(insertFrag);
    // 并将光标放在空格之后。
    selection.extend(insertFrag, 1);
    selection.collapseToEnd();
    setEditValue(node.innerHTML)
    onChange && onChange(formatText(node.innerText, regInsertNames));
  }

  return (
    <div className='msg-edit'>
      <ContentEditable
        className='msg-edit-content' 
        innerRef={editRef}
        html={editValue} 
        disabled={false} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        tagName='div' 
        onCompositionStart={() => {
          console.log('onCompositionStart')
        }}
        onCompositionEnd={() => {
          console.log('onCompositionEnd')
        }}
        onPaste={handlePaste}
        onFocus={() => {
        
        }}
        onBlur={() => {}}
      />
      <div className='msg-edit-footer'>
        <div className='msg-edit-actions'>
          {
            insertArray?.map((name, i) => (
              <a 
                key={i}
                onClick={() => {
                  onBtnClick(name)
                }} 
              >{name}</a>
            ))
          }
        </div>
        <span>{valueLen}/{maxLength}</span>
      </div>
    </div>
  )
}

export default MsgEdit;