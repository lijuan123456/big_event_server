// 文章的处理函数模块
// 导入解析 formdata 格式表单数据的包 与之前的express.urlencoded()区别可以上传文件 
const path = require('path')
const db = require('../db/index')
exports.addArticle = (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    // console.log(req.user);
    // 校验file是否存在，file
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('封面为必填项')



    //    处理文章的信息对象
    const articleInfo = {
        // 文章标题，内容 发布状态，所属分类的id
        ...req.body,
        // 封面
        cover_img: path.join('/uploads', req.file.filename),
        // 发布日期
        pub_date: new Date(),
        // 作者
        author_id: req.user.id,







    }
    // console.log(articleInfo);
    const sql = `insert into  ev_articles set ?`

    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        console.log(1);
        // 发布条数是否为1 
        if (results.affectedRows !== 1) return res.cc('文章发布失败。请重新提交！')

        res.cc('文章发布成功', 0)
    })
    

}