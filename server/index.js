const express = require('express')
const cors = require('cors')
const app = express()
const methodOverride = require('method-override')
app.use(express.json())
app.use(cors())
app.use(methodOverride())

let todos = [
    { name: "Feed the cat", priority: "High", date: "1/24/2022", id: 0 },
    { name: "Do the dishes", priority: "Medium", date: "1/24/2022", id: 1 }
]

app.get('/todos', (req, res) => {
    res.send(todos)
})

app.post('/todos', (req, res) => {
    const name = req.body.name
    const priority = req.body.priority
    const date = req.body.date
    const todo = { name: name, priority: priority, date: date, id: todos.length }
    todos.push(todo)
    res.json({ message: "To-Do item added!" })
})

// app.get('/todos/:index', (req, res) => {
//     const index = req.params.index
//     res.send(todos.id)
// })

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id
    if (id == todos[id].id) {
        console.log(id)
        console.log(todos[id].id)
        todos.splice(id, 1)
    }
    res.send(todos)
})

app.listen(3000, function () {
    console.log('Server is running...')
})