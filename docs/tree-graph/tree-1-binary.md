---
title: 二叉树
group:
  title: 树
  path: /tree
footer: false
---
二叉树
===

二叉树中的节点最多只能有两个子节点:一个是左侧子节点，另一个是右侧子节点。
这些定义有助于我们写出更高效的向/从树中插入、查找和删除节点的算法。
二叉树在计算机科学中的应用非常广泛。

## 节点
```typescript
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
```
## 方法实现
```typescript
interface BinarySearchTreeInterface <T> {
  // 向树中插入一个健
  insert (key: T): void;
  // 在树中查找一个健
  search (key: T): boolean;
  // 通过中序遍历的方式遍历所有节点
  inOrderTraverse (node: TreeNodeItf<T>): void;
  // 通过先序遍历的方式遍历所有节点
  preOrderTraverse (node: TreeNodeItf<T>): void;
  // 通过后序遍历的方式遍历所有节点
  postOrderTraverse (node: TreeNodeItf<T>): void;
  // 返回树中最小值/键
  min (): null|T|TreeNodeItf<T>;
  // 返回树中最大值/键
  max (): null|T|TreeNodeItf<T>;
  // 从树中移除某个键
  remove (key: T): void;
}
```

```typescript
class BinarySearchTree<T> implements BinarySearchTreeInterface<T> {
  // 根节点
  root: TreeNodeItf<T>|null = null;

  // ...
}
```

### insert
```typescript
// typescript
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
class BinarySearchTree<T> implements BinarySearchTreeInterface<T> {
  // ...
  insert (key: T) {
    const newNode = new TreeNode<T>(key)
    if (!this.root) {
      this.root = newNode
      return
    }
    
    insertNode<T>(this.root, newNode)
  }
  // ...
}
```

### search
```typescript
// typescript
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

class BinarySearchTree<T> implements BinarySearchTreeInterface<T> {
  // ...
  search (key: T): boolean {
    return searchNode(this.root, key)
  }
  // ...
}
```
### 遍历树
```typescript
// 中序遍历所有节点
let inOrderTraverse = function<T>(
  node: null|TreeNodeItf<T>, callback?: (key: T
) => void) {
  if (node === null) {
    return
  }
  inOrderTraverse(node.left)
  callback && callback(node.key)
  inOrderTraverse(node.right)
}
// 先序遍历所有节点
let preOrderTraverse = function<T>(
  node: null|TreeNodeItf<T>, callback?: (key: T) => void
) {
  if(node === null) {
    return
  }
  callback && callback(node.key)
  preOrderTraverse(node.left)
  preOrderTraverse(node.right)
}
// 后序遍历所有节点
let postOrderTraverse = function<T>(
  node: null|TreeNodeItf<T>, callback?: (key: T
) => void) {
  if (node === null) {
    return
  }
  postOrderTraverse(node.left)
  postOrderTraverse(node.right)
  callback && callback(node.key)
}

class BinarySearchTree<T> implements BinarySearchTreeInterface<T> {
  // ...
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
  // ...
}
```

### min
```typescript
class BinarySearchTree<T> implements BinarySearchTreeInterface<T> {
  // ...
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
  // ...
}
```

### max
```typescript
class BinarySearchTree<T> implements BinarySearchTreeInterface<T> {
  // ...
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
  // ...
}
```

### remove
> 删除节点

```typescript
class BinarySearchTree<T> implements BinarySearchTreeInterface<T> {
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
```

删除节点的时候是需要删除的节点存在子节点，如下图所示。

<a href='https://upload.junfengshow.com/docs/foundation/tree_remove_3.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/foundation/tree_remove_3.png'
    width='330'
  />
</a>
