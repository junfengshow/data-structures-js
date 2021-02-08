import React, { Component } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
const mdParser = new MarkdownIt(/* Markdown-it options */);
const _md = `
## 数据结构优缺点
| 数据结构 | 优点 | 缺点 |
| :-------: | ---- | -- |
| 数组 | 插入快，如果知道下标，可以非常快的存取 | 查找慢、删除慢、大小固定 |
| 有序数组 | 比无序数组查找快 | 删除和插入慢，大小固定 |
| 栈 | 提供后进先出方式的存取 | 存取其他项很慢 |
| 队列 | 提供先进先出方式的存取 | 存取其他项很慢 |
| 链表 | 插入快，删除快 | 查找慢 |
| 二叉树 | 查找，插入，删除都快（如果树保持平衡） | 删除算法复杂 |
| 红-黑树 | 查找，插入，删除都快，树总是平衡的 | 算法复杂 |
| 2-3-4树 | 查找，插入，删除都快，树总是平衡的，类似的树对磁盘存储有用 | 算法复杂 |
| 哈希表 | 如果关键字已知则存取极快，插入快 | 删除慢，如果不知道关键词则存取很慢，对存储空间使用不充分 |
| 堆 | 插入删除快，对最大数据项的存取很快 | 对其他数据项存取慢 |
| 图 | 对现实世界建模 | 有些算法慢且复杂 |

## 常见的数据结构
+ [栈](/foundation/stack)
+ [队列](/foundation/queue)
+ [链表](/foundation/linked-list/list-0-index)
+ [集合](/foundation/set/set-0-index)
+ [字典和散列表](/foundation/map/map-0-index)
+ [树](/tree-graph/tree/tree-0-intro)
+ [图](/tree-graph/graph/graph-1)

## 算法简介
+ [算法模式](/calculation/mode)
+ [算法复杂度](/calculation/complexity)

## 数组排序
+ [冒泡](/calculation/sort)
+ [选择](/calculation/sort)
+ [插入](/calculation/sort)
+ [归并](/calculation/sort)
+ [快速](/calculation/sort)
+ [堆排序](/calculation/sort)
+ [计数排序](/calculation/sort)
+ [桶排序](/calculation/sort)
+ [基数排序](/calculation/sort)

![image](https://upload.junfengshow.com/docs/foundation/l1.png)
`

interface StateInterface {
  markdownContent: string,
}
interface PropsInterface {}


class MdDemo extends Component<PropsInterface, StateInterface> {
  editorRef: React.RefObject<any>;
  constructor (props: any) {
    super(props)
    this.state = {
      markdownContent: ''
    }
    this.editorRef = React.createRef()
  }
  componentDidMount () {
    this.editorRef.current.fullScreen(true)
    setTimeout(() => {
      this.setState({
        markdownContent: _md
      })
      
      // console.log(this.editorRef.current.fullScreen)
    }, 2000)
  }
  handleEditorChange = ({ text }: any) => {    
    this.setState({ markdownContent: text })
  }
  render () {
    
    return (
      <div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.markdownContent}
          ref={this.editorRef}
          // fullScreen={this.fullScreen}
        />
      </div>
    )
  }
}
export default MdDemo
