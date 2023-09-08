const router = require('koa-router')()
const {success, fail} = require('../utils/util')
const util = require('../utils/util')


router.prefix('/menus')
const Menus = require('../models/menuSchema')

router.post('/operate', async (ctx, next) => {
    const {_id, action, ...params} = ctx.request.body
    let res, info;
    if (action === 'add') {
        res = await Menus.create(params)
        info = '创建成功'
    } else if (action === 'edit') {
        res = await Menus.findByIdAndUpdate(_id, params)
        info = '编辑成功'
    } else {
        res = await Menus.findByIdAndRemove(_id)
        await Menus.deleteMany({parentId: {$all: []}})
        info = '删除成功'
    }
})

module.exports = router
