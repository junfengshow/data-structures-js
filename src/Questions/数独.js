/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
 const hasConflit = (board, row, col, value) => {
  // 判断行或者列是否冲突
  for (let i = 0; i < 9; i++) {
    if (
      board[i][col] === value ||
      board[row][i] === value
    ) {
      return true
    }
  }
  // 对于小框，行有三种起始索引 0、3、6
  const subRowStart = Math.floor(row / 3) * 3; 
  // 对于小框，列有三种起始索引 0、3、6
  const subColStart = Math.floor(col / 3) * 3;
  // 遍历所在的小框 
  for (let i = 0; i < 3; i++) {              
    for (let j = 0; j < 3; j++) {
      // 发现了重复数
      if (value === board[subRowStart + i][subColStart + j]) { 
        return true;
      }
    }
  }
  // 没有发生冲突
  return false; 
}
var solveSudoku = function(board) {
  const fill = (i, j) => {
    // 列越界，填完一行，填下一行
    if (j == 9) {              
      i++;
      j = 0;
      // 都填完了，返回true
      if (i == 9) {
        return true;
      } 
    }
    // 不是空白格，递归填下一格
    if (board[i][j] !== ".") {
      return fill(i, j + 1); 
    }

    // 枚举出当前格的所有可填的选择
    for (let num = 1; num <= 9; num++) {           
      // 如果存在冲突，跳过这个选择
      if (hasConflit(board, i, j, String(num))) {
        continue;
      }
      // 作出一个选择
      board[i][j] = String(num);           
      // 如果基于它，填下一格，最后可以解出数独，直接返回true        
      if (fill(i, j + 1)) {
        return true;
      } 
      // 如果基于它，填下一格，填1-9都不行，回溯，恢复为空白格
      board[i][j] = ".";               
    }
    // 尝试了1-9，每个都往下递归，都不能做完，返回false
    return false; 
  };
  // 从第一个格子开始填
  fill(0, 0); 
};