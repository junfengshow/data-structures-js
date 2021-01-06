---
title: 简介
group:
  title: 树
  order: 6
  path: /tree

footer: false
---
## 简介
+ 树是一种分层数据的抽象模型。
+ 一个树结构包含一系列存在父子关系的节点。
+ 根节点：位于树顶部的节点
+ 内部节点：至少有一个节点的节点
+ 外部节点：没有子节点的节点
+ 子树：由节点和的后代组成
+ 深度：节点的一个属性，其取决于它的祖先节点的数量。
+ 高度：取决于所有节点的深度的最大值

## 二叉树
+ 二叉树中的节点最多只能有两个子节点:一个是左侧子节点，另一个是右侧子节点。
+ 这些定义有助于我们写出更高效的向/从树中插入、查找和删除节点的算法。
+ 二叉树在计算机科学中的应用非常广泛。
```typescript
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
```

## 二叉树的问题
+ 取决于你添加的节点数，树的一条边可能会很深。
+ 树的一条分支会有很多层，而其它的分支却只有几层。

## AVL树
+ AVL树是一种自平衡树，添加或者移除节点时，AVL树会尝试自平衡。
+ 任意一个节点(不论深度)的左子树和右子树高度最多相差1。
+ 添加或移除节点时，AVL树会尽可能尝试转换为完全树。
