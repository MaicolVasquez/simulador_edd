#include "../include/lista.hpp"

// 1. Inicializamos la lista vacía
Lista::Lista() {
    cabeza = nullptr;
    cantidad = 0;
}

// 2. Insertar un elemento al final de la lista
void Lista::insertar(int dato) {
    NodoLista* nuevoNodo = new NodoLista(dato);

    if (estaVacia()) {
        // Si la lista estaba vacía, este nodo pasa a ser la cabeza
        cabeza = nuevoNodo;
    } else {
        // Recorremos hasta el último nodo para engancharlo ahí
        NodoLista* actual = cabeza;
        while (actual->siguiente != nullptr) {
            actual = actual->siguiente;
        }
        actual->siguiente = nuevoNodo;
    }
    cantidad++;
}

// 3. Eliminar la primera ocurrencia de un valor
bool Lista::eliminar(int dato) {
    if (estaVacia()) {
        return false;
    }

    // Caso especial: el dato está en la cabeza
    if (cabeza->dato == dato) {
        NodoLista* aux = cabeza;
        cabeza = cabeza->siguiente;
        delete aux;
        cantidad--;
        return true;
    }

    // Buscamos el nodo anterior al que queremos eliminar
    NodoLista* anterior = cabeza;
    while (anterior->siguiente != nullptr && anterior->siguiente->dato != dato) {
        anterior = anterior->siguiente;
    }

    // Si llegamos al final sin encontrarlo, no existe en la lista
    if (anterior->siguiente == nullptr) {
        return false;
    }

    // "Saltamos" el nodo a eliminar para desenlazarlo
    NodoLista* aux = anterior->siguiente;
    anterior->siguiente = aux->siguiente;
    delete aux;
    cantidad--;
    return true;
}

// 4. Eliminar un elemento según su posición (0 = cabeza)
bool Lista::eliminarPorPosicion(int pos) {
    if (estaVacia() || pos < 0 || pos >= cantidad) {
        return false;
    }

    if (pos == 0) {
        NodoLista* aux = cabeza;
        cabeza = cabeza->siguiente;
        delete aux;
        cantidad--;
        return true;
    }

    NodoLista* anterior = cabeza;
    for (int i = 0; i < pos - 1; i++) {
        anterior = anterior->siguiente;
    }

    NodoLista* aux = anterior->siguiente;
    anterior->siguiente = aux->siguiente;
    delete aux;
    cantidad--;
    return true;
}

// 5. Verificar si está vacía
bool Lista::estaVacia() {
    return cabeza == nullptr;
}

// 6. Cantidad de elementos actuales
int Lista::tamano() {
    return cantidad;
}

// 7. Verificar si un valor existe en la lista
bool Lista::contiene(int dato) {
    NodoLista* actual = cabeza;
    while (actual != nullptr) {
        if (actual->dato == dato) {
            return true;
        }
        actual = actual->siguiente;
    }
    return false;
}

// 8. Entregar todos los valores en orden para que la web los dibuje
//    como una cadena de cajas conectadas por flechas.
std::vector<int> Lista::obtenerElementos() {
    std::vector<int> elementos;
    NodoLista* actual = cabeza;
    while (actual != nullptr) {
        elementos.push_back(actual->dato);
        actual = actual->siguiente;
    }
    return elementos;
}

// 9. Destructor: limpia toda la memoria si se destruye la lista
Lista::~Lista() {
    while (!estaVacia()) {
        eliminarPorPosicion(0);
    }
}