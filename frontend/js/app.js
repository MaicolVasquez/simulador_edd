/**
 * app.js - Integración final del simulador (Persona 5)
 *
 * Une:
 *  - La interfaz visual de Persona 1 (index.html / styles.css)
 *  - Las estructuras de datos de Persona 2 (pila.js, cola.js) y
 *    Persona 3 (lista.js, arbol.js), portadas desde C++ a JS
 *  - El motor de explicaciones de Persona 4 (motor/explicaciones.js)
 *  - El módulo de renderizado gráfico (graficos.js)
 *
 * para que la página web funcione como un único sistema.
 */
document.addEventListener('DOMContentLoaded', () => {

    // Una instancia independiente por estructura: así no se pierden los
    // datos al cambiar de pestaña y volver.
    const instancias = {
        pila: new Pila(),
        cola: new Cola(),
        lista: new Lista(),
        arbol: new ArbolBinario()
    };

    let estructuraActual = null;

    const botonesEstructura = document.querySelectorAll('.btn[data-estructura]');
    const areaGrafica = document.getElementById('area-grafica');
    const cajaTexto = document.getElementById('caja-texto');
    const inputValor = document.getElementById('valor');
    const btnInsertar = document.querySelector('.btn.insertar');
    const btnEliminar = document.querySelector('.btn.eliminar');

    function seleccionarEstructura(nombre) {
        estructuraActual = nombre;

        botonesEstructura.forEach(btn => {
            btn.classList.toggle('activo', btn.dataset.estructura === nombre);
        });

        Graficos.render(estructuraActual, instancias[estructuraActual], areaGrafica);
        cajaTexto.innerHTML = `<p>Estructura seleccionada: <strong>${nombre.toUpperCase()}</strong>. Ingresa un número y presiona Insertar o Eliminar.</p>`;
    }

    function mostrarExplicacion(operacion, resultado) {
        const html = MotorExplicaciones.obtenerExplicacion(
            estructuraActual,
            operacion,
            resultado.valor,
            resultado.contexto
        );
        cajaTexto.innerHTML = html;
    }

    function manejarInsertar() {
        if (!estructuraActual) {
            cajaTexto.innerHTML = '<p>Primero selecciona una estructura (Pila, Cola, Lista o Árbol).</p>';
            return;
        }
        const texto = inputValor.value.trim();
        if (texto === '' || isNaN(Number(texto))) {
            cajaTexto.innerHTML = '<p>Ingresa un número válido antes de insertar.</p>';
            return;
        }
        const valor = Number(texto);
        const instancia = instancias[estructuraActual];
        const resultado = instancia.insertar(valor);

        mostrarExplicacion('insertar', resultado);
        Graficos.render(estructuraActual, instancia, areaGrafica);
        inputValor.value = '';
        inputValor.focus();
    }

    function manejarEliminar() {
        if (!estructuraActual) {
            cajaTexto.innerHTML = '<p>Primero selecciona una estructura (Pila, Cola, Lista o Árbol).</p>';
            return;
        }
        const instancia = instancias[estructuraActual];

        let resultado;
        if (estructuraActual === 'pila' || estructuraActual === 'cola') {
            // Pila y Cola eliminan siempre desde su extremo correspondiente
            resultado = instancia.eliminar();
        } else {
            // Lista y Árbol eliminan un valor específico ingresado por el usuario
            const texto = inputValor.value.trim();
            if (texto === '' || isNaN(Number(texto))) {
                cajaTexto.innerHTML = '<p>Ingresa el número que deseas eliminar de la estructura.</p>';
                return;
            }
            resultado = instancia.eliminar(Number(texto));
        }

        mostrarExplicacion('eliminar', resultado);
        Graficos.render(estructuraActual, instancia, areaGrafica);
        inputValor.value = '';
        inputValor.focus();
    }

    botonesEstructura.forEach(btn => {
        btn.addEventListener('click', () => seleccionarEstructura(btn.dataset.estructura));
    });

    btnInsertar.addEventListener('click', manejarInsertar);
    btnEliminar.addEventListener('click', manejarEliminar);
    inputValor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') manejarInsertar();
    });

    // Estructura por defecto al cargar la página
    seleccionarEstructura('pila');
});
