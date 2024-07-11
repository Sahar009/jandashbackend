const express = require('express')
const { getAllStudents, updateStudentProfile, createNewStudent, deleteStudentProfile } = require('../controllers/StudentController')

const router = express.Router()


router.get('/getAllStudent',getAllStudents)
router.post('/createStudentProfile',createNewStudent)
router.patch('/updateStudentProfile/:id',updateStudentProfile)
router.delete('/deleteStudent/:id',deleteStudentProfile)

module.exports = router