// 个人主页处理函数
// 导入数据库模块
const db = require('../db/index')

// 导入处理密码的模块
const bcrypt = require('bcryptjs')
// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    // 获取数据库
    // 查询数据库语句
    const sql = 'select id,username,nickname,email, user_pic from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        // 查询结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败！')

        // 用户信息获取成功
        res.send({
            status: 0,
            Message: '获取信息成功',
            data: results[0]
        })

    })

    // res.send('ok')
}

// 更新用户信息基本函数
exports.updataUserInfo = (req, res) => {
    //   定义SQL语句
    const sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行SQL语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('更新用户基本信息失败！')
        res.cc('更新用户基本信息成功', 0)
    })
}
// 更新密码函数
exports.updatePassword = (req, res) => {
    // 根据id查询
    const sql = `select * from ev_users where id=?`
    // 执行更换id查询SQL语句
    db.query(sql, req.user.id, (err, results) => {
        console.log(req.user.id);
        //     执行SQL语句失败
        if (err) {
            return res.cc(err)
        }
        //     // 判断结果是否存储在
        if (results.length !== 1) {
            return res.cc('用户不存在！')
        }
        // res.cc('ok')

        //     //   判断用户输入的旧密码是否正确
        const compareResults = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResults) {
            return res.cc('旧密码错误')
        }

        //    定义 更新数密码的SQL 语句
        const sql = `update ev_users  set password=? where id=?`
        //    对新密码加密处理
        const newpwd = bcrypt.hashSync(req.body.newPwd, 10)
        // 执行SQL语句
        db.query(sql, [newpwd, req.user.id], (err, results) => {
            // 判断SQL语句是否执行
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) {
                return res.cc('更新密码失败')
            }
        })

        res.cc('更新密码成功', 0)
    })



}



// 更新头像处理函数
exports.updateAvatar=(req,res)=>{
const sql=`update ev_users set user_pic=? where id=?`
db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
    // 执行SQL语句失败
if(err) return res.cc(err)
// 影响的行数是否等于1
if(results.affectedRows!==1)  return res.cc('更换头像失败')
// 成功
res.cc('更换头像成功',0)
})




// res.send('ok')
}