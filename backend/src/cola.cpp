#include "../include/cola.hpp"

// 1. Inicializamos la cola vacía
Cola::Cola() {
    frente = nullptr;
    final = nullptr;
}

// 2. Insertar un elemento al final (Enqueue)
void Cola::insertar(int dato) {
    // Llega un nuevo "cliente" a la fila
    NodoCola* nuevoNodo = new NodoCola(dato);
    
    if (estaVacia()) {
        // Si la fila estaba vacía, este nodo es el primero y también el último
        frente = nuevoNodo;
        final = nuevoNodo;
    } else {
        // Si ya hay gente, el que estaba al final ahora apunta al nuevo
        final->siguiente = nuevoNodo;
        // Y el nuevo pasa a ser oficialmente el final de la fila
        final = nuevoNodo;
    }
}

// 3. Eliminar un elemento del frente (Dequeue)
int Cola::eliminar() {
    if (estaVacia()) {
        return -1; // Retorno de error si la cola está vacía
    }

    // Identificamos al "cliente" que está en el frente
    NodoCola* aux = frente;
    int datoEliminado = aux->dato;
    
    // El nuevo frente ahora es la persona que estaba detrás de él
    frente = frente->siguiente;
    
    // Caso especial: si al sacar a esta persona la fila se quedó vacía,
    // el puntero 'final' también debe reiniciarse a nullptr.
    if (frente == nullptr) {
        final = nullptr;
    }
    
    // Liberamos la memoria del nodo que ya salió
    delete aux;
    
    return datoEliminado;
}

// 4. Verificar si está vacía
bool Cola::estaVacia() {
    return frente == nullptr;
}

// 5. Ver el elemento del frente sin eliminarlo
int Cola::verFrente() {
    if (estaVacia()) {
        return -1;
    }
    return frente->dato;
}

// 6. Destructor: Limpia la memoria de toda la cola
Cola::~Cola() {
    while (!estaVacia()) {
        eliminar();
    }
}