const mongoose = require('mongoose');
const { Schema } = mongoose;

const ToDoSchema = new Schema({
  item: String, 
});

module.exports = mongoose.model('ToDo', ToDoSchema);
