export default {
  // 支持值为 Object 和 Array
  'GET /v1/users': { users: [1, 2] },

  // GET 可忽略
  '/v1/users/1': { id: 1 },

  // 支持自定义函数，v1 参考 express@4
  'POST /v1/users/create': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({
      data: {
        dogs: {
          id: 1, breed: 'sssss'
        }
      }
    }));
  },
}
