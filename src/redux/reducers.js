import {v4 as uuid4v} from 'uuid';

const initialState = {
 tasks: [],
 sections: [
     {id: uuid4v(), name: 'Home', taskNums: 0},
     {id: uuid4v(), name: 'Work', taskNums: 0},
     {id: uuid4v(), name: 'Kids', taskNums: 0},
     {id: uuid4v(), name: 'Study', taskNums: 0},
 ]
}



const toDoList = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TASK": {
            const newTasks = [...state.tasks];
            newTasks.push({
                id: uuid4v(),
                data: action.payload.data,
                done: false,
                section: action.payload.section,
                title: action.payload.title
            });
            const newSection = [...state.sections];
            newSection.map(el => (el.name===action.payload.section) ? el.taskNums++ : {...el})
            console.log(newTasks);
            return {...state, tasks: newTasks, sections: newSection};
        }
        case "UPDATE_TASK": {
            const newTasks = [...state.tasks];
            newTasks.map(el => {
                if (el.id === action.payload.id) {
                    el.data = action.payload.data;
                    el.title = action.payload.title;
                    el.done = false;
                }
            });
            return {...state, tasks: newTasks};
        }
        case "DELETE_TASK": {
            const newTasks = state.tasks.filter(el => el.id !== action.payload.id);
            const newSection = [...state.sections];
            newSection.map(el => (el.name===action.payload.section) ? el.taskNums-- : {...el})
            console.log(newTasks);
            return {...state, tasks: newTasks, sections: newSection};
        }
        case "CHECK_DONE": {
            const newTasks = [...state.tasks];
            newTasks.map(el => {
                if (el.id === action.payload.id) {
                    el.done = action.payload.done === false;
                    console.log(newTasks);
                }
            });
            return {...state, tasks: newTasks};
        }

        case "UPDATE_SECTIONS": {
            const newSections = [...state.sections];
            console.log(action.payload.oldName, action.payload.newName);
            newSections.map(el => {
                if (el.name === action.payload.oldName) el.name = action.payload.newName;
                return newSections;
            });
            const newTasks = [...state.tasks];
            newTasks.map(el => {
               if (el.section=== action.payload.oldName) el.section=action.payload.newName;
               return newTasks;
        });
            console.log(newSections, newTasks);
            return {...state, sections: newSections, tasks: newTasks};
        }

        case "ADD_SECTION": {
            const newSections1 = [...state.sections];
            newSections1.push({id: uuid4v(), name: action.payload.name, taskNums: 0});
            console.log(newSections1);
            return {...state, sections: newSections1};
        }
        case "DELETE_SECTION": {
            let newSections = [...state.sections];
            let id = 0;
            newSections.map(el => {
                if (el.name === action.payload.name){
                    (el.taskNums === 0) ? id = el.id:
                    alert(`The section ${action.payload.name} cannot be deletes. There are some tasks in it.`);
                    console.log(el.id);
                } return id;
            });
            newSections = state.sections.filter(el => el.id!==id);
            return {...state, sections: newSections};
        }

        default:
            return state;
    }

}

export default toDoList;