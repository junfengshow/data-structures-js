/**
 * 
 * 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。
你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。
输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]

输入：s = "0000"
输出：["0.0.0.0"]
 */


var restoreIpAddresses = function(s) {
  const sLength = s.length;
  if (sLength < 4 || sLength > 12) {
    return [];
  }
  const count = 4;
  const array = new Array(4);
  function bfs (s, idx, startIdx) {
    if (idx === 4) {
      // 判断是否成功
      if (startIdx === s.length) {
        console.log(array.join('.'))
      }
      return;
    }

    if (startIdx === s.length) {
      return;
    }

    if (s.charAt(startIdx) === '0') {
      array[idx] = 0;
      bfs(s, idx + 1, startIdx + 1);
      return;
    }

    let addr = 0;
    for (let _startIdx = startIdx; _startIdx < s.length; _startIdx++) {
      addr = addr * 10 + (s.charAt(_startIdx) - '0');
      if (addr > 0 && addr <= 255) {
        array[idx] = addr;
        bfs(s, idx + 1, _startIdx + 1);
      } else {
        break;
      }
    }
  }
  bfs(s, 0, 0);
  // console.log(array)
}

var restoreIpAddresses2 = function(s) {
  const SEG_COUNT = 4;
  const segments = new Array(SEG_COUNT);
  const ans = [];

  const dfs = (s, segId, segStart) => {
    // 如果找到了 4 段 IP 地址并且遍历完了字符串，那么就是一种答案
    if (segId === SEG_COUNT) {
      if (segStart === s.length) {
        ans.push(segments.join('.'));
      }
      return;
    }

    // 如果还没有找到 4 段 IP 地址就已经遍历完了字符串，那么提前回溯
    if (segStart === s.length) {
      return;
    }

    // 由于不能有前导零，如果当前数字为 0，那么这一段 IP 地址只能为 0
    if (s.charAt(segStart) === '0') {
      segments[segId] = 0;
      dfs(s, segId + 1, segStart + 1);
      return;
    }

    // 一般情况，枚举每一种可能性并递归
    let addr = 0;
    for (let segEnd = segStart; segEnd < s.length; ++segEnd) {
      addr = addr * 10 + (s.charAt(segEnd) - '0');
      // 0xFF: 255
      if (addr > 0 && addr <= 0xFF) {
        segments[segId] = addr;
        dfs(s, segId + 1, segEnd + 1);
      } else {
        break;
      }
    }
  }

  dfs(s, 0, 0);
  return ans;
};

var restoreIpAddresses3 = function(s) {
  const sLength = s.length;
  if (sLength < 4 || sLength > 12) {
    return [];
  }

  // 游标 
  let idx = 3;

  function getIndexArray (a, b, c, s) {
    return [a, b, c, s.length - a - b - c];
  }

  function isArrayOk (array) {
    return array.every(item => item >= 1 && item <= 3);
  }
  let index = 0;
  function getArray (a, b, c, s) {
    index++;
    if (index >= 100) {
      return;
    }
    // 设置结束点
    if (b == 1 && c === 1 && a === (s.length - 3)) {
      return;
    }
    let array = getIndexArray(a, b, c, s);
    // for (let i = 0; i < 4; i++) {
    //   array[i] = 1;
    // }
    console.log(isArrayOk(array))
    if (isArrayOk(array)) {
      // 将字符串填入
    }

    console.log(array)
    if (idx === 3) {
      if (c === s.length - 3) {
        idx--;
        getArray(1, 1, c + 1, s);
      } else {
        getArray(1, 1, c + 1, s);
      }
    }
    
  }

  getArray(1, 1, 1, s)
};
export default function () {
  console.log(restoreIpAddresses('25525511135'))
  // let s = '25525511135';
  // console.log(/[1-9][0-9]{0,2}/g.exec(s))
}
