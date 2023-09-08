/**
 *
 * 开发阶段都放控制台里，上线以后放进文件里
 */

const log4js = require('log4js')

const logger = log4js.getLogger();

const levels = {
    trace: log4js.levels.TRACE,
    debug: log4js.levels.DEBUG,
    info: log4js.levels.INFO,
    error: log4js.levels.ERROR,
    fatal: log4js.levels.FATAL,
}
// 防止乱输入，对应 logger.level = 'debug' 防止输入成 'debug'
// 现在写成 level.debug

log4js.configure({
    appenders: {
        console: {type: 'console'},
        info: {
            type: 'file',
            filename: 'logs/all-logs.log'
        },
        error: {
            type: 'dateFile',
            filename: 'logs/error_log',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        }
    },
    categories: {
        default: {appenders: ['console'], level: 'debug'},
        info: {appenders: ['info', 'console'], level: 'info'},
        error: {appenders: ['console', 'error'], level: 'error'}
    }
})

exports.debug = (content) => {
    const logger = log4js.getLogger()
    logger.level = levels.debug
    logger.debug(content)
}
exports.info = (content) => {
    const logger = log4js.getLogger('info')
    logger.level = levels.info
    logger.info(content)
}

exports.error = (content) => {
    const logger = log4js.getLogger('error')
    logger.level = levels.error
    logger.error(content)
}
