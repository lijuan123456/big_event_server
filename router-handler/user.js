const db = require('../db/index')
// 密码加密
const bcrypt = require('bcryptjs')
//这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导如全局配置文件config
const config = require('../config')

module.exports.reguser = (req, res) => {
   const userinfo = req.body;
   // console.log(userinfo);
   if (!userinfo.username || !userinfo.password) {
      // console.log(22);
      return res.send({
         status: 1,
         message: '用户名或密码不能为空！'

      })
   }
   // 登录
   const sqlstr = 'SELECT * FROM ev_users where username=?'
   // 验证用户名
   db.query(sqlstr, [userinfo.username], (err, results) => {

      if (err) {

         // return res.send({
         //    status: 1,
         //    message: err.message
         // })
         return res.cc(err)
      }
      // results长度检测用户名是否被占用
      if (results.length > 0) {

         // return res.send({
         //    status: 1,
         //    message: '用户名被占用，请用其他名字'
         // })
         return res.cc('用户名被占用，请用其他名字')
      }
      //  TODO 用户名可以使用

      // res.send('reguser 0k')

      // 用户密码加密
      userinfo.password = bcrypt.hashSync(userinfo.password, 10);

      // 插入新用户的sql语句
      const sql = 'insert into ev_users set ?'
      // 调用执行sql语句
      db.query(sql, {
         username: userinfo.username,
         password: userinfo.password
      }, (err, results) => {
         //   判断SQL语句是否执行成功
         if (err) {
            // return res.send({
            //    status: 1,
            //    message: err.message
            // })
            return res.cc(err)
         }
         // 判断影响行数是否为1
         if (results.affectedRows != 1) {
            // return res.send({
            //    status: 1,
            //    message: "注册用户失败 请稍后再试！"
            // })
            return res.cc("注册用户失败 请稍后再试！")
         }
         // res.send({
         //    status: 0,
         //    message: '注册成功'
         // })
         res.cc('注册成功', 0)

      })

   })


}

// 登录
module.exports.login = (req, res) => {

   const userinfo = req.body
   // console.log(userinfo);
   const sql = 'SELECT * FROM ev_users where username=?'

   db.query(sql, [userinfo.username], (err, results) => {
      // sql 语句失败

      if (err) {

         return res.cc(err)
      }
      if (results.length !== 1) {

         return res.cc('登录失败！')
      }


      //   判断密码是否正确

      const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
      if (!compareResult) {
         return res.cc('登陆失败')
      }
      //   生成字符创token
      const user = {
         ...results[0],
         password: '',
         user_pic: ''
      }
      // console.log(user);
      // 对用户信息进行加密生成token字符串  k1 客户信息 K2密钥值 K3 token有效期
      const tokenStr = jwt.sign(user, config.jwtSeretKey, {
         expiresIn: config.expiresIn
      })
      // console.log(tokenStr);
      // 调用res.send 响应给客户 
      res.send({
         status: 0,
         message: '登陆成功',
         // 前缀 Bearer空格
         token: 'Bearer ' + tokenStr

      })
   })


}