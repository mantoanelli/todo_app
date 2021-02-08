const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://rogerio:rogerio@cluster0.6oygj.mongodb.net/todo",
    {useNewUrlParser: true, useUnifiedTopology: true}
);


const db = mongoose.connection;
db.once('open', ()=>{
    console.log('MongoDB conectado');
})

const app = express();
app.use(express.json());

app.use(cors());

app.get("/todos", (request, response, next)=>{
    console.log("Chegou aqui no todos");
    next();
});

app.get("/teste", (request, response)=>{
    const objteste = {
        nome:"Rogerio",
        idade: 22
    }
    response.json(objteste);
});

app.get("/todos", async (req, res) => {
    const Todo = require('./models/todo');   
    const registros = await Todo.find();
    res.json(registros);
});

app.get("/todos/concluir/:id", async (req, res) => {
    const Todo = require('./models/todo');
    const id = req.params.id;
    const objTodo = await Todo.findById(id);
    objTodo.concluida = !objTodo.concluida;
    await objTodo.save();
    const registros = await Todo.find();
    res.json(registros);
    
});

app.delete("/todos/excluir/:id", async (req, res) => {
    const Todo = require('./models/todo');
    const id = req.params.id;
    await Todo.deleteOne({_id: id});

    const registros = await Todo.find();
    res.json(registros);
})


app.get("/", (request, response)=>{
    response.json("<h1>Bateu na rota /</h1>");
});


app.post("/todos", async (req, res) => {
    const body = req.body;
    if (body.descricao && body.descricao.length > 0){
        const Todo = require('./models/todo');
        await Todo.create(body);
        
        const registros = await Todo.find();
        res.json(registros);
        //res.json(body);
    } else {
        res.json({erro:"Descrição é obrigatoria"});
    }
});

app.listen(8000,()=>{
    console.log("API está no ar");
});
