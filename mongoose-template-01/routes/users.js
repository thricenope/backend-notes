const router = require('koa-router')()
const {success, fail} = require('../utils/util')
const jwt = require('jsonwebtoken')
const util = require('../utils/util')

router.prefix('/users')
const Users = require('../models/userSchema')

// 登录
router.post('/login', async (ctx, next) => {
    try {
        const {userName, userPwd} = ctx.request.body
        const res = await Users.findOne({
            userName, userPwd
        }).exec()
        const token = jwt.sign({
            data: res._doc
        }, 'secret', {expiresIn: '1h'});
        if (res) {
            ctx.body = success({...res._doc, token})
        } else {
            ctx.body = fail('账号或者密码不正确')
        }
    } catch (e) {
        ctx.body = fail(e.message)
    }
})

// 经典分页查询
router.get('/list', async (ctx, next) => {
    try {
        const {userId, userName, state} = ctx.request.query
        const {page, skipIndex} = util.pager(ctx.request.query)
        const params = {}
        userId && (params.userId = userId)
        userName && (params.userName = userName)
        state && state !== 0 && (params.state = state)
        const query = Users.find(params, {_id: 0, userPwd: 0})
        const list = await query.skip(skipIndex).limit(page.pageSize)
        const total = await Users.countDocuments(params)
        ctx.body = success({page: {...page, total}, list},)
    } catch (error) {
        fail('查询异常' + error.stack)
    }
})

// 获取全量用户列表
router.get('/all/list', async (ctx, next) => {
    try {
        const list = Users.find({}, 'userId userName userEmail')
        ctx.body = success(list)
    } catch (e) {
        fail(e.stack)
    }
})

// 删除/批量删除
router.post('/delete', async (ctx, next) => {
    const {userIds} = ctx.request.body
    // Users.updateMany({$or: [{userId: 1001}, {userId: 1002}]}, {state: 2})
    // Users.updateMany({userId: {$in: [1001, 1002]}}, {state: 2})  // 两种都行
    const result = await Users.updateMany({userId: {$in: userIds}}, {state: 1})  // 两种都行
    if (result.modifiedCount) {
        ctx.body = success(result, `共删除成功${result.modifiedCount}条`)
        return
    }
    ctx.body = fail('删除失败')
})
module.exports = router

// 用户新增/编辑
router.post('/operate', async (ctx, next) => {
    const {userId, userName, userEmail, mobile, job, state, roleList, deptId, action} = ctx.request.body
    if (action === 'add') {
        if (!userId || !userName || !deptId) {
            ctx.body = fail('参数错误')
            return
        } else {
            if (!deptId) {
                ctx.body = fail('部门不能为空')
                return
            }
        }
        const res = await Users.findByIdAndUpdate({userId}, {mobile, job, state, roleList, userEmail})
        if (res.modifiedCount) {
            ctx.body = success(res, '更新成功')
        } else {
            ctx.body = fail('更新成功')
        }
    }
})
