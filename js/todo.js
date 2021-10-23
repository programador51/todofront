import { configurationUsers } from "./configTables/todo";
import { CompleteTask, DeleteTask, GetToDo, UpdateTask } from "./helpers/api";
import { DefaultTable } from 'js-smart-table/dist/pagination';
import { AddTask } from './helpers/api';
import { getIdUser } from './helpers/session';
import { Success, YesNoAlert } from "./helpers/alerts";
import toastr from 'toastr';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

let TableToDo;

async function loadToDo() {
    // page,order,columnOrdering,additionalQuery
    const tasks = await GetToDo(1,'','');

    configurationUsers.pages = tasks.pages;
    configurationUsers.actualPage = tasks.actualPage;
    configurationUsers.rows = tasks.tasks;

    TableToDo = new DefaultTable(configurationUsers);
    TableToDo.printTable();
    TableToDo.printPagination();

    // addEvent();
}

function addEvent() {


    document.getElementById('containerAddTask').addEventListener('submit', async (e) => {
        e.preventDefault();

        const task = document.getElementById('task').value;


        const wasAdded = await AddTask(task, getIdUser());

        if (wasAdded) {
            Success('Tarea agregada');
            document.getElementById('containerAddTask').reset();
            loadToDo();

        }
    })
}

export function showOptions() {

    const containerButtons = document.getElementById(`optionsTask`);

    const btnCheckTask = TableToDo.infoRow.boolCompleted === 1 ? 'Deshacer' : 'Completar'

    const options = `      
    <div>
        <button id="completeTask" class="btn-success btn mr-5">${btnCheckTask}</button>

        <button 
            type="button" 
            class="btn-success btn" 
            data-bs-toggle="modal" 
            data-bs-target="#editTask"
        >
            Editar
        </button>


        <button id="deleteTask" class="btn btn-danger">Eliminar</button>
    </div>
    
    <div class="modal fade" id="editTask" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar tarea</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="updateTaskForm">
                
                    <textarea required minlength="3" id="taskEdition" class="form-control">${TableToDo.infoRow.description}</textarea>
            </div>
                    <div class="modal-footer">
                        <button id="closeEdit" type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" form="updateTaskForm" class="btn btn-outline-success">Actualizar</button>
                    </div>
                </form>            
            </div>
        </div>
    </div>
    `;

    containerButtons.innerHTML = options;

    deleteTask();
    completeTask();
    updateTask();

    function updateTask(){
        document.getElementById('updateTaskForm').addEventListener('submit',async(e)=>{
            e.preventDefault();

            const task = document.getElementById('taskEdition').value;
            
            toastr.info('Espere mientras se actualiza la tarea','Actualizando...');

            const wasUpdated = await UpdateTask(TableToDo.infoRow.id,task);

            if(wasUpdated){
                document.getElementById('closeEdit').click();
                Success('Tarea actualizada');
                loadToDo();
                hideButtons();
            }

        });
    }

    function deleteTask() {
        document.getElementById('deleteTask').addEventListener('click', async() => {
            YesNoAlert('¿Deseas eliminar la tarea?', async () => {
                toastr.info('Espere mientras se borra la tarea','Borrando...');
                const wasDeleted = await DeleteTask(TableToDo.infoRow.id);
                if (wasDeleted) {
                    Success('Tarea borrada');
                    loadToDo()
                    hideButtons();
                }
            });
        });
    }

    function completeTask(){
        document.getElementById('completeTask').addEventListener('click',()=>{

            const newStatus = TableToDo.infoRow.boolCompleted === 1 ? 0 : 1;
            const message = TableToDo.infoRow.boolCompleted === 1 ? '¿Deseas deshacer la tarea?' : '¿Deseas completar la tarea?' ;

            YesNoAlert(message,async()=>{

                toastr.info('Espere mientras se actualiza la tarea','Actulizando...');
                
                const wasUpdated = await CompleteTask(TableToDo.infoRow.id,newStatus);

                if(wasUpdated){
                    Success('Tarea checada');
                    loadToDo()
                    hideButtons();
                }
            });
        });
    }
    
    function hideButtons(){
        containerButtons.innerHTML = '';
    }
}

(function () {

    addEvent();
    localStorage.setItem('idUser',1);

    loadToDo();
    toastr.info('Organiza tus actividades con este gran "To Do" ;)','Bienvenido',{
        progressBar:true,
        timeOut:15000
    });
})()