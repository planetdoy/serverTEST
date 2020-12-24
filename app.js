const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

//폴더내의 index.js 파일은 require시 이름을 생략할 수 있습니다.
//./models/index.js
const { sequelize } = require('./models');
//라우터를 미리 연결합니다.
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments')
//logger
const logger = require('./logger');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html'); //view engine??
//nunjucks
nunjucks.configure('views',{
    express:app,
    watch: true,
});
//force:false : 이 설정을 true로 하면 서버 실행 시마다 테이블을 생성합니다.
//테이블을 잘못 만든 경우 true로 하면 됩니다.
//db.sequelize를 불러와서 sync 메서드를 통해 서버실행 시 MySQL과 연동되도록 했습니다.
//모델을 서버와 연결
console.log("sequelize.sync(): ",sequelize.sync());
sequelize.sync({force: false}) 
    .then(()=> {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err)=> {
        console.error(err);
    });


    
    if(process.env.NODE_ENV === 'production'){
        app.use(morgan('combined')); //더많은 사용자 정보를 로그로 남기므로 추후 버그를 해결할 때 유용함
    } else {
        app.use(morgan('dev')); //개발 단계에서 많은 로그를 출력
    }

    app.use(express.static(path.join(__dirname,'public')));
    app.use(express.json());
    app.use(express.urlencoded({extended : false}));

    //라우터를 미리 연결합니다.
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/comments', commentsRouter);

    app.use((req,res,next)=>{
        const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
        error.status = 404;
        //logger 추가
        logger.info('hello');
        logger.error(error.message);
        next(error);
    });

    app.use((err,req,res,next)=> {
        res.locals.message = err.message;
        res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
        res.status(err.status || 500);
        res.render('error');
    });

    app.listen(app.get('port'), ()=>{
        console.log(app.get('port'), '번 포트에서 대기 중');
    });