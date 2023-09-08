const mongoose = require('mongoose')

const deptSchema = new mongoose.Schema({
    "parentId": [],//父对象Id，一级部门默认为null
    "deptName": String,
    "userId": Number,//负责人，用户ID
    "userName": String,//部门负责人
    "userEmail": String,//同上
    "createTime": {
        type: Date,
        default: Date.now()
    },//创建时间
    "updateTime": {
        type: Date,
        default: Date.now()
    },//更新时间
})

module.exports = mongoose.model('depts', deptSchema)


