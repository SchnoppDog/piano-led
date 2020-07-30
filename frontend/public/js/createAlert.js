/*
Simple Function for creating various types of alert-messages with bootstrap 4.5
*/
function createAlert(id, message, type) {
    if(!type) {
        type = 'success'
    }
    if(!message) {
        if(type = 'success') {
            message = 'Success!'
        } else if(type = 'warning') {
            message = 'Warning! Something might be missing!'
        } else {
            message = 'Ooops! Something went wrong!'
        }
    }

    if(type === 'success') {
        const divAlertSuccess = document.createElement('div')
        divAlertSuccess.setAttribute('class', 'alert alert-success alert-dismissible show fade mx-auto alert-sd')
        divAlertSuccess.setAttribute('role', 'alert')
        divAlertSuccess.setAttribute('id', 'alertSuccess')
        divAlertSuccess.textContent = message
        id.appendChild(divAlertSuccess)
    } else if(type === 'warning') {
        const divAlertWarning = document.createElement('div')
        divAlertWarning.setAttribute('class', 'alert alert-warning alert-dismissible show fade mx-auto alert-sd')
        divAlertWarning.setAttribute('role', 'alert')
        divAlertWarning.setAttribute('id', 'alertWarning')
        divAlertWarning.textContent = message
        id.appendChild(divAlertWarning)
    } else {
        const divAlertDanger = document.createElement('div')
        divAlertDanger.setAttribute('class', 'alert alert-danger alert-dismissible show fade mx-auto alert-sd')
        divAlertDanger.setAttribute('role', 'alert')
        divAlertDanger.setAttribute('id', 'alertDanger')
        divAlertDanger.textContent = message
        id.appendChild(divAlertDanger)
    }

    const targetAlert = document.getElementsByClassName('alert-sd')
    setTimeout(() => {
        $(targetAlert).fadeOut()
    }, 3000)
}