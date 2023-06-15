const Joi = require('joi')
const title = Joi.string().required()
const cate_id = Joi.number().integer().min(1).required()
// allow 允许字符串未空。
const content = Joi.string().required().allow('')
const state = Joi.string().valid('已发布', '草稿').required()
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    }
}