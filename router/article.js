// 文章的路由模块
const express = require('express')
const router = express.Router()

// 导入处理函数模块
const article_handler = require('../router-handler/article')
const multer = require('multer')
const path=require('path')
// 创建 multer 实例   dest 指定文件存储本地位置  single 参数名
const uploads=multer({dest:path.join(__dirname,'../uploads')})

// 导入验证规则中间件
const expressJoi=require('@escook/express-joi')
// 导入文章验证模块
const {add_article_schema}=require('../schema/article')
// 发布文章路由  expressJoi只能校验body parmas queril里的数据无法校验 req.file
router.post('/add',uploads.single('cover_img'),expressJoi(add_article_schema), article_handler.addArticle)
module.exports = router