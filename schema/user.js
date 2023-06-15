const joi = require('joi')
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
// 定义id nickname email
const id = joi.number().integer().min(1).required()
// 验证昵称规则
const nickname = joi.string().required()
// 验证邮箱规则
const email = joi.string().email().required()
// 验证头像的规则
const avatar = joi.string().dataUri().required()



exports.reg_login_schema = {
    body: {
        username,
        password

    }
}
// 更新
exports.updata_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 验证规则密码对象    更新密码
exports.updata_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}
// 验证更新头像

exports.updata_avatar_schema = {
    body: {
        avatar
    }
}