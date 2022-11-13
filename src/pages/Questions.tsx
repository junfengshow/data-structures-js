import React, { useEffect } from 'react';

import reverseBetween from '../Questions/reverseBetween';
import restoreIpAddresses from '../Questions/restoreIpAddresses';
import zReverse from '../Questions/zReverse';
// import longestPalindrom from '../Questions/longestPalindrom';

const Questions = () => {
  useEffect(() => {
    // 1.反转链表
    // reverseBetween();
    // 2.ip:
    // restoreIpAddresses();
    // 3.z 字形反转
    // const zReverseRes = zReverse('PAYPALISHIRING', 4);
    // console.log('zReverseRes: ', zReverseRes);
    // 4.最长回文
    require('../Questions/longestPalindrom');
  }, [])
  return (
    <div>
      ldldle
    </div>
  )
}
export default Questions;
