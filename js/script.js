document.addEventListener("DOMContentLoaded", function () {
// Array para almacenar usuarios y contraseñas
let usuario = [{
    "username": "rulo19",
    "password": "123"
}  
];
// Con esto hago que el form Register no se vea hasta que haga clic en crear nuevo usuario
document.getElementById('showRegisterForm').addEventListener('click', () => {
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.register').style.display = 'block';
});
// Función inicio de sesión
document.querySelector(".login").addEventListener("submit", (e) => {
    e.preventDefault();
    
    let username = document.querySelector(".username").value;
    let password = document.querySelector(".password").value;
    
    // Limpia el campo 
    document.querySelector(".username").value = "";
    document.querySelector(".password").value = "";
    
    // Busca el usuario en el array
    let user = usuario.find(user => user.username === username && user.password === password);
    
    if (user) {
        Swal.fire({
            icon: "success", 
            title: "Ingreso exitoso",
            timer: 1500,
            willClose: () => {
                window.location.href = "./pages/cards.html";
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Contraseña incorrecta!",
            footer: '<a href="#">Proba nuevamente</a>'
        });
    }

    // Use el operador ternario para probarlo mas que nada
    // se que al tener 2 lineas la primer condicion es mejor utilizar el If Else

    // Mostrar contenido del array en consola
    console.log("Contenido:", JSON.stringify(usuario, null, 2));
});

// Función de registro de nuevos usuarios
document.querySelector(".register").addEventListener("submit", (event) => {
    event.preventDefault();
    let newUser = document.querySelector(".newUser").value;
    let newPass = document.querySelector(".newPass").value;
    let repeatPass = document.querySelector(".repeatPass").value;

    // Limpia el campo
    document.querySelector(".newUser").value = "";
    document.querySelector(".newPass").value = "";
    document.querySelector(".repeatPass").value = "";

    // Verifica si el usuario ya existe
    let existing = usuario.find(user => user.username === newUser);

    // Verificar contraseñas (si son iguales)
    if (newPass !== repeatPass) {
        Swal.fire({
            icon: "success", 
            title: "Usuario agregado correctamente",
        });
    } else if (existing) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "el usuario ya existe, proba con otro",
            footer: '<a href="#">Proba nuevamente</a>'
        });
    } else {
        usuario.push({ username: newUser, password: newPass });
        Swal.fire({
            icon: "success", 
            title: "Usuario ingresado con existo!",
        });
        document.querySelector('.login').style.display = 'block';  // Mostrar 
        document.querySelector('.register').style.display = 'none';  // Ocultar
    }
    
    // Mostrar contenido en la consola
    console.log("Contenido:", JSON.stringify(usuario, null, 2));
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
