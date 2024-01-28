document.addEventListener("DOMContentLoaded", function () {
function mostrarCarrito() {
    let listaCarrito = document.getElementById('listaCarrito');
    let sumaTotalElemento = document.getElementById('sumaTotal');

    let carritoFrutas = JSON.parse(localStorage.getItem('carritoFrutas')) || [];


    listaCarrito.innerHTML = '';
    let inactividad;

function reiniciarTimeout() {
    clearTimeout(inactividad);
    
    inactividad = setTimeout(() => {

        window.location.href = '../index.html';
    }, 5 * 60 * 1000);
}

document.addEventListener('mousemove', reiniciarTimeout);

function mostrarCarrito() {

    let sumaTotal = 0;


    carritoFrutas.forEach(fruta => {
        sumaTotal += fruta.precio;

        let listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        let productoInfo = document.createElement('div');
        productoInfo.className = 'd-flex justify-content-between align-items-center';

        let nombrePrecio = document.createElement('div');
        nombrePrecio.textContent = `${fruta.nombre} - $${fruta.precio.toFixed(2)}`;

        let btnQuitar = document.createElement('button');
        btnQuitar.className = 'btn btn-danger btn-quitar';
        btnQuitar.textContent = 'Quitar del Carrito';
        btnQuitar.addEventListener('click', () => quitarDelCarrito(fruta.nombre));

        productoInfo.appendChild(nombrePrecio);
        productoInfo.appendChild(btnQuitar);
        listItem.appendChild(productoInfo);

        listaCarrito.appendChild(listItem);
    });

    sumaTotalElemento.textContent = sumaTotal.toFixed(2);
}

// Función para quitar un producto del carrito
function quitarDelCarrito(nombreFruta) {
    let carritoFrutas = JSON.parse(localStorage.getItem('carritoFrutas')) || [];

    carritoFrutas = carritoFrutas.filter(fruta => fruta.nombre !== nombreFruta);

    localStorage.setItem('carritoFrutas', JSON.stringify(carritoFrutas));
    mostrarCarrito();

    Swal.fire({
        icon: 'success',
        title: 'Producto quitado del carrito',
        showConfirmButton: false,
        timer: 1500
    });
}

// Llamar a la función para mostrar el carrito al cargar la página
mostrarCarrito();

reiniciarTimeout();


let esperaCincoSegundos = new Promise(resolve => {
    setTimeout(resolve, 5000); 
});


esperaCincoSegundos.then(() => {
    window.location.href = '../index.html';
});
}

obtenerClima();

    // Función para obtener información del clima
    function obtenerClima() {
        let apiKey = '19deb3d609ae8fc2ae926d985ae99cfe'; 
        let ciudad = 'Cordoba,ar';

        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

        // Realizar la solicitud fetch
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Extraer la informacion
                let temperatura = data.main.temp;
                let descripcion = data.weather[0].description;

                // Mostrar la informacion
                mostrarClima(temperatura, descripcion);
            })
            .catch(error => {
                console.error('Error', error);
            });
    }

    // Función para mostrar la información del clima en tu página
    function mostrarClima(temperatura, descripcion) {
        console.log('Clima:', temperatura, descripcion);

        let contenedorClima = document.createElement('div');
        contenedorClima.innerHTML = `Clima actual en Córdoba: ${temperatura}°C, ${descripcion}`;
        contenedorClima.style.textAlign = 'right';
        contenedorClima.style.fontSize = '14px';
        contenedorClima.style.marginTop = '10px';

        document.body.appendChild(contenedorClima);
    }
});
