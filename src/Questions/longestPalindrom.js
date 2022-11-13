/**
给你一个字符串 s，找到 s 中最长的回文子串。

示例 1：

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：

输入：s = "cbbd"
输出："bb"
 

提示：

1 <= s.length <= 1000
s 仅由数字和英文字母组成
 */

function isHui (str) {
  let sLen = str.length;
  if (sLen <= 1) {
    return str;
  }
  let mid = Math.floor(sLen / 2);
  for (let i = 0; i < mid; i++) {
    if (str.charAt(i) !== str.charAt(sLen - 1 - i)) {
      return '';
    }
  }
  return str;
}

const longestPalindrom = (s) => {
  const sLen = s.length;
  if (sLen <= 1) {
    return s;
  }
  let longestStr = s.charAt(0);
  for (let i = 0; i < sLen; i++) {
    let str = s.charAt(i);
    for (let j = i + 1; j < sLen; j++) {
      str += s.charAt(j);
      const isHuiRes = isHui(str);
      if (isHuiRes && isHuiRes.length > longestStr.length) {
        longestStr = isHuiRes;
      }
    }
  }
  return longestStr;
}

;[
  'babad',
  'cbbd'
].forEach((s) => {
  console.log(longestPalindrom(s));
});
