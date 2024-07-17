const express = require('express')
const { getAllStudents, updateStudentProfile, createNewStudent, deleteStudentProfile } = require('../controllers/StudentController')
const { upload } = require('../utils/fileUpload')

const router = express.Router()


router.get('/getAllStudent',getAllStudents)
router.post('/createStudentProfile',upload.single('file'),createNewStudent)

router.patch('/updateStudent/:id',upload.single(),updateStudentProfile)
router.delete('/deleteStudent/:id',deleteStudentProfile)

module.exports = router