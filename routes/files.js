const express = require('express');
const File = require('../models/file')

const router = express.Router();

// router.get('/',(req,res) => {
//     res.send(`<img src="${req.file}">`);
// });

// router.post('/', (req,res) =>{
//     req.file.title = req.body.title;
//     res.send(req.file);
// });


router.route('/')
        .get(async(req, res, next) => {
            try{
                const files = await File.findAll();
                //res.sendFile(path.join(__dirname, ''));
                res.json(files);
            }catch(err){
                console.error(err);
                next(err);
            }
        })
        .post(async(req, res, next)=>{
            try{
                const files = await File.create({
                    file_name : req.file.filename,
                    original_name : req.file.originalname,
                    title : req.body.title,
                    path : req.file.path,
                    mimetype : req.file.mimetype,
                    size : req.file.size,
                    car_id : req.body.car_id
                });
                res.status(200).json(files);
            }catch(err){
                console.error(err);
                next(err);
            }
        });

    
module.exports = router;