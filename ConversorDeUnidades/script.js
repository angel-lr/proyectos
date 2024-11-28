"use strict";

const d = document;

document.addEventListener("DOMContentLoaded", (e)=>{
    obtenerLongitud("#longitud-entrada","#l-unid-entrada","#longitud-resultado","#l-unid-salida");

    obtenerMasa("#masa-entrada","#m-unid-entrada","#masa-resultado","#m-unid-salida");

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

function obtenerLongitud(inputEntrada, unidEntrada, inputSalida, unidSalida) {
    const conversiones = {
        1: 1000,        // kilometro a metros
        2: 1,           // metro a metros
        3: 0.1,         // decimetro a metros
        4: 0.01,        // centimetro a metros
        5: 0.001,       // milimetro a metros
        6: 0.0254,      // pulgada a metros
        7: 0.3048,      // pie a metros
        8: 0.9144,      // yarda a metros
        9: 1609.34      // milla a metros
    };
    d.addEventListener("keyup", (e) => {
        if (e.target.matches(inputEntrada)) {
            let valorEntrada = parseFloat(e.target.value);
            let valorSalida = d.querySelector(`${inputSalida}`);
            // Obtiene los elementos y valores de los select
            let unidEntradaEscogida = document.querySelector(unidEntrada).value;
            let unidSalidaEscogida = document.querySelector(unidSalida).value;

            if(valorEntrada) {
                // Convertir el valor de entrada a metros
                const valorEnMetros = valorEntrada * conversiones[unidEntradaEscogida];
                // Convertir de metros a la unidad de salida
                const resultado = (valorEnMetros / conversiones[unidSalidaEscogida]).toFixed(4);

                valorSalida.value = resultado;
            }else {
                valorSalida.value = "";
            }
        }
    });

    d.addEventListener("click", (e) => {
        if (e.target.matches(unidEntrada) || e.target.matches(unidSalida)) {
            let valorEntrada = parseFloat(e.target.value);
            let valorSalida = d.querySelector(`${inputSalida}`);
            // Obtiene los elementos y valores de los select
            let unidEntradaEscogida = document.querySelector(unidEntrada).value;
            let unidSalidaEscogida = document.querySelector(unidSalida).value;

            if(valorEntrada) {
                // Convertir el valor de entrada a metros
                const valorEnMetros = valorEntrada * conversiones[unidEntradaEscogida];
                // Convertir de metros a la unidad de salida
                const resultado = (valorEnMetros / conversiones[unidSalidaEscogida]).toFixed(4);

                valorSalida.value = resultado;
            }else {
                valorSalida.value = "";
            }
        }
    });
}

function obtenerMasa(inputEntrada, unidEntrada, inputSalida, unidSalida) {
    const conversiones = {
        1: 1e6,            // tonelada a gramos
        2: 1000,           // kilogramo a gramos
        3: 1,              // gramo a gramos
        4: 0.001,          // miligramo a gramos
        5: 1e-9,           // nanogramo a gramos
        6: 1.66053904e-24, // unidad de masa atómica a gramos
        7: 453.592,        // libra a gramos
        8: 28.3495,        // onza a gramos
        9: 0.06479891      // grano a gramos
    };

    document.addEventListener("keyup", (e) => {
        if (e.target.matches(inputEntrada)) {
            let valorEntrada = parseFloat(e.target.value) || 0; // Asigna 0 si no hay entrada válida
            let valorSalida = document.querySelector(`${inputSalida}`);

            // Obtiene los elementos y valores de los select
            let unidEntradaEscogida = document.querySelector(unidEntrada).value;
            let unidSalidaEscogida = document.querySelector(unidSalida).value;

            if (valorEntrada) {
                // Convertir el valor de entrada a gramos
                const valorEnGramos = valorEntrada * conversiones[unidEntradaEscogida];
                // Convertir de gramos a la unidad de salida
                const resultado = (valorEnGramos / conversiones[unidSalidaEscogida]).toFixed(4);

                valorSalida.value = resultado;
            } else {
                valorSalida.value = "";
            }
        }
    });

    document.addEventListener("click", (e) => {
        if (e.target.matches(unidEntrada) || e.target.matches(unidSalida)) {
            let valorEntrada = parseFloat(document.querySelector(inputEntrada).value) || 0;
            let valorSalida = document.querySelector(`${inputSalida}`);
            
            // Obtiene los elementos y valores de los select
            let unidEntradaEscogida = document.querySelector(unidEntrada).value;
            let unidSalidaEscogida = document.querySelector(unidSalida).value;

            if (valorEntrada) {
                // Convertir el valor de entrada a gramos
                const valorEnGramos = valorEntrada * conversiones[unidEntradaEscogida];
                // Convertir de gramos a la unidad de salida
                const resultado = (valorEnGramos / conversiones[unidSalidaEscogida]).toFixed(4);


                valorSalida.value = resultado;
            } else {
                valorSalida.value = "";
            }
        }
    });
}

