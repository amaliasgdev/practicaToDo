const btnSave = document.querySelector('#btnSave');
const selectPrioritySave = document.querySelector('#selectPrioritySave');
const selectPrioritySearch = document.querySelector('#selectPrioritySearch');
const section = document.querySelector('#tareas');
const inputGuardar = document.querySelector('#inputGuardar');
const inputBuscar = document.querySelector('#inputBuscar');
const selectTarea = document.querySelector('#selectTarea');
const btnListar = document.querySelector('#btnListar');

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
        //guardar los objetos que ya estan en en array en el localstorage
        localStorage.setItem(tarea.idTarea, JSON.stringify(tarea));
    }
}

function printTarea(pTarea) {
    let article = document.createElement('article');
    let p = document.createElement('p');
    let button = document.createElement('button');

    /* article.classList.add(pTarea.prioridad); */
    article.style.backgroundColor = getColorPriority(pTarea.prioridad);
    article.classList.add('d-flex');
    p.classList.add('col-8');
    p.classList.add('align-self-center');
    button.type = 'button';
    button.classList.add('btn');
    button.classList.add('btn-danger');
    button.classList.add('col-4');
    button.innerHTML = '<i class="fa-solid fa-trash-can"></i> BORRAR';
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

function getColorPriority(pPriority) {
    let color = '';
    switch (pPriority) {
        case 'urgente':
            color = 'lightcoral';
            break;
        case 'mensual':
            color = 'lightgreen';
            break;
        case 'diaria':
            color = 'lightblue';
            break;
    }
    return color;
}

btnSave.addEventListener('click', saveTarea);

function saveTarea(event) {
    //evita que envie el resultado del formulario al servidor lo que conllevaría una recarga de la pagina
    //previene el comportamiento por defecto del navegador del evento submit
    event.preventDefault();
    if (checkSaveFields()) {
        const newTarea = {
            'idTarea': listaTareas.length,
            'titulo': inputGuardar.value,
            'prioridad': selectPrioritySave.value
        };
        localStorage.setItem(`${newTarea.idTarea}`, JSON.stringify(newTarea));
        listaTareas.push(newTarea);

        const newArticle = printTarea(newTarea);
        section.appendChild(newArticle);

        limpiarCampos();
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

selectPrioritySearch.addEventListener('change', seachTareaPriority);

function seachTareaPriority(event) {
    let priority = event.target.value;
    const listaFiltrada = new Array();
    for (let tarea of listaTareas) {
        if (tarea.prioridad === priority) {
            listaFiltrada.push(tarea);
        }
    }
    printTareas(listaFiltrada, section);
}

//tambien funciona 'keyup' pero para input mejor usar 'input'
inputBuscar.addEventListener('input', searchTarea);

function searchTarea(event) {
    let valorBuscar = event.target.value.toLowerCase();
    const resultadoBusqueda = new Array();
    for (let tarea of listaTareas) {
        if (tarea.titulo.toLowerCase().includes(valorBuscar) && (!resultadoBusqueda.includes(tarea))) {
            resultadoBusqueda.push(tarea);
        }
    }
    printTareas(resultadoBusqueda, section);
}

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

//boton reset / listar 
btnListar.addEventListener('click', () => {
    printTareas(listaTareas, section);
    limpiarCampos();
})

//limpiar campos
function limpiarCampos() {
    selectPrioritySave.selectedIndex = 0;
    selectPrioritySearch.selectedIndex = 0;
    inputGuardar.value = '';
    inputBuscar.value = '';
}


