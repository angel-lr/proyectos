"use strict";

const d = document;

const palabras = [
    "abonados", "abriendo", "abundado", "aclarado", "acuerdos", "adelante", "adorable", "alegrias",
    "alquimia", "alumbrar", "amistosa", "ampliado", "alfabeto", "animales", "anotador", "anunciar",
    "apellido", "apertura", "aprender", "arquitos", "artesano", "asombrar", "asistente", "audibles",
    "balbucea", "ayudante", "balanceo", "billetera", "borracho", "bosquejo", "campeona", "caminaba",
    "caminero", "capitana", "carnicero", "cerrajero", "chocolate", "combinan", "comenzar", "compadre",
    "compuesto", "componer", "conjunta", "consolas", "contable", "cortesia", "creceran", "creciamos",
    "criticar"
];

d.addEventListener("DOMContentLoaded", () =>{
    let palabras = seleccionarPalabra(".container-palabra");
    palabras.palabra = palabras.palabra.split('');
    adivinarPalabra("#letra-ingresada",palabras.letrasOcultas,"#letras-erroneas", palabras.palabra)
    reiniciar("#btn-reiniciar");

    const input = document.getElementById("letra-ingresada");
    // Eliminar cualquier cosa que no sea una letra
    input.addEventListener("input", function() {
        this.value = this.value.replace(/[^a-z]/g, '');
        // Asegurar que solo haya un carácter
        if (this.value.length > 1) {
            this.value = this.value[0]; // Mantener solo el primer carácter
        }
    });

    const themeToggleButton = document.getElementById("toggle-theme");

    // Carga el modo actual desde localStorage
    const isDarkMode = localStorage.getItem("theme") === "dark";

    // Aplica el tema almacenado
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }

    // Evento para alternar entre los temas
    themeToggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Guarda la preferencia en localStorage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});

function seleccionarPalabra(classDiv) {
    const contenedor = document.querySelector(classDiv);
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    let letrasOcultas = [];
    let indicesVisibles = [];

    // Seleccionar dos posiciones aleatorias para mostrar las letras
    while (indicesVisibles.length < 2) {
        let indice = Math.floor(Math.random() * palabra.length);
        if (!indicesVisibles.includes(indice)) {
            indicesVisibles.push(indice);
        }
    }

    // Crear un <p> para cada letra de la palabra y agregarlo al contenedor
    for (let i = 0; i < palabra.length; i++) {
        const p = document.createElement("p");
        p.classList.add("palabra");

        // Si la letra debe ser visible
        if (indicesVisibles.includes(i)) {
            p.textContent = palabra[i];
        } else {
            p.textContent = '.';  // Reemplazar por un punto
            letrasOcultas.push(palabra[i]);  // Guardar la letra oculta en el arreglo
        }
        contenedor.appendChild(p);
    }
    // Devolver tanto las letras ocultas como la palabra completa
    return { palabra: palabra, letrasOcultas: letrasOcultas };
}

function adivinarPalabra(idInput, arrLetrasOcultas, idParrafoLetrasEquivocadas, arrPalabraCompleta) {
    const containerDibujo = document.querySelector(".container-dibujo");
    const imagen = containerDibujo.querySelector("img");
    let contador = 1;

    d.addEventListener("keyup", (e) => {
        if (e.target.matches(idInput) && contador!==6 && arrLetrasOcultas.length!== 0) {
            let input = d.querySelector(idInput);
            let letraIngresada = input.value;
            let parrafoLetrasEquivocadas = d.querySelector(idParrafoLetrasEquivocadas);
            let containerPalabra = d.querySelector(".container-palabra");
            let pElements = containerPalabra.querySelectorAll("p");

            console.log("Letras Ocultas:", arrLetrasOcultas);
            console.log("Palabra Completa:", arrPalabraCompleta);

            // Verificar si la letra ingresada es parte de las letras ocultas
            if (arrLetrasOcultas.includes(letraIngresada)) {
                // Encuentra el primer índice donde la letra está en arrPalabraCompleta y no ha sido revelada en pElements
                let indexToReveal = -1;
                for (let i = 0; i < arrPalabraCompleta.length; i++) {
                    if (arrPalabraCompleta[i] === letraIngresada && pElements[i].textContent === ".") {
                        indexToReveal = i;
                        break;
                    }
                }
                // Actualizar la posición encontrada con la letra
                if (indexToReveal !== -1) {
                    pElements[indexToReveal].textContent = letraIngresada;
                    // Eliminar solo una ocurrencia de la letra en arrLetrasOcultas
                    const indexInOcultas = arrLetrasOcultas.indexOf(letraIngresada);
                    if (indexInOcultas !== -1) {
                        arrLetrasOcultas.splice(indexInOcultas, 1);
                    }
                    console.log("La letra es correcta. Índice actualizado:", indexToReveal);
                }
            } else {
                contador++;
                // console.log("Contador :", contador);
                // Agregar la clase para hacer parpadear la imagen
                imagen.classList.add("blink");
                setTimeout(() => {
                    imagen.classList.remove("blink");
                    imagen.src = `assets/ahorcado-${contador}.png`;
                }, 900);
                // Agregar la letra ingresada al parrafo de letras incorrectas
                let nuevaLetra = d.createElement("span");
                nuevaLetra.textContent = letraIngresada + " ";
                parrafoLetrasEquivocadas.appendChild(nuevaLetra);
            }
            // Vaciar el input después de cada intento
            input.value = "";
            if (contador === 6) {
                input.readOnly = true;
                // Seleccionar el contenedor del mensaje final
                const containerMsjFinal = document.querySelector(".container-msj-final");
                // Agregar el mensaje de pérdida al contenedor
                const p = d.createElement("p");
                p.classList.add("parrafo-derrota")
                p.textContent = "¡¡Oh vaya peridiste, vuelve a intentarlo!!";
                containerMsjFinal.appendChild(p);
            }

            if(arrLetrasOcultas.length === 0){
                input.readOnly = true;
                // Seleccionar el contenedor del mensaje final
                const containerMsjFinal = document.querySelector(".container-msj-final");
                // Agregar el mensaje de pérdida al contenedor
                const p = d.createElement("p");
                p.classList.add("parrafo-victoria")
                p.textContent = "¡¡Felicidades adivinaste la palabra!!";
                containerMsjFinal.appendChild(p);
            }
        }
    });
}

function reiniciar(idBtnReiniciar) {
    d.addEventListener("click", e=>{
        if(e.target.matches(idBtnReiniciar)) {
            location.reload();   
        }
    });
}