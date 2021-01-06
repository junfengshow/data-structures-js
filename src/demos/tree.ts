/**
 * 
 * 树
 */

interface TreeNodeItf<T> {
  key: T;
  left: TreeNodeItf<T>|null;
  right: TreeNodeItf<T>|null;
}
class TreeNode<T> implements TreeNodeItf<T> {
  key: T;
  left = null;
  right = null;
  constructor (key: T) {
    this.key = key;
  }
}

interface BinarySearchTreeInterface <T> {
  // 向树中插入一个健
  insert (key: T): void;
  // 在树中查找一个健
  search (key: T): boolean;
  // 通过中序遍历的方式遍历所有节点
  inOrderTraverse (callback?: (key: T) => void): void;
  // 通过先序遍历的方式遍历所有节点
  preOrderTraverse (callback?: (key: T) => void): void;
  // 通过后序遍历的方式遍历所有节点
  postOrderTraverse (callback?: (key: T) => void): void;
  // 返回树中最小值/键
  min (): null|T|TreeNodeItf<T>;
  // 返回树中最大值/键
  max (): null|T|TreeNodeItf<T>;
  // 从树中移除某个键
  remove (key: T): void;
}

// 插入节点
let insertNode = function<T> (node: TreeNodeItf<T>, newNode: TreeNodeItf<T>) {
  if (newNode.key < node.key) {
    // 放左边
    if (node.left === null) {
      node.left = newNode
    } else {
      insertNode(node.left, newNode)
    }
  } else {
    // 放右边
    if (node.right === null) {
      node.right = newNode
    } else {
      insertNode(node.right, newNode)
    }
  }
}

// 搜索节点
let searchNode = function<T> (node: TreeNodeItf<T>|null, key: T): boolean {
  if (node === null) {
    return false
  }
  if (key < node.key) {
    return searchNode(node.left, key)
  }
  if (key > node.key) {
    return searchNode(node.right, key)
  }
  return true
}

// 中序遍历所有节点
let inOrderTraverse = function<T>(node: null|TreeNodeItf<T>, callback?: (key: T) => void) {
  if (node === null) {
    return
  }
  inOrderTraverse(node.left, callback)
  callback && callback(node.key)
  inOrderTraverse(node.right, callback)
}
// 先序遍历所有节点
let preOrderTraverse = function<T>(node: null|TreeNodeItf<T>, callback?: (key: T) => void) {
  if(node === null) {
    return
  }
  callback && callback(node.key)
  preOrderTraverse(node.left, callback)
  preOrderTraverse(node.right, callback)
}
// 后序遍历所有节点
let postOrderTraverse = function<T>(node: null|TreeNodeItf<T>, callback?: (key: T) => void) {
  if (node === null) {
    return
  }
  postOrderTraverse(node.left, callback)
  postOrderTraverse(node.right, callback)
  callback && callback(node.key)
}

class BinarySearchTree<T> implements BinarySearchTreeInterface<T> {
  // 根节点
  root: TreeNodeItf<T>|null = null;
  insert (key: T) {
    const newNode = new TreeNode<T>(key)
    if (!this.root) {
      this.root = newNode
      return
    }
    insertNode<T>(this.root, newNode)
  }
  search (key: T): boolean {
    return searchNode(this.root, key)
  }

  // 通过中序遍历的方式遍历所有节点
  inOrderTraverse (callback?: (key: T) => void): void {
    inOrderTraverse(this.root, callback)
  }
  // 通过先序遍历的方式遍历所有节点
  preOrderTraverse (callback?: (key: T) => void): void {
    preOrderTraverse(this.root, callback)
  }
  // 通过后序遍历的方式遍历所有节点
  postOrderTraverse (callback?: (key: T) => void): void {
    postOrderTraverse(this.root, callback)
  }
  // 返回树中最小值/键
  min (): null|T|TreeNodeItf<T> {
    if (!this.root) {
      return null
    }
    let node = this.root
    while (node && node.left) {
      node = node.left
    }
    return node.key
  }
  // 返回树中最大值/键
  max (): null|T|TreeNodeItf<T> {
    if (!this.root) {
      return null
    }
    let node = this.root
    while (node && node.right) {
      node = node.right
    }
    return node.key
  }
  // 从树中移除某个键
  remove (key: T): void {
    if (!this.root) {
      return 
    }
    function removeNode <K> (key: K, node: null|TreeNodeItf<K>) {
      if (!node) {
        return null
      }
      if (key < node.key) {
        node.left = removeNode<K>(key, node.left)
        return node
      } else if (key > node.key) {
        node.right = removeNode(key, node.right)
        return node
      } else {
        // 第一种情况 一个叶节点
        if (node.left === null && node.right === null) {
          node = null
          return node
        }
        // 第二中情况只有一个子节点的节点
        if (node.left === null) {
          node = node.right
          return node
        } else if (node.right === null) {
          node = node.left
          return node
        }
        // 第三种情况 有两个子节点的节点
        let aux = findMinNode<K>(node.right)
        node.key = aux.key
        node.right = removeNode(aux.key, node.right)
        return node
      }
    }

    function findMinNode <F> (node: TreeNodeItf<F>) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node
    }
    removeNode<T>(key, this.root)
  }
}

;(function() {
  const tree = new BinarySearchTree<number>()

  ;[11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25].forEach((item) => {
    tree.insert(item)
  })
  // console.log(tree.search(1000))
  // tree.remove(3)
  // console.log(tree.min())
})();
