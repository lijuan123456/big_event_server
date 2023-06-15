// 文章路由模块
// 导入db数据库操作模块
const expressJoi = require('@escook/express-joi')
const { query } = require('express')
const db = require('../db/index')
// 获取文章列表的模块
exports.getArticleCates = (req, res) => {
    // sql语句


    const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
    //    调用db.query方法执行SQL语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results

        })
    })
}


// 新增件文章
exports.addArticleCates = (req, res) => {
    // 定义查重数据的SQL语句
    const sql = `select * from ev_article_cate where name=? or alivs=?`
    // 执行查重的SQL语句
    db.query(sql, [req.body.name, req.body.alivs], (err, results) => {
        //    判断SQL语句是否执行失败
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名都占用，请更换！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alivs === req.body.alivs) return res.cc('分类名称与别名都占用，请更换！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称已被占用  请更换名称')
        if (results.length === 1 && results[0].alivs === req.body.alivs) return res.cc('别名已被占用  请更换别名')
        //定义文章插入的SQL语句
        const sql = `insert into ev_article_cate set ?`
        // 执行插入SQL语句
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            res.cc('新增文章分类成功！', 0)
        })
    })
}
// 删除文章分类的处理函数


exports.deleteCateById = (req, res) => {
    // 定义标记删除的SQL语句
    const sql = `update  ev_article_cate set is_delete=1 where id=?`

    db.query(sql, req.params.id, (err, results) => {
        // sql语句是否执行错误
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        res.cc('删除文章分类成功！', 0)


    })
}

// 根据id获取文章分类处理函数
exports.getArtcateById = (req, res) => {
    const sql = `select * from ev_article_cate  where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')
        res.cc({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0]


        })
    })
}

// 根据id更新文章分类处理函数
exports.updateCateById = (req, res) => {
    // sql语句查重 查询id不等于传过来的其他所有数据 别名和名字有没有被占用的
    
    const sql = `select * from ev_article_cate where id<>? and (name=? or alivs=?)`
    db.query(sql, [req.body.id, req.body.name, req.body.alivs], (err, results) => {


        if (err) return res.cc(err)
        // 判断名称和别名被占用4中情况
        // 名称和别名都被占用
        console.log(results[0]);
        if (results.length === 2) return res.cc('文章分类数据名称和别名都被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alivs === req.body.alivs) return res.cc('文章分类数据名称和别名都被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('文章分类数据名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alivs === req.body.alivs) return res.cc('文章分类数据别名被占用，请更换后重试！')
        
      
        // res.send({
        //     "status": 0,
        //   "message": "更新分类信息成功！"
        // })
    // 定义文章更新SQL语句
    const  sql=`update ev_article_cate set ? where id=?`
db.query(sql,[req.body,req.body.id],(err,results)=>{
    if(err) return res.cc(err)
    if(results.affectedRows!==1) return res.cc('更新数据失败')
    res.cc('更新数据成功',0)
     
})



    })

}