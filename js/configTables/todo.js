import { GetToDo } from "../helpers/api";
import { showOptions } from "../todo";

const headerConfig = [
    { 
        text:'Tarea',
        columnNameDB:'description',
        idHeader:'task',
        attributeToPrint:'description',
        sortable:false,
        sortThis:false,
        css:'task'
    },

    { 
        text: 'Fecha creado', 
        columnNameDB: 'createdDate', 
        idHeader: 'created-date', 
        attributeToPrint: 'createdDate', 
        sortable: false 
    },

    { 
        text: 'Completado', 
        columnNameDB: 'completed', 
        idHeader: 'completed', 
        attributeToPrint: 'completed', 
        sortable: false 
    }
];

const sort = {
    sqlSort:true,
    sortASC:true
}

const attributesResponse = {
    pages:'pages',
    actualPage:'actualPage',
    data:'tasks'
};

export const configurationUsers = {
    idTable:'tasks-table',
    idPagination:'tasks-pagination',
    pages:0,
    rows:[],
    actualPage:0,
    headerConfig,
    styleTable:'default',
    cbSelection:showOptions,
    idRows:'id',
    sort,
    paginationFn:async(page,order,columnOrdering)=>{
        const data = await GetToDo(page,order,columnOrdering);
        const options = document.getElementById(`optionsTask`);

        if(options!==null){
            options.innerHTML = '';
        }
        return data;
    },
    attributesResponse
};