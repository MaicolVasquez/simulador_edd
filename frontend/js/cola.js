/**
 * Cola (FIFO) - Portado a JavaScript desde backend/src/cola.cpp (Persona 2)
 * para poder ejecutarse en el navegador dentro del simulador web.
 */
class Cola {
    constructor() {
        this.frente = null; // NodoCola* frente
        this.final = null;  // NodoCola* final
    }

    // Insertar (Enqueue)
    insertar(dato) {
        const estabaVacia = this.estaVacia();
        const nuevoNodo = { dato, siguiente: null };

        if (estabaVacia) {
            this.frente = nuevoNodo;
            this.final = nuevoNodo;
        } else {
            this.final.siguiente = nuevoNodo;
            this.final = nuevoNodo;
        }
        return { valor: dato, contexto: { estabaVacia } };
    }

    // Eliminar (Dequeue)
    eliminar() {
        const estabaVacia = this.estaVacia();
        if (estabaVacia) {
            return { valor: null, contexto: { estabaVacia } };
        }

        const aux = this.frente;
        const datoEliminado = aux.dato;
        this.frente = this.frente.siguiente;

        const quedoVacia = this.frente === null;
        if (quedoVacia) {
            this.final = null;
        }

        return { valor: datoEliminado, contexto: { estabaVacia, quedoVacia } };
    }

    estaVacia() {
        return this.frente === null;
    }

    verFrente() {
        return this.estaVacia() ? null : this.frente.dato;
    }

    // Entrega los valores del frente al final, listos para graficar
    obtenerElementos() {
        const elementos = [];
        let actual = this.frente;
        while (actual !== null) {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        }
        return elementos;
    }
}
