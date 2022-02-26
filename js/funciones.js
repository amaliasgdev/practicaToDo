const btnSave = document.querySelector('#btnSave');
const selectPrioritySave = document.querySelector('#selectPrioritySave');
const selectPrioritySearch = document.querySelector('#selectPrioritySearch');
const section = document.querySelector('#tareas');
const inputGuardar = document.querySelector('#inputGuardar');
const inputBuscar = document.querySelector('#inputBuscar');
const selectTarea = document.querySelector('#selectTarea');

/* <!-- <article class="container-fluid d-flex"> (od-inline-flex)
    <p class="col-8 align-self-center">Estudiar Javaescript</p>
    <button type="button" class="btn btn-danger col-4">Eliminar</button>
</article> --> */

printTareas(listaTareas, section);

function printTareas(pLista, pSection) {
    section.innerHTML = '';
    for (let tarea of pLista) {
        const article = printTarea(tarea);
        pSection.appendChild(article);
    }
}

function printTarea(pTarea) {
    let article = document.createElement('article');
    let p = document.createElement('p');
    let button = document.createElement('button');

    article.classList.add('container-fluid');
    article.classList.add('d-flex');
    article.style.backgroundColor = getColor(pTarea.prioridad);
    p.classList.add('col-8');
    p.classList.add('align-self-center');
    button.type = 'button';
    button.classList.add('btn');
    button.classList.add('btn-danger');
    button.classList.add('col-4');
    button.innerText = 'Borrar';
    button.dataset.id = pTarea.idTarea;
    button.addEventListener('click', (event) => {
        let idTarea = event.target.dataset.id;
        listaTareas = deleteTarea(idTarea, listaTareas);
        event.target.parentNode.remove();
    });

    p.innerText = pTarea.titulo;

    article.appendChild(p);
    article.appendChild(button);

    return article;
}

function getColor(pPrioridad) {
    let color = '';
    switch (pPrioridad) {
        case 'diaria':
            color = 'lightblue';
            break;
        case 'mensual':
            color = 'lightgreen';
            break;
        case 'urgente':
            color = 'lightsalmon';
            break;
        default:
            color = 'white';
    }
    return color;

}

btnSave.addEventListener('click', saveTarea);

function saveTarea(event) {
    //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.
    event.preventDefault();
    if (checkSaveFields()) {
        const newTarea = {
            'idTarea': listaTareas.length,
            'titulo': inputGuardar.value,
            'prioridad': selectPrioritySave.value
        };
        listaTareas.push(newTarea);
        printTarea(newTarea);
        const newArticle = printTarea(newTarea);
        section.appendChild(newArticle);
        selectPrioritySave.selectedIndex = 0;
        inputGuardar.reset;
    }

}

function deleteTarea(pId, pLista) {
    const nuevaListaTareas = new Array();
    for (let tarea of pLista) {
        if (tarea.idTarea !== parseInt(pId)) {
            nuevaListaTareas.push(tarea);
        }
    }
    return nuevaListaTareas;
}


selectPrioritySearch.addEventListener('change', (event) => {
    let priority = event.target.value;
    const listaFiltrada = new Array();
    for (let tarea of listaTareas) {
        if (tarea.prioridad === priority) {
            listaFiltrada.push(tarea);
        }
    }
    printTareas(listaFiltrada, section);
});

/* inputBuscar.addEventListener('keyup', searchTarea);

function searchTarea(event) {
    let valorBuscar = event.target.value;
    const resultadoBusqueda = new Array();
    if (checkSearchFields()) {
        for (let tarea of listaTareas) {
            if (tarea.titulo.includes(valorBuscar) && (!resultadoBusqueda.includes(tarea))) {
                resultadoBusqueda.push(tarea);
            }
        }
        listaTareas = resultadoBusqueda;
        console.log(listaTareas);
    }
} */

//validacion campos entrada
function checkSaveFields() {
    let respuesta = true;
    if (inputGuardar.value.length === 0) {
        alert('Debe escribir una tarea');
        respuesta = false;
    } else if (selectPrioritySave.value === 'Escoge prioridad') {
        alert('Debe escoger una prioridad');
        respuesta = false;
    }
    return respuesta;
}

//validacion campos salida
function checkSearchFields() {
    let respuesta = true;
    if (inputBuscar.value.length === 0) {
        alert('Debe escribir una tarea');
        respuesta = false;
    } else if (selectPrioritySearch.value === 'Escoge prioridad') {
        alert('Debe escoger una prioridad');
        respuesta = false;
    }
    return respuesta;
}
