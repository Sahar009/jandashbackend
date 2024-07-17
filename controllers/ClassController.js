const ClassModel = require('../model/class');

const getAllClass = async (req, res) => {
    try {
        const Class = await ClassModel.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching all student data', error: error.message });
    }
};

const createNewClass = async (req, res) => {
    const { firstName, lastName, age, email, gender, address, dateOfBirth, image, Class ,refNumber} = req.body;
    try {
        const newClass = await ClassModel.create({ firstName, lastName, age, email, gender, address, dateOfBirth, refNumber, image, Class });
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating class', error: error.message });
    }
};

const updateClass = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age, email, gender, address, dateOfBirth, refNumber, image, Class } = req.body;
    console.log(`Updating class with ID: ${id}`);
    try {
       const user = await ClassModel.findById(id)
       if(!user){
      return  res.status(404).json('')
       }
        const updatedClass = await ClassModel.findByIdAndUpdate(
            {_id:id},
            { firstName, lastName, age, email, gender, address, dateOfBirth, refNumber, image, Class },
            { runValidators: true, new: true }
        );
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating class profile', error: error.message });
    }
};

const deleteClass = async (req, res) => {
    const { id } = req.params;
    console.log(`Updating student with ID: ${id}`);
    try {
        const user = await ClassModel.findById(id)
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
    getAllClass,
    createNewClass,
    updateClass,
    deleteClass
};