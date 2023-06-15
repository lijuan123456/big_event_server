const express = require('express')
const app = express();
const cors = require('cors')
const joi = require('joi')


app.use(cors())
app.use(express.urlencoded({
    extended: false
}))

// 目录中的图片托管为静态资源的中间件
app.use('/uploads', express.static('./uploads'))
// res cc函数  一定要在路由之前
app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })

    }
    next()
})
// 在路由之前配置解析token中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({
    secret: config.jwtSeretKey
}).unless({
    path: /^\/api/
}))
// 导入用户路由模块
const userRouter = require('./router/user');
const Joi = require('@hapi/joi');
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
// 导入文章信息路由模块
const artCateRouter = require('./router/artcate')
// 挂在文章模块
app.use('/my/article', artCateRouter)
// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof Joi.ValidationError) {
        // 未知的错误
        return res.cc(err)
    }
    // 身份认证失败的错误
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败')
    }
    res.cc(err)




})

// 导入并使用文章的路由模块
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

app.listen('3007', () => {
    console.log('127.0.0.1:3007');
})