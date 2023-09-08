const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    "roleName": String,
    "remark": String,
    "permissionList": {
        "checkedKeys": [mongoose.Types.ObjectId],
        "halfCheckedKeys": [mongoose.Types.ObjectId],
    },
    "createTime": {
        type: Date,
        default: Date.now()
    },
    "updateTime": Date
})

module.exports = mongoose.model('roles', roleSchema)
