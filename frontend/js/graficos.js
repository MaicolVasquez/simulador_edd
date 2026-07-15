/**
 * Módulo de Renderizado Gráfico (Persona 5 - Integración)
 * Dibuja el estado actual de cada estructura dentro de #area-grafica,
 * cumpliendo el requisito de "mostrar en forma gráfica" definido en el
 * trabajo, a partir de los datos que exponen pila.js, cola.js, lista.js
 * y arbol.js.
 */
const Graficos = {

    limpiar(contenedor) {
        contenedor.innerHTML = '';
    },

    renderPila(pila, contenedor) {
        this.limpiar(contenedor);
        const elementos = pila.obtenerElementos(); // de tope a fondo

        if (elementos.length === 0) {
            contenedor.innerHTML = '<p class="mensaje-vacio">Pila vacía. Inserta un valor.</p>';
            return;
        }

        const columna = document.createElement('div');
        columna.className = 'columna-vertical';

        elementos.forEach((valor, indice) => {
            const caja = document.createElement('div');
            caja.className = 'nodo-caja';
            if (indice === 0) caja.classList.add('nodo-activo');
            caja.innerHTML = `<span>${valor}</span>` + (indice === 0 ? '<small>tope</small>' : '');
            columna.appendChild(caja);
        });

        contenedor.appendChild(columna);
    },

    renderCola(cola, contenedor) {
        this.limpiar(contenedor);
        const elementos = cola.obtenerElementos(); // de frente a final

        if (elementos.length === 0) {
            contenedor.innerHTML = '<p class="mensaje-vacio">Cola vacía. Inserta un valor.</p>';
            return;
        }

        const fila = document.createElement('div');
        fila.className = 'fila-horizontal';

        elementos.forEach((valor, indice) => {
            const caja = document.createElement('div');
            caja.className = 'nodo-caja';
            let etiqueta = '';
            if (indice === 0) etiqueta = '<small>frente</small>';
            if (indice === elementos.length - 1 && elementos.length > 1) etiqueta = '<small>final</small>';
            if (elementos.length === 1) etiqueta = '<small>frente/final</small>';
            caja.innerHTML = `<span>${valor}</span>${etiqueta}`;
            fila.appendChild(caja);
            if (indice < elementos.length - 1) {
                const flecha = document.createElement('div');
                flecha.className = 'flecha';
                flecha.textContent = '→';
                fila.appendChild(flecha);
            }
        });

        contenedor.appendChild(fila);
    },

    renderLista(lista, contenedor) {
        this.limpiar(contenedor);
        const elementos = lista.obtenerElementos();

        if (elementos.length === 0) {
            contenedor.innerHTML = '<p class="mensaje-vacio">Lista vacía. Inserta un valor.</p>';
            return;
        }

        const fila = document.createElement('div');
        fila.className = 'fila-horizontal';

        elementos.forEach((valor, indice) => {
            const caja = document.createElement('div');
            caja.className = 'nodo-caja';
            caja.innerHTML = `<span>${valor}</span>` + (indice === 0 ? '<small>cabeza</small>' : '');
            fila.appendChild(caja);
            if (indice < elementos.length - 1) {
                const flecha = document.createElement('div');
                flecha.className = 'flecha';
                flecha.textContent = '→';
                fila.appendChild(flecha);
            } else {
                const flecha = document.createElement('div');
                flecha.className = 'flecha';
                flecha.textContent = '→ NULL';
                fila.appendChild(flecha);
            }
        });

        contenedor.appendChild(fila);
    },

    renderArbol(arbol, contenedor) {
        this.limpiar(contenedor);
        const nodos = arbol.obtenerNodosGraficos();

        if (nodos.length === 0) {
            contenedor.innerHTML = '<p class="mensaje-vacio">Árbol vacío. Inserta un valor.</p>';
            return;
        }

        const anchoNodo = 46;
        const espacioX = 56;
        const espacioY = 70;
        const maxPosicion = Math.max(...nodos.map(n => n.posicion));
        const ancho = (maxPosicion + 1) * espacioX + anchoNodo;
        const alto = (arbol.altura() + 1) * espacioY + anchoNodo;

        const lienzo = document.createElement('div');
        lienzo.className = 'arbol-lienzo';
        lienzo.style.width = ancho + 'px';
        lienzo.style.height = alto + 'px';

        // Mapa valor -> coordenadas para trazar las líneas padre-hijo
        const coords = {};
        nodos.forEach(n => {
            coords[n.valor] = {
                x: n.posicion * espacioX + anchoNodo / 2,
                y: n.nivel * espacioY + anchoNodo / 2
            };
        });

        // SVG con las líneas de conexión (se dibuja recorriendo el árbol real
        // para saber exactamente qué hijo corresponde a qué nodo)
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'arbol-lineas');
        svg.setAttribute('width', ancho);
        svg.setAttribute('height', alto);

        const dibujarLineas = (nodo) => {
            if (nodo === null) return;
            const origen = coords[nodo.dato];
            if (nodo.izquierdo) {
                const destino = coords[nodo.izquierdo.dato];
                svg.appendChild(this._crearLinea(origen, destino));
                dibujarLineas(nodo.izquierdo);
            }
            if (nodo.derecho) {
                const destino = coords[nodo.derecho.dato];
                svg.appendChild(this._crearLinea(origen, destino));
                dibujarLineas(nodo.derecho);
            }
        };
        dibujarLineas(arbol.raiz);
        lienzo.appendChild(svg);

        // Cajas de cada nodo, posicionadas de forma absoluta
        nodos.forEach(n => {
            const caja = document.createElement('div');
            caja.className = 'nodo-caja nodo-arbol';
            caja.style.left = (n.posicion * espacioX) + 'px';
            caja.style.top = (n.nivel * espacioY) + 'px';
            caja.innerHTML = `<span>${n.valor}</span>`;
            lienzo.appendChild(caja);
        });

        contenedor.appendChild(lienzo);
    },

    _crearLinea(origen, destino) {
        const linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linea.setAttribute('x1', origen.x);
        linea.setAttribute('y1', origen.y);
        linea.setAttribute('x2', destino.x);
        linea.setAttribute('y2', destino.y);
        linea.setAttribute('class', 'linea-arbol');
        return linea;
    },

    render(estructuraNombre, instancia, contenedor) {
        switch (estructuraNombre) {
            case 'pila': this.renderPila(instancia, contenedor); break;
            case 'cola': this.renderCola(instancia, contenedor); break;
            case 'lista': this.renderLista(instancia, contenedor); break;
            case 'arbol': this.renderArbol(instancia, contenedor); break;
        }
    }
};
