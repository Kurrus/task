const setTask = (state, payload) => {
    state.tasks.push(payload);
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
};

const setTaskUpdate = (state, payload) => {
    state.tasks.map((task, index)=> {
        if (task.id === payload.id) {
            state.tasks[index] = payload
        }
    })
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
};

const setTasks = (state, payload) => {
    state.tasks = payload;
};

const setTaskInfo = (state, payload) => {
    state.task = payload
};

const setTags = (state, payload) => {
    if (state.tags.length){
        state.tags = [...payload.filter(tag => !state.tags.map(el => el.text).includes(tag.text)), ...state.tags]
    }else {
        state.tags = payload
    }
    localStorage.setItem('tags', JSON.stringify(state.tags));
};

export default {
    setTask,
    setTasks,
    setTaskInfo,
    setTags,
    setTaskUpdate
}