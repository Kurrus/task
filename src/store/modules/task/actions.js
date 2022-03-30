import router from "../../../router";
import { v4 as uuid } from 'uuid';

const createTask = async (context, fields) => {
    context.commit('setTask', {...fields, status: 'started', id: uuid()})
    context.commit('setTags', fields.tags)
}
const updateTask = async (context, fields) => {
    context.commit('setTaskUpdate', fields)
    context.commit('setTags', fields.tags)
}

const getTasks = async (context) => {
    let response = JSON.parse(localStorage.getItem('tasks')) || [];
    if (router.currentRoute.query.tag) {
        response = response.filter(task => task.tags.map(el => el.text).includes(router.currentRoute.query.tag))
    }
    if (router.currentRoute.query.status){
        response = response.filter(task => task.status === router.currentRoute.query.status)
    }
    if (router.currentRoute.query.overdue) {
        response = response.filter(task => task.deadline > Date.now())
    }


    context.commit('setTasks', response)
}

const getTask = async (context, id) => {
    let response = context.state.tasks.length ? context.state.tasks.filter(task => task.id === id)[0] : JSON.parse(localStorage.getItem('tasks')).filter(task => task.id === id)[0];
    context.commit('setTaskInfo', response)
}


export default {
    createTask,
    updateTask,
    getTasks,
    getTask
}