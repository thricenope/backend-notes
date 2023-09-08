const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
    "menuType": Number,//菜单类型 1:菜单 2:按钮
    "menuName": String,//菜单名称
    "menuCode": String,//菜单标识符，只有按钮类型才有，用于确定按钮权限
    "path": String,//菜单路由
    "icon": String,//菜单图标
    "component": String,//组件地址
    "parentId": [mongoose.Types.ObjectId],//父菜单ID
    "createTime": {
        type: Date,
        default: Date.now()
    },
    "updateTime": {
        type: Date,
        default: Date.now()
    },

})

module.exports = mongoose.model('menus', menuSchema)

