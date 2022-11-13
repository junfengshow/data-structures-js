import React, { useRef, useEffect, useState } from 'react';
import { position, offset } from 'caret-pos';
import c from './demo01.less';
import MsgEdit from '../components/MsgEdit';

import ContentEditable from 'react-contenteditable'

const _style = {
  padding: 10,
  border: '1px solid #ddd',
  borderRadius: 6
}

let lastSelection: any;
let lastNodes: any;

const Demo01 = () => {
  const txRef = useRef();
  const [value, setValue] = useState(`初始值`); 
  const [wordsCount, setWordsCount] = useState(() => {
    return value.length;
  });

  useEffect(() => {
    const node: any = txRef.current;
    if (!node) {
      return;
    }
    node.addEventListener('input', () => {
      console.log('this is click')
    });
  }, [])
  const onContentChange = (e: any) => {
    lastNodes = txRef.current.innerHTML;
    
    // 删除的按键
    if (e.keyCode === 8) {
      if (!lastSelection) {
        return;
      }
      const node = txRef.current;
      // 删除逻辑 
      // 1 ：由于在创建时默认会在 xxx 后添加一个空格，
      // 所以当得知光标位于 xxx 之后的一个第一个字符后并按下删除按钮时，
      // 应该将光标前的 xxx 给删除
      // 2 ：当光标位于 xxx 中间时，按下删除按钮时应该将整个 xxx 给删除。
      
      let range = window.getSelection()?.getRangeAt(0);
      let removeNode: any = null;
      if (!range) {
        return;
      }
      
      if (range.startOffset <= 1 && range?.startContainer?.parentElement?.className !== "at-text") {
        removeNode = range.startContainer.previousElementSibling;
      }
        
      if (range.startContainer?.parentElement?.className == "at-text") {
        removeNode = range.startContainer.parentElement;
      }

      console.log(removeNode)
      console.log('range.startOffset: ', range.startOffset)
      console.log('range.startContainer: ', range.startContainer)
      console.log('range.startContainer.parentElement: ', range.startContainer.parentElement)
          
      if (removeNode) {
        setTimeout(() => {
          node.removeChild(removeNode);
        })
        calculateCount();
      }

      if (range?.startContainer?.parentElement?.className === 'at-span') {
        console.log(range.startContainer.parentElement.innerText, range.startContainer.parentElement.innerText === '#客户名称#')
        setTimeout(() => {
          const pos = position(txRef.current);
          const oSpan = document.createElement('strong');
          oSpan.className = 'at-text'
          // const oText = document.createTextNode(range.startContainer.parentElement.innerText);
          oSpan.innerHTML = range?.startContainer?.parentElement?.innerText || '';
          txRef.current.insertBefore(oSpan, range?.startContainer.parentElement)
          txRef.current.removeChild(range.startContainer.parentElement);
          position(txRef.current, pos.pos)
          calculateCount();
        })
      }
      return;
    } 
    if (!lastSelection?.anchorNode) {
      calculateCount();
      return;
    }
    let range = lastSelection.getRangeAt(0);
    if (
      range.startContainer.parentElement.className === 'at-text' &&
      range.startContainer.parentElement.innerText !== '#客户名称#'
    ) {
      
      setTimeout(() => {
        const pos = position(txRef.current);
        const oSpan = document.createElement('span');
        oSpan.className = 'at-span'
        // const oText = document.createTextNode(range.startContainer.parentElement.innerText);
        oSpan.innerHTML = range.startContainer.parentElement.innerText;
        txRef.current.insertBefore(oSpan, range.startContainer.parentElement)
        txRef.current.removeChild(range.startContainer.parentElement);
        position(txRef.current, pos.pos)
        calculateCount();
      })

    } else {
      calculateCount();
    }
    
    // console.log(range.startOffset)
    //   console.log(range.startContainer.parentElement)
    // if () {

    // }
    // console.log(e)
    // setValue(e.nativeEvent.target.value)
  }

  const onBtnClick = () => {
    // focus
    const node = txRef.current;
    if (!node) {
      return;
    }
    const selection = lastSelection = window.getSelection();
    if (!selection?.anchorNode) {
      return;
    }
    const range = selection?.getRangeAt(0);

    // const posObj = position(node);
    // const off = offset(node);

    if (range.startContainer.parentElement?.className === 'at-text') {
      return;
    }
  
    // 光标位置
    // const cursorPosition = posObj.pos;

    const strong = document.createElement('strong');
    strong.className = 'at-text';
    strong.innerHTML = '#客户名称#';
    
    const empty = document.createElement('span');
    empty.innerHTML = '&nbsp;';

    const before = document.createElement('span');
    before.innerHTML = '&nbsp;';

    // 将生成内容打包放在 Fragment 中，并获取生成内容的最后一个节点，也就是空格。
    let frag = document.createDocumentFragment(),
        xNode, bNode, lastNode;
    // frag.appendChild(empty.firstChild);
    while ((bNode = before.firstChild)) {
      frag.appendChild(bNode);
    }
    frag.appendChild(strong);
    while ((xNode = empty.firstChild)) {
      lastNode = frag.appendChild(xNode);
    }
    // console.log(lastNode)
    // 将 Fragment 中的内容放入 range 中，并将光标放在空格之后。
    range?.insertNode(frag);
    selection?.extend(frag, 1);
    selection?.collapseToEnd();
    // position(node, 3);

    // console.log(node.innerText)
    calculateCount();
  }

  const calculateCount = () => {
    const node: any = txRef.current;
    if (!node) {
      return;
    }
    const innerText = node.innerText;
    console.log('innerText', innerText)
    setWordsCount(innerText.length)
  }

  const contentEditableRef = useRef();
  const [stateHtml, setStateHtml] = useState('');
  const handleChange = (e: any) => {
    let value = e.target.value;
    if (value.length > 10) {
      // value = stateHtml;
      // contentEditableRef.current?.blur();
      const pos = position(contentEditableRef.current);
      contentEditableRef.current.innerHTML = stateHtml;
      // contentEditableRef.current?.focus();
      position(contentEditableRef.current, pos.pos - 1);
      console.log(pos)
      return;
    }
    setStateHtml(value)
  }

  const [msgHtml, setMsgHtml] = useState('');

  return (
    <>
      <div 
        contentEditable 
        onKeyDown={onContentChange} 
        onInput={() => {
          console.log('onInput', lastNodes !== txRef.current.innerText)
          if (wordsCount > 10 && lastNodes !== txRef.current.innerText) {
            // txRef.current.innerHTML = lastNodes;
            return;
          }
        }}
        style={_style} 
        dangerouslySetInnerHTML={{__html: value}} 
        ref={txRef}
        className={c.container}
      />

      <div>
        <a onClick={onBtnClick} style={{userSelect: 'none', cursor: 'pointer'}}>#客户名称#</a>
        <span>{wordsCount}</span>
      </div>
      <ContentEditable 
        innerRef={contentEditableRef}
        html={stateHtml} 
        disabled={false} 
        onChange={handleChange} 
        tagName='div' 
        style={{
          height: 300, 
          width: 600, 
          border: '1px solid #888', 
          borderRadius: 6, 
          padding: 10
        }}
      />
      <div style={{height: 20}}></div>
      <h3>msgEdit</h3>
      <MsgEdit 
        value={msgHtml}
        onChange={setMsgHtml}
      />
    </>
  )
}
export default Demo01;
