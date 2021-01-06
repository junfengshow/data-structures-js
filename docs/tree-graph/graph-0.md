---
title: 简介
group:
  title: 图
  order: 7
  path: /graph 
footer: false
---
图 graph
===
图是网络结构的抽象模型。图是一组由边链接的节点(或则顶点)。
## 相关术语
+ 一个图G=(V,E)由以下元素组成
+ V： 一组顶点
+ E： 一组边，链接V中的顶点

### 基本概念
<a href='https://upload.junfengshow.com/foundation/docs/graph-1.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/foundation/docs/graph-1.png'
    width='200'
  />
</a>

+ 由一条边链接在一起的顶点称为相邻顶点。比如A和B是相邻的，A和C是相邻的，A和E不是相邻的。
+ 一个顶点的度是其相邻顶点的数量。比如，A和其它三个顶点相连接，因此A的度为3；E和其它两个
顶点相连，因此E的度为2.
+ 路径是顶点v1,v2...,的一个连续序列，其中相邻俩顶点就是相邻的。如上所示其中包含的路径
A B E I 和 A C D E
+ 简单路径要求不包含重复的顶点。例如：ADG是一条简单的路径。除去最后一个顶点(因为它和第一个顶点
是同一个顶点)，环也是一个简单的路径，比如ADCA最后一个顶点重新回到A。
+ 如果图中不存在环，则称该图是无环。如果图中每两个顶点之间都存在路径，则该图是连通的。

### 有向图和无向图
图可以是无向的(边没有方向)也可以是有向的(有向图)。如下图所示，有向图的边有一个方向:
>
<a href='https://upload.junfengshow.com/foundation/docs/graph-2.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/foundation/docs/graph-2.png'
    width='200'
  />
</a>

如果图中每两个顶点间在双向上都存在路径，则该图是强连通的。例如C和D是强连通的，而
A和B不是强连通的。

图还可以是未加权的(目前为止我们看到的图都是未加权的)或则是加权的。如下图所示，加权图
的边被赋予了权值。
>
<a href='https://upload.junfengshow.com/foundation/docs/graph-3.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/foundation/docs/graph-3.png'
    width='200'
  />
</a>

我们可以使用图来解决计算机科学世界中的很多问题，比如搜索图中的一个特定顶点或搜索 一条特定边，寻找图中的一条路径(从一个顶点到另一个顶点)，寻找两个顶点之间的最短路径， 以及环检测。

## 图的表示
从数据结构的角度来说，我们有多种方式来表示图。在所有的表示法中，不存在绝对正确的
方式。图的正确表示法取决于待解决的问题和图的类型。

### 邻接矩阵
图最常见的实现是邻接矩阵。每个节点都和一个整数相关联，该整数将作为数组的索引。我 们用一个二维数组来表示顶点之间的连接。如果索引为i的节点和索引为j的节点相邻，则array[i][j] === 1，否则array[i][j] === 0，如下图所示:

>
<a href='https://upload.junfengshow.com/foundation/docs/graph-4.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/foundation/docs/graph-4.png'
    width='300'
  />
</a>

不是强连通的图(稀疏图)如果用邻接矩阵来表示，则矩阵中将会有很多0，这意味着我们 浪费了计算机存储空间来表示根本不存在的边。例如，找给定顶点的相邻顶点，即使该顶点只有 一个相邻顶点，我们也不得不迭代一整行。邻接矩阵表示法不够好的另一个理由是，图中顶点的 数量可能会改变，而2维数组不太灵活。

### 邻接表

我们也可以使用一种叫作邻接表的动态数据结构来表示图。邻接表由图中每个顶点的相邻顶 点列表所组成。存在好几种方式来表示这种数据结构。我们可以用列表(数组)、链表，甚至是 散列表或是字典来表示相邻顶点列表。下面的示意图展示了邻接表数据结构。
>
<a href='https://upload.junfengshow.com/foundation/docs/graph-5.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/foundation/docs/graph-5.png'
    width='300'
  />
</a>

尽管邻接表可能对大多数问题来说都是更好的选择，但以上两种表示法都很有用，且它们有 着不同的性质(例如，要找出顶点v和w是否相邻，使用邻接矩阵会比较快)。在本书的示例中， 我们将会使用邻接表表示法。
### 关联矩阵
我们还可以用关联矩阵来表示图。在关联矩阵中，矩阵的行表示顶点，列表示边。如下图所 示，我们使用二维数组来表示两者之间的连通性，如果顶点v是边e的入射点，则array[v][e] === 1; 否则，array[v][e] === 0。
>
<a href='https://upload.junfengshow.com/foundation/docs/graph-6.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/foundation/docs/graph-6.png'
    width='300'
  />
</a>

关联矩阵通常用于边的数量比顶点多的情况下，以节省空间和内存。

## 创建图
