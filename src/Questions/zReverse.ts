/**
将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

P   A   H   N
A P L S I I G
Y   I   R
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);
 

示例 1：

输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
示例 2：
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
示例 3：

输入：s = "A", numRows = 1
输出："A"
 

提示：

1 <= s.length <= 1000
s 由英文字母（小写和大写）、',' 和 '.' 组成
1 <= numRows <= 1000
 */

export default function(s: string, numRows: number) {
  const sLength = s.length;
  if (numRows  === 1 || sLength <= numRows) {
    return s;
  }
  // 一小轮z字形的长度
  const t = numRows * 2 - 2;
  // 二维数组
  const arrayMap = new Array(numRows).fill(0).map(() => new Array());
  // 开始循环
  for (let i = 0; i < sLength; i++) {
    const mod = i % t;
    let index;
    if (mod < numRows) {
      // 正向
      index = mod;
    } else {
      // 反向
      index = numRows * 2 - 2 - mod;
    }
    arrayMap[index].push(s.charAt(i));
  }
  return arrayMap.map((a) => a.join('')).join('');
};
// convert('PAYPALISHIRING', 3);
