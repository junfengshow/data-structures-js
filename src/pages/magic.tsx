/**
 * 
 */
import React, { useState, useRef } from 'react';
import c from './magic.module.less';
import { Button, message, Select } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

const winWidth = 375;

const getArray = (counts: number|string) => {
  counts = Number(counts);
  const array = new Array(counts).fill(new Array(counts).fill(0))
  return array;
}
/**
 * 
 * 交换函数，保证开始下标比结束下标要大
 */
const exchangeStartAndEnd = ([startX, endX, startY, endY]: [number, number, number, number]) => {
  let _startRowIdx = startX;
  let _endRowIdx = endX;
  let _startColIdx = startY;
  let _endColIdx = endY;
  if (endX < startX) {
    _startRowIdx = endX;
    _endRowIdx = startX;
  }
  if (endY < startY) {
    _startColIdx = endY;
    _endColIdx = startY;
  }
  return [_startRowIdx, _endRowIdx, _startColIdx, _endColIdx];
}

const Magic = () => {
  const contentRef = useRef<any>();
  const [counts, setCounts] = useState('4');
  const [startItem, setStartItem] = useState({
    x: -1, y: -1
  });
  const [moveItem, setMoveItem] = useState({
    x: -1, y: -1
  });
  const [resultArray, setResultArray] = useState<any[]>([]);
  const [finalArray, setFinallArray] = useState<any[]>();
  const [array, setArray] = useState(getArray(4));
  const cellHeight = winWidth / +counts;

  const onMouseEnter = (rowIdx: number, colIdx: number) => () => {
    if (startItem.x === -1) {
      return;
    }
    let isOk = true;
    resultArray.some(({ startRowIdx, endRowIdx, startColIdx, endColIdx }) => {
      const [
        _startRowIdx, 
        _endRowIdx, 
        _startColIdx, 
        _endColIdx
      ] = exchangeStartAndEnd([startItem.x, rowIdx, startItem.y, colIdx]);

      for (let i = _startRowIdx; i <= _endRowIdx; i++) {
        for (let j = _startColIdx; j <= _endColIdx; j++) {
          if (
            i >= startRowIdx && i <= endRowIdx && 
            j >= startColIdx && j <= endColIdx
          ) {
            isOk = false;
            return true;
          }
        }
      }
      
      return false;
    });
    
    if (!isOk) {
      return;
    }
    setMoveItem({
      x: rowIdx, y: colIdx,
    });
  }

  const onItemClick = (rowIdx: number, colIdx: number) => () => {
    // 1.第一个都还没有
    if (startItem.x === -1) {
      setStartItem({
        x: rowIdx, y: colIdx,
      });
      setMoveItem({
        x: rowIdx, y: colIdx,
      });
      return;
    }
    // 2.再次点击的时候就是选择结束
    const [
      _startRowIdx, 
      _endRowIdx, 
      _startColIdx, 
      _endColIdx
    ] = exchangeStartAndEnd([startItem.x, moveItem.x, startItem.y, moveItem.y]);
    
    setResultArray([...resultArray, {
      startRowIdx: _startRowIdx,
      startColIdx: _startColIdx,
      endRowIdx: _endRowIdx,
      endColIdx: _endColIdx,
    }]);
    setStartItem({
      x: -1, y: -1,
    });
  }

  const onDelete = (idx: number) => () => {
    setResultArray(resultArray.filter((item, i) => i !== idx));
  }

  const getItemClassName = (rowIdx: number, colIdx: number) => {
    if (startItem.x === -1) {
      return c.boxCol;
    }
    
    if (startItem.x === rowIdx && startItem.y === colIdx) {
      return `${c.boxCol} ${c.boxColActive}`;
    }
    const [
      _startRowIdx, 
      _endRowIdx, 
      _startColIdx, 
      _endColIdx
    ] = exchangeStartAndEnd([startItem.x, moveItem.x, startItem.y, moveItem.y]);

    if (
      _endRowIdx >= rowIdx && _startRowIdx <= rowIdx && 
      _startColIdx <= colIdx && _endColIdx >= colIdx
    ) {
      return `${c.boxCol} ${c.boxColActive}`;
    }
    return c.boxCol;
  }
  
  return (
    <div>
      <div>
        <Select
          style={{width: 240}}
          value={counts}
          onChange={(val: string) => {
            setCounts(val)
            setArray(getArray(val));
          }}
        >
          <Select.Option key='4'>4 x 4</Select.Option>
          <Select.Option key='6'>6 x 6</Select.Option>
        </Select>
      </div>
      <div className={c.boxWrap} style={{height: winWidth, width: winWidth}}>
        {
          array.map((rowArray, rowIdx) => (
            <div className={c.boxRow} key={rowIdx}>
              {
                rowArray.map((col: any, colIdx: number) => (
                  <div 
                    className={getItemClassName(rowIdx, colIdx)} 
                    key={colIdx}
                    onMouseEnter={onMouseEnter(rowIdx, colIdx)}
                    onClick={onItemClick(rowIdx, colIdx)}
                    style={{height: cellHeight}}
                  ></div>
                ))
              }
            </div>
          ))
        }
        {
          resultArray.map((item, idx) => {
            let _width = cellHeight * (item.endColIdx - item.startColIdx + 1);
            let _height = cellHeight * (item.endRowIdx - item.startRowIdx + 1);
            let _top = item.startRowIdx * cellHeight;
            let _left = item.startColIdx * cellHeight;
            return (
              <div 
                style={{width: _width , height: _height, top: _top, left: _left}} 
                key={idx} 
                className={c.resultBox}
              >
                {idx}
                <div className={c.resultBoxClose} onClick={onDelete(idx)}>
                  <CloseCircleFilled />
                </div>
              </div>
            )
          })
        }
      </div>

      <div>
        <Button
          type='primary'
          onClick={() => {
            console.log('resultArray', resultArray)
            if (resultArray.length === 0) {
              return;
            }
            
            if (resultArray.every(item => item.endColIdx !== 3)) {
              return message.error('列需要充满');
            }
            let count = 0;
            resultArray.forEach((item) => {
              for (let i = item.startRowIdx; i <= item.endRowIdx; i++) {
                for (let j = item.startColIdx; j <= item.endColIdx; j++) {
                  count += 1;
                }
              }
            });
            if (count % 4 !== 0) {
              return message.error('列需要充满');
            }
            setFinallArray([...resultArray])
          }}
        >校验</Button>
      </div>


      <div className={c.finalWrap}>
        {
          resultArray && resultArray.map((item, idx) => {
            let _width = cellHeight * (item.endColIdx - item.startColIdx + 1);
            let _height = cellHeight * (item.endRowIdx - item.startRowIdx + 1);
            let _top = item.startRowIdx * cellHeight;
            let _left = item.startColIdx * cellHeight;
            return (
              <div 
                style={{width: _width , height: _height, top: _top, left: _left}} 
                key={idx} 
                className={c.finalBox}>
                {idx}
              </div>
            )
          })
        }
      </div>
      <div>
        others
      </div>
    </div>
  )
}
export default Magic;
