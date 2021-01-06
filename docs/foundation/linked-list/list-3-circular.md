---
title: 循环链表
group:
  title: 链表
footer: false
---
循环链表
===

循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。循环链表和链
表之间唯一的区别在于，最后一个元素指向下一个元素的指针（tail.next）不是引用null，
而是指向第一个元素（head）。
>
<a href='https://upload.junfengshow.com/docs/foundation/link_circular_01.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/foundation/link_circular_01.png'
    width='470'
  />
</a>

双向循环链表有指向head元素的tail.next，和指向tail元素的head.prev。
>
<a href='https://upload.junfengshow.com/docs/foundation/link_circular_02.png' target='_blank'>
  <img 
    src='https://upload.junfengshow.com/docs/foundation/link_circular_02.png'
    width='650'
  />
</a>
