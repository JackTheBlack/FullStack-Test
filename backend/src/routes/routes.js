const express= require('express')
const {
	q1,q2, q4
} = require('../controllers/QControllers');
const router=express.Router();


router.get("/q1",q1)

router.get("/q2",q2)

router.get("/q4",q4)

    module.exports=router; 

