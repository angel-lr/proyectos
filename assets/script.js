"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById("toggle-theme");
    const themeIcon = document.getElementById("theme-icon");

    // Carga el modo actual desde localStorage
    const isDarkMode = localStorage.getItem("theme") === "dark";

    // Aplica el tema almacenado y ajusta la imagen
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        themeIcon.src = "assets/moon-fill.svg"; // Imagen de la luna para el modo oscuro
        themeIcon.alt = "modo-oscuro";
    } else {
        themeIcon.src = "assets/sun.svg"; // Imagen del sol para el modo claro
        themeIcon.alt = "modo-claro";
    }

    // Evento para alternar entre los temas
    themeToggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Cambia la imagen y guarda la preferencia
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeIcon.src = "assets/moon-fill.svg"; // Imagen de la luna para el modo oscuro
            themeIcon.alt = "modo-oscuro";
        } else {
            localStorage.setItem("theme", "light");
            themeIcon.src = "assets/sun.svg"; // Imagen del sol para el modo claro
            themeIcon.alt = "modo-claro";
        }
    });
});
