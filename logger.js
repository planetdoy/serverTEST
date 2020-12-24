const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level : 'info', // level : 로그의 심각도 ex) error, warn, info, verbose, debug, silly
    format : format.json(), //로그의 형식 ex) json, label, timestamp(로그 시간 기록), printf, simple, combine 
    transports : [ // 로그저장 방식 
        new transports.File({filename: 'combined.log' }), //파일로 저장
        new transports.File({filename: 'error.log', level: 'error'}),
    ],// new transports.Console은 콘솔에 출력함
});

if(process.env.NODE_ENV !== 'production'){
    logger.add(new transports.Console({format: format.simple() }));
}

module.exports = logger;