import React, { useState, useRef, useEffect } from 'react';
import { Transfer, Modal, Button } from 'antd';

const AntdDemo = () => {
  const [modalVisible, setModalVisble] = useState(false);
  const contentRef = useRef<any>();

  useEffect(() => {
    const node = contentRef.current;
    if (!node) {
      return;
    }
    node.addEventListener('keydown', (e: any) => {
      console.log(e.target.value)
			if (e.keyCode !== 8) {
        node.blur();
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
		});
  }, [])

  return (
    <div>
      <h3>antd demo</h3>
      <div 
        contentEditable
        style={{
          height: 200,
          border: '1px solid red',
          padding: 10,
        }}
        ref={contentRef}
        dangerouslySetInnerHTML={{__html: 'kdkdkddk'}}
      />
    </div>
  )
}
export default AntdDemo;
