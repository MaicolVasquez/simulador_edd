/**
 * Lista Enlazada Simple - Portado a JavaScript desde backend/src/lista.cpp
 * (Persona 3) para poder ejecutarse en el navegador dentro del simulador web.
 */
class Lista {
    constructor() {
        this.cabeza = null; // NodoLista* cabeza
        this.cantidad = 0;
    }

    // Insertar al final
    insertar(dato) {
        const estabaVacia = this.estaVacia();
        const nuevoNodo = { dato, siguiente: null };

        if (estabaVacia) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
        this.cantidad++;
        return { valor: dato, contexto: { estabaVacia } };
    }

    // Eliminar la primera ocurrencia de "dato"
    eliminar(dato) {
        const estabaVacia = this.estaVacia();
        if (estabaVacia) {
            return { valor: dato, contexto: { estabaVacia } };
        }

        // Caso especial: el dato está en la cabeza
        if (this.cabeza.dato === dato) {
            this.cabeza = this.cabeza.siguiente;
            this.cantidad--;
            return { valor: dato, contexto: { estabaVacia, esCabeza: true, encontrado: true } };
        }

        // Buscamos el nodo anterior al que queremos eliminar
        let anterior = this.cabeza;
        while (anterior.siguiente !== null && anterior.siguiente.dato !== dato) {
            anterior = anterior.siguiente;
        }

        if (anterior.siguiente === null) {
            // No se encontró el valor
            return { valor: dato, contexto: { estabaVacia, esCabeza: false, encontrado: false } };
        }

        anterior.siguiente = anterior.siguiente.siguiente;
        this.cantidad--;
        return { valor: dato, contexto: { estabaVacia, esCabeza: false, encontrado: true } };
    }

    estaVacia() {
        return this.cabeza === null;
    }

    tamano() {
        return this.cantidad;
    }

    // Entrega todos los valores en orden, listos para graficar
    obtenerElementos() {
        const elementos = [];
        let actual = this.cabeza;
        while (actual !== null) {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        }
        return elementos;
    }
}
