

export function valorBoton(contenedorBotones, inputDestino) {
    const d = document;

    d.addEventListener("click", (e) => {
        // Verifica si se hizo clic en un botón de número o en el botón de punto
        if (e.target.matches(`${contenedorBotones} .btn-numero`)) {
            const botonValor = e.target.value;
            const input = d.querySelector(inputDestino + " input");

            input.value += botonValor;
            //console.log(botonValor);
        }

        if (e.target.matches(`${contenedorBotones} .btn-operacion`)) {
            const botonValor = e.target.value;
            const input = d.querySelector(inputDestino + " input");

            input.value += botonValor;
            //console.log(botonValor);
        }
    });

}

export function borrarCampos(idBotonBorrar) {
    const d = document;
    
    let btnBorrar = d.querySelector(idBotonBorrar);

    btnBorrar.addEventListener("click", () => {
        //console.log("boton");

        let inputEntrada = d.querySelector(".calculadora-resultado input");
        let inputResultado = d.querySelector(".num-anterior input");

        inputResultado.value = "";
        inputEntrada.value = "";
    });
}

export function retroceder(idBotonRetroceder) {
    const d = document;
    
    let btnRetroceder = d.querySelector(idBotonRetroceder);

    btnRetroceder.addEventListener("click", () => {

        let inputEntrada = d.querySelector(".calculadora-resultado input");
        
        inputEntrada.value = inputEntrada.value.slice(0,-1) ;
    });
}

export function darResultado(idBotonResultado) {
    const d = document;
    
    let btnResultado = d.querySelector(idBotonResultado);

    btnResultado.addEventListener("click", () => {
        let inputEntrada = d.querySelector(".calculadora-resultado input");
        let inputResultado = d.querySelector(".num-anterior input");
        let expresion = inputEntrada.value;

        try {
            // Resolver la expresión
            let resultado = resolverExpresion(expresion);
            inputResultado.value = (resultado).toFixed(4);
        } catch (error) {
            inputResultado.value = "Error";
            console.error("Expresión inválida:", error);
        }
    });
}

function resolverExpresion(expresion) {
    // Reemplazar 'x' con '*'
    expresion = expresion.replace(/x/g, '*');

    // Paso 1: Convertir infija a posfija (Notación Polaca Inversa - RPN)
    const infijaAPosfija = (expresion) => {
        const precedencia = { '+': 1, '-': 1, '*': 2, '/': 2 };
        const operadores = Object.keys(precedencia);
        const salida = [];
        const pila = [];

        // Tokenización robusta para manejar números negativos
        const tokens = expresion.match(/(\d+(\.\d+)?|[+*/()-])/g);

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];

            // Si encontramos un signo negativo al principio o después de un paréntesis o un operador
            if (token === '-' && (i === 0 || tokens[i - 1] === '(' || operadores.includes(tokens[i - 1]))) {
                // Unir el signo con el siguiente número
                token += tokens[++i];
            }

            if (!isNaN(parseFloat(token))) {
                // Si es un número, agregarlo a la salida
                salida.push(token);
            } else if (operadores.includes(token)) {
                // Manejar operadores según precedencia
                while (
                    pila.length &&
                    operadores.includes(pila[pila.length - 1]) &&
                    precedencia[token] <= precedencia[pila[pila.length - 1]]
                ) {
                    salida.push(pila.pop());
                }
                pila.push(token);
            } else if (token === '(') {
                pila.push(token);
            } else if (token === ')') {
                // Sacar operadores hasta encontrar '('
                while (pila.length && pila[pila.length - 1] !== '(') {
                    salida.push(pila.pop());
                }
                pila.pop(); // Eliminar '(' de la pila
            }
        }

        // Vaciar la pila al final
        while (pila.length) {
            salida.push(pila.pop());
        }

        return salida;
    };

    // Paso 2: Evaluar la expresión posfija
    const evaluarPosfija = (posfija) => {
        const pila = [];
        for (let token of posfija) {
            if (!isNaN(parseFloat(token))) {
                // Si es un número, agregarlo a la pila
                pila.push(parseFloat(token));
            } else {
                // Aplicar el operador a los dos últimos elementos de la pila
                const b = pila.pop();
                const a = pila.pop();
                switch (token) {
                    case '+':
                        pila.push(a + b);
                        break;
                    case '-':
                        pila.push(a - b);
                        break;
                    case '*':
                        pila.push(a * b);
                        break;
                    case '/':
                        pila.push(a / b);
                        break;
                }
            }
        }
        return pila.pop(); // El resultado final está en la cima de la pila
    };

    // Convertir la expresión infija a posfija y evaluar
    const posfija = infijaAPosfija(expresion);
    return evaluarPosfija(posfija);
}
