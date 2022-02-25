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
    for (let tarea of pLista) {
        printTarea(tarea, pSection);
    }
}

function printTarea(pTarea, pSection) {
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
        listaTareas = borrarTarea(idTarea, listaTareas);
        event.target.parentNode.remove();
    });

    p.innerText = pTarea.titulo;

    article.appendChild(p);
    article.appendChild(button);
    pSection.appendChild(article);
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

function borrarTarea(pId, pLista) {
    const nuevaListaTareas = new Array();
    for (let tarea of pLista) {
        if (tarea.idTarea !== parseInt(pId)) {
            nuevaListaTareas.push(tarea);
        }
    }
    return nuevaListaTareas;
}
