// Variable que mantiene el estado visible del carrito
carritoVisible = false;

// Espero que todos los elementos de la pàgina cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    carritoVisible = localStorage.getItem('carrito-visible') === 'true';

    // Agrego funcionalidad a los botones eliminar del carrito
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Agrego funcionalidad al boton sumar cantidad
    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Agrego funcionalidad al buton restar cantidad
    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Agrego funcionalidad al boton Agregar al carrito
    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Agrego funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)

    // Cargo los elementos desde el archivo .json
    cargarCarritoDesdeJson();

    // Si hay elementos en el localStorage, hago visible el carrito
    if (carritoVisible) {
        hacerVisibleCarrito();
    }
}

// Elimino todos los elementos del carrito y lo oculto
function pagarClicked() {
    // popUp al realizar una compra
    let timerInterval
    Swal.fire({
        title: 'Muchas gracias por su compra! 🥳',
        width: '550px',
        icon: 'success',
        html: 'Este mensaje se autodestruira en <b></b> millisegundos.💣💥',
        timer: 2500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })

    // Elimino todos los elmentos del carrito
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();

    // Eliminar todos los elementos del LocalStorage
    localStorage.removeItem('carrito');
    localStorage.removeItem('carrito-visible');
    localStorage.removeItem('carrito-total');
    
    // Ocultar el carrito
    ocultarCarrito();
}

// Funcion que guarda los items en LocalStorage
function guardarCarritoEnLocalStorage() {
    let carrito = obtenerItemsDelCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

// Funcion que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
    localStorage.setItem('carrito-visible', 'true');
}

// Funcion que obtiene los items guardados del carrito
function cargarCarritoDesdeJson() {
    fetch("./carrito.json")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                agregarItemAlCarrito(item.titulo, item.precio, item.imagenSrc, item.cantidad);
            }
        })
        .catch(error => console.error('Error al cargar el carrito:', error));
}

// Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    let item = document.createElement('div');
    item.classList.add('item');
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // verifico que el item que intenta ingresar no se encuentre en el carrito
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            // popUp de error al querer ingresar un producto que ya se encuentra en el carrito
            Swal.fire({
                title: 'UPS!',
                text: 'El producto ya se encuentra en el carrito.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }
    }

    let itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Agrego la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // Agrego al funcionalidad restar cantidad del nuevo item
    let botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    // Agrego la funcionalidad sumar cantidad del nuevo item
    let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // Actualizo total
    actualizarTotalCarrito();
}
// Obtengo los detalles de cada item del carrito
function obtenerItemsDelCarrito() {
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    let items = [];
    for (let i = 0; i < itemsCarrito.children.length; i++) {
        let item = itemsCarrito.children[i];
        let titulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;
        let precio = item.getElementsByClassName('carrito-item-precio')[0].innerText;
        let imagenSrc = item.getElementsByTagName('img')[0].src;
        let cantidad = item.getElementsByClassName('carrito-item-cantidad')[0].value;
        items.push({
            titulo: titulo,
            precio: precio,
            imagenSrc: imagenSrc,
            cantidad: cantidad
        });
    }
    return items;
}

// Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
// Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
    let buttonClicked = event.target;
    Swal.fire({
        title: '¿Desea eliminar el producto?',
        text: "Puede revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            buttonClicked.parentElement.parentElement.remove();
            actualizarTotalCarrito();
            ocultarCarrito();
            Toastify({
                text: "Producto eliminado!",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "center", 
                stopOnFocus: true, 
                style: {
                    background: "linear-gradient(to right, #b43a99, #fd1d1d, #fc9e45)",
                },
                onClick: function () { } 
            }).showToast();
        }
    })
    buttonClicked.parentElement.parentElement.remove();
    //Actualizo el total del carrito
    actualizarTotalCarrito();

    /* la siguiente funciòn controla si hay elementos en el carrito
    Si no hay elimino el carrito */
    ocultarCarrito();
}

// Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
// Actualizo el total de Carrito
function actualizarTotalCarrito() {
    // selecciono el contenedor carrito
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;
    // recorro cada elemento del carrito para actualizar el total
    for (let i = 0; i < carritoItems.length; i++) {
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        let precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        let cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$ ' + total.toLocaleString("es") + ",00";
}