const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema =  new Schema({
    descricao: {type: String, required: true},
    concluida: {type: Boolean, default: false}
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
