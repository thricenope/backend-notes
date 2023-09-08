const router = require('koa-router')()
const {success, fail} = require('../utils/util')
const jwt = require('jsonwebtoken')
const util = require('../utils/util')

router.prefix('/users')
const Depts = require('../models/deptSchema')

// 部门显示树形图
router.get('/list', async (ctx, next) => {
    const {deptName} = ctx.request.query
    const params = {}
    deptName && (params.deptName = deptName)
    const roleList = await Depts.find(params)
    ctx.body = success(roleList)
})

// 部门操作： 创建编辑删除
router.post('/operate', async (ctx, next) => {
    try {
        const {_id, action, ...params} = ctx.request.body
        let res, info;
        if (action === 'create') {
            res = await Depts.create(params)
            info = '创建成功'
        } else if (action === 'edit') {
            params.updateTime = new Date()
            res = await Depts.findByIdAndUpdate(_id, params)
            info = '编辑成功'
        } else {
            res = await Depts.findByIdAndRemove(_id)
            await Depts.deleteMany({parenId: {$all: [_id]}})
            info = '删除成功'
        }
        success('', info)
    } catch (e) {
        fail(e.stack)
    }
})

module.exports = router
