const carrito = document.querySelector('#carrito');
// const listaCarrito = document.querySelector('#lista-carrito tbody');
const contenedorCarrito = document.querySelector('#carrito #lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListerner();


function cargarEventListerner() {
    listaCursos.addEventListener('click', agregarCurso);
    //Escucha el  boton para eliminar el cursos
    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML()
    })

}

function agregarCurso(e) {

    e.preventDefault();

    const cursoSeleccionado = e.target.parentElement.parentElement;

    if (e.target.classList.contains('agregar-carrito')) {
        leerDatosCurso(cursoSeleccionado) //Construye el objeto que necesitamos
    }
}

function eliminarCurso(e) {

    const cursoId = e.target.getAttribute('data-id')

    if (e.target.classList.contains('borrar-curso')) {
        disminuyeLaCantidadEnCarrito()
    }

    function disminuyeLaCantidadEnCarrito() {
        articulosCarrito.forEach(curso => {
            if (curso.cantidad > 1 && curso.id === cursoId) {
                curso.cantidad--;
            } else if (curso.cantidad === 1) {
                articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
            }
        })
    }

    carritoHTML()
}




// // // }

// // Extrar la información de los cursos de forma individual

function leerDatosCurso(curso) {

    var infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.info-card .precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }


    // revisa si el curso ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    // comprueba ña existencia

    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agregamos el curso al carrito
        //Agregar elementos al areglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso] //Concatenar arraysi
    }

    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML() {
    //Lipiar el html

    //recorre el carrito y genera el html
    limpiarHTML()

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        const { imagen, titulo, precio, cantidad, id } = curso;
        row.innerHTML = `
        <td><img src="${imagen}" width="100px"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a
        href="#"
        class="borrar-curso"
        data-id="${id}">X</a>
        </td>
        `;

        //agrega el html del carrito al tableboy
        contenedorCarrito.appendChild(row)

        // console.log(curso)

    })
}

//Limpiar el tbody

function limpiarHTML() {
    // Forma de limpiar elementos html de forma lento
    // contenedorCarrito.innerHTML = "";
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}