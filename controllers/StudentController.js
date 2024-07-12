const studentModel = require('../model/Student');

const getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching all student data', error: error.message });
    }
};

const createNewStudent = async (req, res) => {
    const { firstName, lastName, age, email, gender, address, dateOfBirth, image, Class ,refNumber} = req.body;
    try {
        const newStudent = await studentModel.create({ firstName, lastName, age, email, gender, address, dateOfBirth, refNumber, image, Class });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating student profile', error: error.message });
    }
};

const updateStudentProfile = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age, email, gender, address, dateOfBirth, refNumber, image, Class } = req.body;
    console.log(`Updating student with ID: ${id}`);
    try {
       const user = await studentModel.findById(id)
       if(!user){
      return  res.status(404).json('user not found kindly register')
       }
        const updatedStudent = await studentModel.findByIdAndUpdate(
            {_id:id},
            { firstName, lastName, age, email, gender, address, dateOfBirth, refNumber, image, Class },
            { runValidators: true, new: true }
        );
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating student profile', error: error.message });
    }
};

const deleteStudentProfile = async (req, res) => {
    const { id } = req.params;
    console.log(`Updating student with ID: ${id}`);
    try {
        const user = await studentModel.findById(id)
       if(!user){
      return  res.status(404).json('user not found kindly register')
       }
        await studentModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Student profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting student profile', error: error.message });
    }
};

module.exports = {
    getAllStudents,
    createNewStudent,
    updateStudentProfile,
    deleteStudentProfile
};
