/**
 * Pila (LIFO) - Portado a JavaScript desde backend/src/pila.cpp (Persona 2)
 * para poder ejecutarse en el navegador dentro del simulador web.
 * Se conserva la misma lógica y nombres originales (tope, Nodo, etc).
 */
class Pila {
    constructor() {
        this.tope = null; // Nodo* tope
    }

    // Insertar (Push)
    insertar(dato) {
        const estabaVacia = this.estaVacia();
        const nuevoNodo = { dato, siguiente: this.tope };
        this.tope = nuevoNodo;
        return { valor: dato, contexto: { estabaVacia } };
    }

    // Eliminar (Pop)
    eliminar() {
        const estabaVacia = this.estaVacia();
        if (estabaVacia) {
            return { valor: null, contexto: { estabaVacia } };
        }
        const aux = this.tope;
        const datoEliminado = aux.dato;
        this.tope = this.tope.siguiente;
        return { valor: datoEliminado, contexto: { estabaVacia } };
    }

    estaVacia() {
        return this.tope === null;
    }

    verTope() {
        return this.estaVacia() ? null : this.tope.dato;
    }

    // Entrega los valores de arriba hacia abajo, listos para graficar
    obtenerElementos() {
        const elementos = [];
        let actual = this.tope;
        while (actual !== null) {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        }
        return elementos;
    }
}
