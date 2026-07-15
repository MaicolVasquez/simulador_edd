/**
 * Árbol Binario de Búsqueda (BST) - Portado a JavaScript desde
 * backend/src/arbol.cpp (Persona 3) para poder ejecutarse en el navegador
 * dentro del simulador web. Conserva los mismos 3 casos de eliminación.
 */
class ArbolBinario {
    constructor() {
        this.raiz = null; // NodoArbol* raiz
        this.cantidad = 0;
    }

    insertarRec(nodo, dato) {
        if (nodo === null) {
            return { dato, izquierdo: null, derecho: null };
        }
        if (dato < nodo.dato) {
            nodo.izquierdo = this.insertarRec(nodo.izquierdo, dato);
        } else {
            nodo.derecho = this.insertarRec(nodo.derecho, dato);
        }
        return nodo;
    }

    insertar(dato) {
        const esRaiz = this.raiz === null;
        this.raiz = this.insertarRec(this.raiz, dato);
        this.cantidad++;
        return { valor: dato, contexto: { esRaiz } };
    }

    encontrarMinimo(nodo) {
        while (nodo.izquierdo !== null) {
            nodo = nodo.izquierdo;
        }
        return nodo;
    }

    // Devuelve { nodo, caso, sucesorValor } para poder informar el caso al motor
    eliminarRec(nodo, dato, resultado) {
        if (nodo === null) {
            return null; // no existe
        }
        if (dato < nodo.dato) {
            nodo.izquierdo = this.eliminarRec(nodo.izquierdo, dato, resultado);
        } else if (dato > nodo.dato) {
            nodo.derecho = this.eliminarRec(nodo.derecho, dato, resultado);
        } else {
            resultado.encontrado = true;

            // Caso 1: nodo hoja
            if (nodo.izquierdo === null && nodo.derecho === null) {
                resultado.caso = 1;
                return null;
            }
            // Caso 2: un solo hijo
            if (nodo.izquierdo === null) {
                resultado.caso = 2;
                return nodo.derecho;
            }
            if (nodo.derecho === null) {
                resultado.caso = 2;
                return nodo.izquierdo;
            }
            // Caso 3: dos hijos -> sucesor in-orden
            resultado.caso = 3;
            const sucesor = this.encontrarMinimo(nodo.derecho);
            resultado.sucesorValor = sucesor.dato;
            nodo.dato = sucesor.dato;
            const resultadoInterno = { encontrado: false };
            nodo.derecho = this.eliminarRec(nodo.derecho, sucesor.dato, resultadoInterno);
        }
        return nodo;
    }

    eliminar(dato) {
        const estabaVacia = this.estaVacio();
        if (estabaVacia) {
            return { valor: dato, contexto: { estabaVacia } };
        }
        const resultado = { encontrado: false, caso: null, sucesorValor: null };
        this.raiz = this.eliminarRec(this.raiz, dato, resultado);
        if (resultado.encontrado) {
            this.cantidad--;
        }
        return {
            valor: dato,
            contexto: {
                estabaVacia,
                encontrado: resultado.encontrado,
                caso: resultado.caso,
                sucesorValor: resultado.sucesorValor
            }
        };
    }

    estaVacio() {
        return this.raiz === null;
    }

    tamano() {
        return this.cantidad;
    }

    alturaRec(nodo) {
        if (nodo === null) return -1;
        return 1 + Math.max(this.alturaRec(nodo.izquierdo), this.alturaRec(nodo.derecho));
    }

    altura() {
        return this.alturaRec(this.raiz);
    }

    // Calcula nivel + posición horizontal (in-orden) de cada nodo,
    // igual que backend/src/arbol.cpp, para que graficos.js solo tenga
    // que ubicar cajas en un plano y trazar líneas.
    calcularGrafico(nodo, nivel, contador, resultado) {
        if (nodo === null) return;
        this.calcularGrafico(nodo.izquierdo, nivel + 1, contador, resultado);

        resultado.push({
            valor: nodo.dato,
            nivel,
            posicion: contador.valor,
            tieneHijoIzquierdo: nodo.izquierdo !== null,
            tieneHijoDerecho: nodo.derecho !== null
        });
        contador.valor++;

        this.calcularGrafico(nodo.derecho, nivel + 1, contador, resultado);
    }

    obtenerNodosGraficos() {
        const resultado = [];
        this.calcularGrafico(this.raiz, 0, { valor: 0 }, resultado);
        return resultado;
    }
}
