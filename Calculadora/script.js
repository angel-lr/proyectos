"use strict";

import { valorBoton, borrarCampos, retroceder, darResultado } from "./script2.js";

// Función para cargar valores desde localStorage al inicio
function cargarValoresDesdeLocalStorage(inputResultado, inputCalculadora) {
    const valorResultado = localStorage.getItem("inputResultado") || "";
    const valorCalculadora = localStorage.getItem("inputCalculadora") || "";

    inputResultado.value = valorResultado;
    inputCalculadora.value = valorCalculadora;
}

// Función para guardar valores en localStorage
function guardarEnLocalStorage(inputResultado, inputCalculadora) {
    localStorage.setItem("inputResultado", inputResultado.value);
    localStorage.setItem("inputCalculadora", inputCalculadora.value);
}

document.addEventListener("DOMContentLoaded", () => {
    // Inicialización de las funciones importadas
    valorBoton(".calculadora-btn", ".calculadora-resultado");
    borrarCampos("#btn-borrar");
    retroceder("#btn-retroceder");
    darResultado("#btn-resultado");

    // Selección de inputs
    const inputResultado = document.querySelector("#inputResultado");
    const inputCalculadora = document.querySelector("#inputCalculadora");

    if (!inputResultado || !inputCalculadora) {
        console.error("No se encontraron los elementos de los inputs. Verifica los IDs en tu HTML.");
        return;
    }

    // Cargar valores desde localStorage al inicio
    cargarValoresDesdeLocalStorage(inputResultado, inputCalculadora);

    // Evento para el botón "="
    const botonResultado = document.querySelector("#btn-resultado");

    if (botonResultado) {
        botonResultado.addEventListener("click", () => {
            guardarEnLocalStorage(inputResultado, inputCalculadora);
            console.log("Valores guardados en localStorage.");
        });
    } else {
        console.error("No se encontró el botón con ID #btn-resultado.");
    }

    // Validación para solo aceptar números en el inputCalculadora
    inputCalculadora.addEventListener("input", (e) => {
        const valor = e.target.value;

        if (!/^[-+]?(\(?\d*\.?\d*\)?([+\-x\/]\(?\d*\.?\d*\)?)*)*$/.test(valor)) {
            e.target.value = valor.slice(0, -1);
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
