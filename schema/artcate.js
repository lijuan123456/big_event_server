// 导入定义验证规则模块
const joi = require('joi')
// 定义验证name和alivs规则

const name = joi.string().required()
const alivs = joi.string().alphanum().required()

// 验证id的规则
const id = joi.number().integer().min(1).required()
// 共享验证规则对象
exports.add_cate_schema = {
    body: {
        name,
        alivs
    }
}

// 共享验证规则 id对象 删除分类
exports.delete_cate_schema = {
    params: {
        id,
    }
}


// 根据id验证规则对象获取文章分类

exports.get_cate_schema = {
    params: {
        id,
    }
}

// 根据id验证规则对更新文章分类
exports.update_cate_schema = {
    body: {
        id,
        name,
        alivs
    }
}