// 个人主页模块
const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router-handler/userinfo')
const {
    id
} = require('@hapi/joi/lib/base')
// 导入验证规则中间件
const expressJoi = require('@escook/express-joi')
// 导入需要验证规则对象

const {
    reg_login_schema,
    updata_userinfo_schema,
    updata_password_schema,
    updata_avatar_schema
} = require('../schema/user')

// 挂在路由
//获取客户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息的路由
router.post('/userinfo', expressJoi(updata_userinfo_schema), userinfo_handler.updataUserInfo)

// 更新密码路由
router.post('/updatepwd', expressJoi(updata_password_schema), userinfo_handler.updatePassword)

// 更换头像路由
router.post('/update/avatar',expressJoi(updata_avatar_schema),userinfo_handler.updateAvatar)









module.exports = router