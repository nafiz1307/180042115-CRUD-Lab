const express = require('express')
const router = express.Router();

const {ensureAuhtenticated , addUserData}= require('../middlewares/auth.middleware');

const {getMO, postMO, getMoList, deleteMo} = require ('../controllers/mathOlympiad.controller');

router.get('/register',ensureAuhtenticated,addUserData,getMO);
router.post('/register',ensureAuhtenticated,addUserData,postMO);
router.get('/list',ensureAuhtenticated,addUserData,getMoList);
router.get('/delete/:id',ensureAuhtenticated,addUserData,deleteMo);

module.exports = router;