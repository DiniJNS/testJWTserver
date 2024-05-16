const express = require("express")
const router = express.Router()
const path =  require('path')
const user = require('../controllers/users.controller')
const auth = require('../middleware/auth.middleware')


router.get('/all', user.getAllUsers)
router.get('/user', user.getOne)
router.get('/long-passwords', user.getUsersWithLongPasswords);
router.put('/user/:id', user.updateOne)
router.get("/user",auth.verifyToken,user.user_dBoard);
router.get("/admin",[auth.verifyToken, auth.isAdmin],user.admin_dBoard);
router.delete('/users/:id', user.deleteOne);
router.delete('/users', user.deleteAll);





module.exports = router