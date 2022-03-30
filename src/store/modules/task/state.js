const tasks = []
const task = null
const tags = JSON.parse(localStorage.getItem('tags')) || []
const status = [
    {value: 'started', text: 'В работе'},
    {value: 'finished', text: 'Завершено'}
]
export default {
    tasks,
    task,
    status,
    tags,
}