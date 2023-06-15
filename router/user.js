
const expressJoi = require('@escook/express-joi')
const express=require('express')
const router=express.Router()
const user_handler=require('../router-handler/user')
// 验证 引入
const {reg_login_schema}=require('../schema/user')
// 注册新用户
router.post('/reguser',expressJoi(reg_login_schema),user_handler.reguser)
// 登录账户
router.post('/login',expressJoi(reg_login_schema),user_handler.login)

module.exports=router;

