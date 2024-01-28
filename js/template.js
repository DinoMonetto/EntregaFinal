document.addEventListener("DOMContentLoaded", function () {
let frutas = [
    {nombre: "Anana", precio: 1600, img: "../assets/anana.png"},
    {nombre: "Manzana", precio: 900, img: "../assets/manzana.png"},
    {nombre: "Durazno", precio: 1500, img: "../assets/durazno.png"},
    {nombre: "Papa", precio: 950, img: "../assets/papa.png"},
    {nombre: "Zanahoria", precio: 1200, img: "../assets/zanahoria.png"},
    {nombre: "Tomate", precio: 1000, img: "../assets/tomate.png"},
    {nombre: "Espinaca", precio: 1100, img: "../assets/espinaca.png"},
    {nombre: "Brócoli", precio: 1300, img: "../assets/brocoli.png"}, 
    {nombre: "Naranja", precio: 800, img: "../assets/naranja.png"},  
    {nombre: "Uva", precio: 1700, img: "../assets/uva.png"},         
    {nombre: "Lechuga", precio: 850, img: "../assets/lechuga.png"},  
    {nombre: "Cebolla", precio: 900, img: "../assets/cebolla.png"}   
];

function calcularPrecioTotal(carrito) {
    return carrito.reduce((total, fruta) => total + fruta.precio, 0);
}

let conteinerCards = document.querySelector("#container");

frutas.forEach((fruta)=> {
    clon = document.querySelector(".cardTemplate").content.cloneNode(true)
    clon.querySelector("h5").innerText = `${fruta.nombre}`
    clon.querySelector("p").innerText = `Precio $${fruta.precio}`
    clon.querySelector("img").src = `${fruta.img}`;
    clon.querySelector("img").alt = `${fruta.nombre}`;


    conteinerCards.appendChild(clon)
    })


    document.addEventListener("DOMContentLoaded", function() {
        let buttons = document.querySelectorAll('.custom-card button.btn-outline-danger');
    
        buttons.forEach((button) => {
            button.addEventListener('click', function() {
                let carritoFrutas = JSON.parse(localStorage.getItem('carritoFrutas')) || [];
                let nombreFruta = this.closest('.custom-card').querySelector('h5').innerText;
                let fruta = frutas.find(f => f.nombre === nombreFruta);
    
                if (fruta) {
                    carritoFrutas.push(fruta);
                    localStorage.setItem('carritoFrutas', JSON.stringify(carritoFrutas));
                    
                    let precioTotal = calcularPrecioTotal(carritoFrutas);
                    console.log(`Precio total del carrito: $${precioTotal}`);
                    Swal.fire({
                        icon: "success",
                        title: "Agregado correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    });;
                } else {
                    console.error('Fruta no encontrada en la lista de frutas.');
                }
            });
        });
    });
    
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
