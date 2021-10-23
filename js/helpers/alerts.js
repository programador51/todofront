import sa2 from 'sweetalert2';

/**
 * This alert will be shown when the backend respons with a success query
 * @param {function} cb Action to execute after click the confirm button, must be a
 * variable with the function (arrow function)
 * @param {string} message Text to display when this alert shows
 */
export const Success = (message,cb=()=>{}) => { 
    sa2.fire({
        icon:'success',
        title:message
    }).then(result=>{
        if(result.isConfirmed){
            cb();
        }
        return;
    });
};

/**
 * This alert will be show when the backend respons with an error 
 * @param {function} cb Action to execute after click the confirm button, must be a
 * variable with the function (arrow function)
 * @param {string} message Text to display when this alert shows
 */
export const Error = (message,cb = () => {}) => {
    sa2.fire({
        icon:'error',
        title:message,
        allowEscapeKey:false,
        allowOutsideClick:false
    }).then(result=>{
        if(result.isConfirmed){
            cb();
        }
    })
}


/**
 * Alert with 'Si' or 'No' options
 * @param {string} message - Message to display
 * @param {function} cbConfirm - Callback if confirmed
 * @param {function} cbDeny - Callback if denied
 */
 export const YesNoAlert = (message,cbConfirm = () => {},cbDeny = () => {}) => {
    sa2.fire({
        title:message,
        confirmButtonText:'Si',
        denyButtonText:'No',
        showDenyButton:true,
        allowEscapeKey:false,
        allowOutsideClick:false,
        icon:'question'
    }).then(result=>{
        if(result.isConfirmed){
            cbConfirm()
        }else if(result.isDenied){
            cbDeny();
        }
    })
}