var mongoose = require('mongoose');
var taskSchema = require('../schemas/taskSchema.js');
const Task = mongoose.model('task', taskSchema);

module.exports = Task;