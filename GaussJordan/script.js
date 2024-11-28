
const d = document;

d.addEventListener("DOMContentLoaded", ()=>{
    resolver("#tbody-matriz-inicio", "#btn-resolver");
    borrar("#tbody-matriz-inicio", "#btn-borrar", ".container-proceso");
    mostrarProceso("#tbody-matriz-inicio",".container-proceso","#btn-proceso");

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

function resolver(idBodyMatrizInicial, idBtnResolver) {
    document.addEventListener("click", (e) => {
        if (e.target.matches(idBtnResolver)) {
            let tbody = document.querySelector(idBodyMatrizInicial);
            let valores = [];
            let inputsCompletos = true; // Variable para verificar que todos los campos estén llenos

            tbody.querySelectorAll("tr").forEach(fila => {
                let filaValores = [];
                
                fila.querySelectorAll("input[type='number']").forEach(input => {
                    let valor = input.value.trim();

                    // Verificar que el input no esté vacío
                    if (valor === "" || isNaN(valor)) {
                        inputsCompletos = false;
                    } else {
                        filaValores.push(Number(valor)); // Convertir a número
                    }
                });

                valores.push(filaValores);
            });

            // Si todos los inputs están completos, ejecutar gaussJordan
            if (inputsCompletos) {
                let resultado = gaussJordan(valores);

                // Asignar resultados si gaussJordan retorna un valor válido
                if (resultado) {
                    document.querySelector("#resultado-uno").value = resultado[0].toFixed(4);
                    document.querySelector("#resultado-dos").value = resultado[1].toFixed(4);
                    document.querySelector("#resultado-tres").value = resultado[2].toFixed(4);
                }
            } else {
                alert("Algunos campos están vacíos o contienen valores inválidos.");
            }
        }
    });
}

function borrar(idBodyMatrizInicial, idBtnBorrar, claseDivContainer) {
    d.addEventListener("click", (e)=>{
        if(e.target.matches(idBtnBorrar)) {
            let tbody = d.querySelector(idBodyMatrizInicial);

            tbody.querySelectorAll("tr").forEach(fila => {
                // Recorrido de cada input dentro de la fila
                fila.querySelectorAll("input[type='number']").forEach(input => {
                    //Se vacian los inputs
                    input.value = "";
                });
            });

            d.querySelector("#resultado-uno").value = "";
            d.querySelector("#resultado-dos").value = "";
            d.querySelector("#resultado-tres").value = "";

            d.querySelector(claseDivContainer).innerHTML = "";
        }
    });
}

function gaussJordan(matriz) {
    const n = matriz.length;

    // Convertir matriz en forma escalonada reducida
    for (let i = 0; i < n; i++) {
        if (matriz[i][i] === 0) {
            console.error("Error: El elemento diagonal es cero, no se puede dividir.");
            return null;
        }
        // Hacer el elemento matriz[i][i] = 1
        let divisor = matriz[i][i];
        for (let j = 0; j <= 3; j++) {
            matriz[i][j] /= divisor;
        }
        // Hacer los elementos en la columna i iguales a 0, excepto en matriz[i][i]
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = matriz[k][i];
                for (let j = 0; j <= n; j++) {
                    //console.log(matriz[k][j])
                    matriz[k][j] -= factor * matriz[i][j];
                }
            }
        }
    }

    // Extraer la solución (última columna de la matriz)
    let resultado = matriz.map(fila => fila[n]);
    return resultado;
}

