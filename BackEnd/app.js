//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//FUNCTIONS

//Adds a new TODO item to the list
function addTodo(event) 
{
    //Prevent form from submitting
    event.preventDefault();
    
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add TODO to local storage
    saveLocalTodos(todoInput.value);

    //Check button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('check-btn');
    todoDiv.appendChild(checkButton);

    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear input bar
    todoInput.value = "";
}

function deleteCheck(e) 
{
    const item = e.target;

    //Delete TODO item
    if(item.classList[0] === 'trash-btn')
    {
        const todo = item.parentElement;

        //Animation
        todo.classList.add('disappear');
        
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function()
        {
            todo.remove();
        });
    }

    //Check TODO item
    if(item.classList[0] === 'check-btn')
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

//Filters the TODO items if completed or not
function filterTodo(e) 
{
    const todos = todoList.childNodes;
    todos.forEach(function(todo)
    {
        switch(e.target.value)
        {
            case "all":
                todo.style.display = 'flex';
            break;
            
            case "completed":
                if(todo.classList.contains('completed'))
                {
                    todo.style.display = 'flex';
                }
                else
                {
                    todo.style.display = "none";
                }
            break;

            case "uncompleted":
                if(!todo.classList.contains('completed'))
                {
                    todo.style.display = 'flex';
                }
                else
                {
                    todo.style.display = "none";
                }
            break;
        }
    });
}

//Save TODO items to local
function saveLocalTodos(todo) 
{
    const todos = getLocalTodos();

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() 
{
    getLocalTodos().forEach(function(todo)
    {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check button
        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add('check-btn');
        todoDiv.appendChild(checkButton);

        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function addTodoElements()
{
    a
}

function removeLocalTodos(todo) 
{
    const todos = getLocalTodos();
    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() 
{
    //Check if not empty
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}