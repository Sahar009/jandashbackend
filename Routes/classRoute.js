const express = require('express')
const { getAllClass, updateClass, createNewClass, deleteClass } = require('../controllers/ClassController')

const Classrouter = express.Router()


router.get('/getAllClas',getAllClass)
router.post('/createNewclass',createNewClass)
router.patch('/updateClass/:id',updateClass)
router.delete('/deleteClass/:id',deleteClass)

module.exports = Classrouter