/** 
 * 反转链表
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/
 * 
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 * 输入：head = [1,2,3,4,5], left = 2, right = 4
 * 输出：[1,4,3,2,5]
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */


 var reverseBetween = function(head, left, right) { 
  let first = head;
  let nodeList = head;
  let nodeListPre = null;
  let idx = 1;
  let leftPoint;
  while (nodeList) {
    const nodeListNext = nodeList.next;
    if (idx === left) {
      // 左边起步 nodeListPre
      leftPoint = nodeListPre;
    } else if (idx > right) {
      // 到了最右边
      return first;
    } else if (idx > left) {
      // leftPoint 将current插入leftPoint
      let leftPointerNext = leftPoint ? leftPoint.next : first; 
      nodeListPre.next = nodeList.next; 
      if (leftPoint) {
        leftPoint.next = nodeList
      } else {
        first = nodeList;
      }
      nodeList.next = leftPointerNext;

      nodeList = nodeListNext;
      idx++;
      continue;
    } 

    nodeListPre = nodeList;
    nodeList = nodeListNext;
    idx++;
  }
  return first;
}

var reverseBetween2 = function(head, left, right) { 
  let first = head;
  let nodeList = head;
  let nodeListPre = null;
  let idx = 1;
  let leftPoint;
  while (nodeList) {
    const nodeListNext = nodeList.next;
    if (idx === left) {
      // 左边起步 nodeListPre
      leftPoint = nodeListPre;
    } else if (idx > right) {
      // 到了最右边
      return first;
    } else if (idx > left) {
      // leftPoint 将current插入leftPoint
      let leftPointerNext = leftPoint ? leftPoint.next : first; // 2
      let leftPointerNode = leftPointerNext;
      let leftPointerNodePre;
      // 找到链尾
      while (leftPointerNode !== nodeList) {
        leftPointerNodePre = leftPointerNode;
        leftPointerNode = leftPointerNode.next;
      }

      leftPointerNodePre.next = nodeList.next; // 2 --> 4
      leftPoint 
      ? leftPoint.next = nodeList // 1 --> 3
      : first = nodeList;
      nodeList.next = leftPointerNext; // 3 --> 2
    } 

    nodeListPre = nodeList;
    nodeList = nodeListNext;
    idx++;
  }
  return first;
}

var reverseBetween1 = function(head, left, right) {
  // 先找到节点
  let first = head;
  let node = head;
  let pre;
  let idx = 1;
  while (idx !== left) {
    pre = node;
    node = node.next;
    idx++;
  }
  let nodeLeft = pre;
  let array = [];

  while (idx !== right) {
    array.unshift(node);
    node = node.next;
    idx++;
  }
  if (node) {
    array.unshift(node);
    node = node.next;
    idx++;
  }
  
  let nodeRight = node;
  array.forEach((item) => {
    if (nodeLeft) {
      nodeLeft.next = item;
      nodeLeft = nodeLeft.next;
    } else {
      first = nodeLeft = item;
    }
  });
  nodeLeft.next = nodeRight;

  return first;
};


function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

function arrayToList (array) {
  if (!Array.isArray(array)) {
    return;
  }
  let first, nodeList;
  array.forEach((val) => {
    const node = new ListNode(val);
    if (first) {
      nodeList.next = node;
      nodeList = node;
    } else {
      first = nodeList = node;
    }
  });
  return first;
}

function listToArray (list) {
  const result = [];
  while (list) {
    result.push(list.val);
    list = list.next;
  }
  return result;
}

function start (array, left, right) {
  const list = arrayToList(array);
  const result = reverseBetween(list, left, right)
  const resultArray = listToArray(result);
  console.log('------- --------')
  console.log('array: ', array)
  console.log('left: ', left)
  console.log('right: ', right)
  console.log('结果: ', resultArray)
  console.log('------- --------')
}

export default function () {
  
  start([1, 2, 3, 4, 5, 6], 2, 5);
  start([5], 1, 1);
  start([3, 5], 1, 2);
  start([0, 1, 2, -2, 2, 3, -5], 1, 7);

}
