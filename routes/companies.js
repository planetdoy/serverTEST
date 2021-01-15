const express = require('express');
const Company = require('../models/company')

const router = express.Router();

router.route('/')//등록된 회사 리스트
    .get(async(req,res,next)=>{
        try{
            const companies  =await Company.findAll();
            res.json(companies);
        }catch(err){
            console.error(err);
            next(err);
        }
    })// 회사 등록
    .post(async(req, res, next)=>{
        try{
            const companies = await Company.create({
                registration : req.body.registration,
                name : req.body.name
            });
            console.log(companies);
            res.status(200).json(companies);
        }catch(err){
            console.error(err);
            next(err);
        }
    });

    module.exports = router;