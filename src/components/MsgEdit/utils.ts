
export const regStartWithEmpty = /^\s.?/;
export const regEndWithEmpty = /.?\s$/;
export const getSelectionAndRange = ():any => {
  const selection = window.getSelection();
  if (!selection || !selection.anchorNode) {
    return [selection];
  }
  const range = selection?.getRangeAt(0);
  return [selection, range];
}

export const getRangeParentNode = (range: Range) => {
  return range.startContainer.parentElement;
}

export const isRangeInContainer = (range: Range, node: Element) => {
  let container: any = range.startContainer;
  while (container) {
    if (container === node) {
      return true;
    }
    container = container.parentElement;
  }
  return false;
}

export const createElement = (
  tagName: string,
  className?: string,
  innerHTML?: string,
) => {
  const node = document.createElement(tagName);
  if (className) {  
    node.className = className;
  }
  if (innerHTML) {
    node.innerHTML = innerHTML;
  }
  return node;
}

export const createInsertNode = (name: string) => {
  const insertNode = createElement('strong', 'msg-edit-txt', name);
  const before = createElement('span', 'msg-edit-span', '&nbsp;'); 
  const after = createElement('span', 'msg-edit-span', '&nbsp;'); 

  // 将生成内容打包放在 Fragment 中，并获取生成内容的最后一个节点，也就是空格。
  let frag = document.createDocumentFragment(),
      afterNode, beforeNode, lastNode;
  while ((beforeNode = before.firstChild)) {
    frag.appendChild(beforeNode);
  }
  frag.appendChild(insertNode);
  while ((afterNode = after.firstChild)) {
    lastNode = frag.appendChild(afterNode);
  }
  
  return frag;
}

export const getTextNodeValue = (textNode?: Element) => {
  if (!textNode) {
    return '';
  }
  const node = document.createElement('div');
  node.appendChild(textNode.cloneNode());
  return node.innerText;
}

// text: `真快看到了#客户名称#额尔登#员工昵称#呃呃到底是\n12大大的等等\n`
export const replaceName = (text: string, regInsertNames: RegExp) => {
  const textArray = text.split('\n');
  // text = text.replace(/\n/g, '<div><br></div>');
  let textResult = '';
  textArray.forEach((textFrag: string) => {
    if (!textFrag) {
      textFrag = '<br>'
    }
    if (textResult) {
      textResult += `<div>${textFrag}</div>`;
    } else {
      textResult += textFrag;
    }
  });
  text = textResult;
  return text.replace(regInsertNames, (name) => {
    return `&nbsp;<strong class='msg-edit-txt'>${name}</strong>&nbsp;`
  });
}

export const formatText = (text: string, regInsertNames: RegExp) => {
  // 换行 算成了2/3个字符，这里需要将它替换掉
  if (/.*\n$/g.test(text)) {
    text = text.replace(/.*\n$/g, '');
  }
  // text = text.replace(/\n\n\n?/g, '\n'); 
  return text.replace(regInsertNames, (match: string) => {
    // ` #客户名称# ` 需要去掉空格
    return match.trim();
  });
}
