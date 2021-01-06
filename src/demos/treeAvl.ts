/**
 * 
 * AVL树
 */
export interface AvlNodeItf<T> {
  key: T;
  pTop?: number;
  pLeft?: number;
  position?: string;
  left: null|AvlNodeItf<T>;
  right: null|AvlNodeItf<T>;
}
export class AvlNode<T> implements AvlNodeItf<T> {
  key: T;
  left: null|AvlNodeItf<T> = null;
  right: null|AvlNodeItf<T> = null;
  constructor (element: T) {
    this.key = element
  }
}

// 先序遍历所有节点
let preOrderTraverse = function<T>(
  node: null|TreeNodeItf<T>, 
  callback?: (key: T) => void
) {
  if(node === null) {
    return
  }
  callback && callback(node.key)
  preOrderTraverse(node.left, callback)
  preOrderTraverse(node.right, callback)
}

interface AvlTreeItf<T> {
  insert (element: T): void;
  // 通过先序遍历的方式遍历所有节点
  preOrderTraverse (callback?: (key: T) => void): void;
}

let heightNode = function<T> (node: null|AvlNodeItf<T>): number {
  if (node === null) {
    return -1
  }
  return Math.max(heightNode<T>(node.left), heightNode<T>(node.right)) + 1
}

const rotationRR = function<T> (node: AvlNodeItf<T>) { 
  let tmp = node.right
  if (!tmp) {
    return tmp
  }
  node.right = tmp.left
  tmp.left = node
  return tmp
}
const rotationLL = function<T> (node: AvlNodeItf<T>) { 
  let tmp = node.left
  if (!tmp) {
    return tmp
  }
  node.left = tmp.right
  tmp.right = node
  return tmp
}
const rotationLR = function<T> (node: null|AvlNodeItf<T>) { 
  if (!node || !node.left) {
    return null
  }
  node.left = rotationRR(node.left)
  return rotationLL(node)
}
const rotationRL = function<T> (node: null|AvlNodeItf<T>) { 
  if (!node || !node.right) {
    return null
  }
  node.right = rotationRR(node.right)
  return rotationLL(node)
}

function insertNode<T> (node: null|AvlNodeItf<T>, element: T): null|AvlNodeItf<T> {
  if (node === null) {
    node = new AvlNode<T>(element)
  } else if (element < node.key) {
    node.left = insertNode<T>(node.left, element)

    if (node.left !== null) {
      // 确认是否需要平衡
      if ((heightNode<T>(node.left) - heightNode<T>(node.right)) > 1) {
        if (element < node.left.key){
          node = rotationLL<T>(node);
        } else {
          node = rotationLR<T>(node);
        }
      }
    }
  } else if (element > node.key) {
    node.right = insertNode<T>(node.right, element)

    if (node.right !== null) {
      // 确认是否需要平衡
      if ((heightNode<T>(node.right) - heightNode<T>(node.left)) > 1) {
        if (element > node.right.key){
          node = rotationRR<T>(node);
        } else {
          node = rotationRL<T>(node);
        }
      }
    }
  }
  return node
}
export class AvlTree<T> implements AvlTreeItf<T> {
  root: null|AvlNodeItf<T> = null;
  insert (element: T): void {
    this.root = insertNode<T>(this.root, element)
  }
  // 通过先序遍历的方式遍历所有节点
  preOrderTraverse (callback?: (key: T) => void): void {
    preOrderTraverse(this.root, callback)
  }
}

// 示例
;(function () {
  const tree = new AvlTree<number>()
  ;[
    11, 7, 15, 5, 9, 3, 6, 8, 10, 13, 20, 12, 14, 18, 25, 
    27, 30, 46, 70
  ].forEach((item) => {
    tree.insert(item)
  })
  // console.log(tree)
})();
