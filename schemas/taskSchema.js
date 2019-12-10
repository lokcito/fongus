var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  name:  String
});

taskSchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, 'i') });
};
module.exports = taskSchema;