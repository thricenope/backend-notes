const router = require('koa-router')()
const {success, fail} = require('../utils/util')
const util = require('../utils/util')


router.prefix('/roles')
const Roles = require('../models/roleSchema')

// 查询所有角色列表
router.get('/allList', async (ctx, next) => {
    console.log(12)
    try {
        const list = await Roles.find({}, '_id roleName')
        ctx.body = success(list)
    } catch (e) {
        ctx.body = fail(`查询失败：${e.stack}`)
    }
})

// 按页查询角色列表
router.get('/list', async (ctx, next) => {
    try {
        const {roleName} = await ctx.request.query
        const {page, skipIndex} = util.pager(ctx.request.query)
        const params = {}
        roleName && (params.roleName = roleName)
        const query = Roles.find(params)
        const list = await query.skip(skipIndex).limit(page.pageSize)
        const total = await Roles.countDocuments(params)
        ctx.body = success({
            list,
            page: {
                ...page, total
            }
        })
    } catch (e) {
        ctx.body = fail(`查询失败：${e.stack}`)
    }

})


// 创建编辑删除
router.post('/operate', async (ctx, next) => {
    try {
        const {_id, roleName, remark, action} = ctx.request.body
        let res, info;
        if (action === 'create') {
            res = await Roles.create({roleName, remark})
            info = '创建成功'
        } else if (action === 'edit') {
            const params = {roleName, remark}
            params.updateTime = new Date()
            res = await Roles.findByIdAndUpdate(_id, params)
            info = '编辑成功'
        } else {
            res = Roles.findByIdAndRemove(_id)
            info = '删除成功'
        }
        ctx.body = success(res, info)
    } catch (e) {
        ctx.body = fail(`创建编辑失败：${e.stack}`)
    }

})

// 权限设置
router.post('/update/permission', async (ctx, next) => {
    try {
        const {_id, permissionList} = ctx.request.body
        const params = {permissionList, updateTime: new Date()}
        const res = await Roles.findByIdAndUpdate(_id,params)
        ctx.body = success(res)
    } catch (e) {

    }
})

module.exports = router
