const todoItemBox = document.getElementById('todoItemBox')
const prioritySelect = document.getElementById('prioritySelect')
const todoListUl = document.getElementById('todoListUl')
const submitToDo = document.getElementById('submitToDo')
const errorHeading = document.getElementById('errorHeading')


submitToDo.addEventListener('click', () => {
    const todoItem = todoItemBox.value
    const priorityValue = prioritySelect.value
    const date = getDate()
    if (todoItem != "") {
        // console.log(todoItem)
        // console.log(priorityValue)
        // console.log(date)
        fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: todoItem,
                priority: priorityValue,
                date: date
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result)
                getTodos((result) => {
                    displayTodos(result)
                })
            })
    } else {
        errorHeading.innerHTML = 'Please enter a todo!'
    }

})

async function getTodos(todosFetched) {
    const response = await fetch('http://localhost:3000/todos')
    const todos = await response.json()
    todosFetched(todos)
}

function displayTodos(todos) {
    const todoItems = todos.map(todo => {
        return `<li>${todo.name} - ${todo.priority} - ${todo.date}<button onclick="deleteItem(${todo.id})">Delete</button></li>`
    })
    todoListUl.innerHTML = todoItems.join('')
}

getTodos((todo) => {
    displayTodos(todo)
})

function getDate() {
    const today = new Date()
    const date = `${(today.getMonth() + 1)}/${today.getDate()}/${today.getFullYear()}`
    return date
}

async function deleteItem(id) {
    console.log('delete clicked!!')
    console.log(`http://localhost:3000/todos/${id}`)
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE'
    })
    const result = await response.json()
    console.log(result)
    displayTodos(result)
}
