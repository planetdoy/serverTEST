const express = require('express');
//모델 연결
const Car = require('../models/car');

//라우터 연결
const router = express.Router();

router.route('/') //등록된 챠량 리스트
    .get(async(req,res,next) => {
        try{
            const cars = await Car.findAll();
            res.json(cars);
        }catch(err){
            console.error(err);
            next(err);
        }
    })// 차량 등록 
    .post(async(req,res,next) => {
        try{
            const cars = await Car.create({
                vin : req.body.vin,
                lisence_num : req.body.lisence_num,
                model : req.body.model,
                location : req.body.location,
                mile : req.body.mile,
                engine_oil : req.body.engine_oil,
                classification : req.body.classification,
                company_id : req.body.company_id
            });
            console.log(cars);
            res.status(200).json(cars);
        }catch(err){
            console.error(err);
            next(err);
        }
    });


module.exports = router;