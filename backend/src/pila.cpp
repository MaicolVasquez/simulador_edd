#include "../include/pila.hpp"

// 1. Inicializamos la pila vacía
Pila::Pila() {
    tope = nullptr;
}

// 2. Insertar un elemento (Push)
void Pila::insertar(int dato) {
    // Creamos una nueva "caja" en la memoria
    Nodo* nuevoNodo = new Nodo(dato);
    
    // El nuevo nodo se apoya sobre el que antes era el tope
    nuevoNodo->siguiente = tope;
    
    // Ahora el nuevo nodo es oficialmente el punto más alto de la pila
    tope = nuevoNodo;
}

// 3. Eliminar un elemento (Pop)
int Pila::eliminar() {
    // Si la pila está vacía, retornamos un valor de error (ej. -1)
    if (estaVacia()) {
        return -1; 
    }

    // Guardamos el nodo que vamos a eliminar temporalmente
    Nodo* aux = tope;
    
    // Extraemos el dato para poder retornarlo a la interfaz web
    int datoEliminado = aux->dato;
    
    // El nuevo tope ahora es el nodo que estaba justo debajo
    tope = tope->siguiente;
    
    // ¡Paso crítico! Liberamos la memoria de la "caja" que sacamos
    delete aux;
    
    return datoEliminado;
}

// 4. Verificar si está vacía
bool Pila::estaVacia() {
    return tope == nullptr;
}

// 5. Ver el elemento de arriba sin eliminarlo (Peek)
int Pila::verTope() {
    if (estaVacia()) {
        return -1;
    }
    return tope->dato;
}

// 6. Destructor: Limpia toda la memoria si se destruye la pila
Pila::~Pila() {
    while (!estaVacia()) {
        eliminar();
    }
}