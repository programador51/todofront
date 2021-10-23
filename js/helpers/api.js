import { URL_API } from "../.env";
import { format } from "date-fns";

/**
 * Get the tasks to do of a user
 * 
 * @param {number} idUser - Id of the user
 * @returns {object} Info of the tasks
 */
export async function GetToDo(page,order,columnOrdering) {
    try {
        const apiTasks = await fetch(`${URL_API}tareas?pagina=${page}`);

        let parsedTasks = await apiTasks.json();

        const tasks = parsedTasks.data.tasks.map(task => {
            
            return {
                ...task,
                createdDate: format(new Date(task['createdDate']), "PPpp")
            }
        });

        parsedTasks.data = {
            ...parsedTasks.data,
            tasks: tasks
        }

        return parsedTasks.data;

    } catch (error) {

        console.log(error);

        return{
            tasks:[],
            actualPage:0,
            pages:0
        }
    }
}

/**
 * True if task was added successfully
 * @param {string} task - Task created by the user
 * @param {number} idUser - Id of the user who created the task
 * @returns {boolean}
 */
export async function AddTask(task = 'Hello world',idUser = 1) {
    try {

        await fetch(`${URL_API}tareas`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                task,
                idUser
            })
        });

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Delete a task from the todo list
 * 
 * @param {number} idTask - Id of the task to delete
 * @returns {boolean} True if task was deleted
 */
export async function DeleteTask(idTask){
    try {
        
        await fetch(`${URL_API}tareas`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idTask
            })
        });

        return true;

    } catch (error) {

        console.log(error);
        return false;
    }
}

/**
 * Check or Uncheck a task as compelted
 * @param {number} idTask - Id of the task to update
 * @param {boolean} status - New status of the task
 * @returns {boolean} True if task was updated
 */
export async function CompleteTask(idTask,status=1){
    try {
        
        await fetch(`${URL_API}tareas/${idTask}/actualizar-estado`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idTask,
                status
            })
        });

        return true;

    } catch (error) {

        console.log(error);
        return false
    }
}

/**
 * Update the content of a task
 * @param {number} idTask - Id of the task to update
 * @param {string} content - New content of the task description
 * @returns {boolean} True if was updated
 */
export async function UpdateTask(idTask,content){
    try {
        
        await fetch(`${URL_API}tareas/${idTask}/contenido`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idTask,
                content
            })
        });

        return true;

    } catch (error) {
        
        console.log(error);
        return false;

    }
}