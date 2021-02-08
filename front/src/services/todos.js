import axios from 'axios';

const carregaTodos = async () =>{
    const res = await axios.get("http://localhost:8000/todos");
    return res.data;
}

const concluirTodo = async (tarefa) => {
    const res = await axios.get("http://localhost:8000/todos/concluir/"+tarefa._id);
    return res.data;
}

const excluirTodo = async (tarefa) => {
    const res = await axios.delete("http://localhost:8000/todos/excluir/"+tarefa._id)
    return res.data;
}

const adicionarTodo = async (tarefa) => {
    const res = await axios.post("http://localhost:8000/todos",tarefa);
    return res.data;
}

export {carregaTodos, concluirTodo, excluirTodo, adicionarTodo}