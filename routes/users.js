const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');
const { route } = require('.');
const { renderString } = require('nunjucks');

const router = express.Router();

// GET /user,POST /user 주소로 들어올 때의 라우터
// GET /에서도  사용자 데이터를 조회했지만 다른 점은 데이터를 JSON형식으로 반환한다는 것입니다.
router.route('/')
    .get(async (req,res,next) => {
        try{
            const users  = await User.findAll();
            res.json(users);
        }catch(err){
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next)=>{
        try{
            const user = await User.create({
                name: req.body.name,
                age: req.body.age,
                married: req.body.married,
            });
            console.log(user);
            res.status(201).json(user);
        }catch(err){
            console.error(err);
            next(err);
        }
    });
//  GET /user/:id/comments
//  findAll() 메서드에 옵션이 추가되었습니다.
    router.get('/:id/comments', async(req, res, next) => {
        try{
            const comments = await Comment.findAll({
                include: {
                    model : User,
                    where: {id: req.params.id},
                },
            });
            console.log(comments);
            res.json(comments);
        } catch(err){
            console.error(err);
            next(err);
        }
    });

    module.exports = router;