function mostrarProceso(idBodyMatrizInicial, claseDivContainer, idBotonProceso) {
    document.addEventListener("click", (e) => {
        if (e.target.matches(idBotonProceso)) {
            let tbody = document.querySelector(idBodyMatrizInicial);
            let valores = [];
            let matrizValida = true; // Variable para validar la matriz

            // Recorrer cada fila de la tabla
            tbody.querySelectorAll("tr").forEach(fila => {
                let filaValores = [];
                
                // Recorrer cada input dentro de la fila
                fila.querySelectorAll("input[type='number']").forEach(input => {
                    let valor = input.value.trim();

                    // Verificar si el valor es un número
                    if (valor === "" || isNaN(valor)) {
                        matrizValida = false;
                    } else {
                        filaValores.push(Number(valor));
                    }
                });

                // Agregar la fila solo si la fila es válida
                if (filaValores.length > 0) {
                    valores.push(filaValores);
                }
            });

            // Llamar a gaussJordanProceso solo si la matriz es válida
            if (matrizValida && valores.length > 0) {
                gaussJordanProceso(valores, claseDivContainer);
            } else {
                alert("Por favor, complete todos los campos con números válidos.");
            }
        }
        const observerOptions = {
            root: null, // Observa en el viewport completo
            threshold: 0.25 // Actúa cuando el 25% del elemento es visible
        };
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Cuando el elemento entra en el viewport, añade la clase visible
                    entry.target.classList.add("visible");
                } else {
                    // Cuando el elemento sale del viewport, quita la clase visible
                    entry.target.classList.remove("visible");
                }
            });
        }, observerOptions);
    
        // Selecciona todas las tablas que tengan la clase .table-proceso
        const elementos = document.querySelectorAll(".table-proceso");
        elementos.forEach(el => observer.observe(el));
    });
}

function gaussJordanProceso(matriz, claseDivContainer) {
    const n = matriz.length;
    const contenedor = document.querySelector(claseDivContainer);
    contenedor.innerHTML = ""; // Limpiar contenido previo

    for (let i = 0; i < n; i++) {
        if (matriz[i][i] === 0) {
            console.error("Error: El elemento diagonal es cero, no se puede dividir.");
            return null;
        }

        // Hacer el elemento matriz[i][i] = 1
        let divisor = matriz[i][i];
        for (let j = 0; j <= n; j++) {
            matriz[i][j] /= divisor;
        }

        const contenedorPaso = document.createElement("div");
        contenedorPaso.classList.add("container-paso");
        contenedorPaso.innerHTML += `Dividir fila ${i + 1} entre ${divisor.toFixed(2)}:<br>`;
        contenedorPaso.innerHTML += crearTabla(matriz).outerHTML;
        contenedor.appendChild(contenedorPaso);

        // Hacer los elementos en la columna i iguales a 0, excepto en matriz[i][i]
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = matriz[k][i];
                for (let j = 0; j <= n; j++) {
                    matriz[k][j] -= factor * matriz[i][j];
                }

                const contenedorPaso2 = document.createElement("div");
                contenedorPaso2.classList.add("container-paso");
                contenedorPaso2.innerHTML += `Restar ${factor.toFixed(2)} veces la fila ${i + 1} de la fila ${k + 1}:<br>`;
                contenedorPaso2.innerHTML += crearTabla(matriz).outerHTML;
                contenedor.appendChild(contenedorPaso2);
            }
        }
    }

    // Obtener los resultados de la última columna de la matriz
    let resultado = matriz.map(fila => fila[n]);

    // Crear un contenedor final para mostrar el resultado
    const contenedorResultado = document.createElement("div");
    contenedorResultado.classList.add("container-paso");
    contenedorResultado.innerHTML += `Resultado final:<br>`;
    contenedorResultado.innerHTML += crearTabla([resultado]).outerHTML;
    contenedor.appendChild(contenedorResultado);

    // Asignar resultados si gaussJordan retorna un valor válido
    const resultadoInputs = ["#resultado-uno", "#resultado-dos", "#resultado-tres"];
    resultado.forEach((valor, index) => {
        if (document.querySelector(resultadoInputs[index])) {
            document.querySelector(resultadoInputs[index]).value = valor.toFixed(4);
        }
    });
}

function crearTabla(matriz) {
    let tabla = document.createElement("table");
    tabla.classList.add("table-proceso");
    matriz.forEach(fila => {
        let filaElemento = document.createElement("tr");
        fila.forEach(valor => {
            let celda = document.createElement("td");
            celda.innerHTML = (valor).toFixed(2);
            filaElemento.appendChild(celda);
        });
        tabla.appendChild(filaElemento);
    });
    
    return tabla;
}
