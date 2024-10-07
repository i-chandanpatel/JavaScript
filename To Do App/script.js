const todoLists=document.querySelector(".todoLists");
const listValue =document.querySelector(".todoValue");
let todoListValue = [];


//Getting data from Local Storage
const getTodoListFromLS=()=>{
    return JSON.parse(localStorage.getItem('data')) || [];
}


const addTodoLocalStorage= (todo)=>{
    return localStorage.setItem('data',JSON.stringify(todo));
}


const showTodoList= ()=>{
    todoListValue = getTodoListFromLS();
    todoListValue.forEach(data => {
        const liElement = document.createElement("li");
        liElement.innerHTML = data;
        todoLists.append(liElement);
    });
}


const removeTodoList = (e) => {
    let curr=e.target;
    todoListValue= todoListValue.filter((currTodo)=> currTodo!=curr.textContent);
    
    addTodoLocalStorage(todoListValue);
    curr.remove();
}


const addTodoList = (e) => {
    e.preventDefault(); // Prevents form from submitting
    todoListValue = getTodoListFromLS(); // Getting data from Local Storage 
    let newtodo = listValue.value.trim();
    listValue.value=" ";

    if (newtodo.length != 0 && !todoListValue.includes(newtodo)) {
        todoListValue.push(newtodo);

        addTodoLocalStorage(todoListValue);
        const liElement = document.createElement("li");
        liElement.innerHTML = newtodo;
        liElement.title="Click to delete";
        todoLists.append(liElement);
    }
}

    showTodoList();

    todoLists.addEventListener('click',(e)=> removeTodoList(e));


document.querySelector(".btn").addEventListener("click",(e)=>{
    addTodoList(e);
})

