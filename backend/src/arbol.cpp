#include "../include/arbol.hpp"
#include <algorithm>

// 1. Inicializamos el árbol vacío
ArbolBinario::ArbolBinario() {
    raiz = nullptr;
    cantidad = 0;
}

// 2. Insertar un elemento (recursivo, respetando la regla del BST:
//    menores a la izquierda, mayores o iguales a la derecha)
NodoArbol* ArbolBinario::insertarRec(NodoArbol* nodo, int dato) {
    if (nodo == nullptr) {
        return new NodoArbol(dato);
    }

    if (dato < nodo->dato) {
        nodo->izquierdo = insertarRec(nodo->izquierdo, dato);
    } else {
        nodo->derecho = insertarRec(nodo->derecho, dato);
    }

    return nodo;
}

void ArbolBinario::insertar(int dato) {
    raiz = insertarRec(raiz, dato);
    cantidad++;
}

// 3. Eliminar un elemento (recursivo, maneja los 3 casos clásicos:
//    nodo hoja, nodo con un hijo y nodo con dos hijos)
NodoArbol* ArbolBinario::eliminarRec(NodoArbol* nodo, int dato, bool &eliminado) {
    if (nodo == nullptr) {
        return nullptr; // El dato no existe en el árbol
    }

    if (dato < nodo->dato) {
        nodo->izquierdo = eliminarRec(nodo->izquierdo, dato, eliminado);
    } else if (dato > nodo->dato) {
        nodo->derecho = eliminarRec(nodo->derecho, dato, eliminado);
    } else {
        // Encontramos el nodo a eliminar
        eliminado = true;

        // Caso 1: nodo hoja (sin hijos)
        if (nodo->izquierdo == nullptr && nodo->derecho == nullptr) {
            delete nodo;
            return nullptr;
        }

        // Caso 2: un solo hijo -> el hijo ocupa el lugar del nodo
        if (nodo->izquierdo == nullptr) {
            NodoArbol* aux = nodo->derecho;
            delete nodo;
            return aux;
        }
        if (nodo->derecho == nullptr) {
            NodoArbol* aux = nodo->izquierdo;
            delete nodo;
            return aux;
        }

        // Caso 3: dos hijos -> buscamos el sucesor (el menor del subárbol derecho),
        // copiamos su valor aquí y luego eliminamos ese sucesor de su posición original
        NodoArbol* sucesor = encontrarMinimo(nodo->derecho);
        nodo->dato = sucesor->dato;
        bool auxEliminado = false;
        nodo->derecho = eliminarRec(nodo->derecho, sucesor->dato, auxEliminado);
    }

    return nodo;
}

bool ArbolBinario::eliminar(int dato) {
    bool eliminado = false;
    raiz = eliminarRec(raiz, dato, eliminado);
    if (eliminado) {
        cantidad--;
    }
    return eliminado;
}

// 4. Encontrar el nodo con el valor mínimo de un subárbol (el más a la izquierda)
NodoArbol* ArbolBinario::encontrarMinimo(NodoArbol* nodo) {
    while (nodo->izquierdo != nullptr) {
        nodo = nodo->izquierdo;
    }
    return nodo;
}

// 5. Verificar si está vacío
bool ArbolBinario::estaVacio() {
    return raiz == nullptr;
}

// 6. Cantidad de elementos actuales
int ArbolBinario::tamano() {
    return cantidad;
}

// 7. Verificar si un valor existe en el árbol
bool ArbolBinario::contiene(int dato) {
    NodoArbol* actual = raiz;
    while (actual != nullptr) {
        if (dato == actual->dato) {
            return true;
        }
        actual = (dato < actual->dato) ? actual->izquierdo : actual->derecho;
    }
    return false;
}

// 8. Altura del árbol (para que la web sepa cuántas filas dibujar)
int alturaRec(NodoArbol* nodo) {
    if (nodo == nullptr) {
        return -1; // Árbol vacío tiene altura -1; un solo nodo tiene altura 0
    }
    return 1 + std::max(alturaRec(nodo->izquierdo), alturaRec(nodo->derecho));
}

int ArbolBinario::altura() {
    return alturaRec(raiz);
}

// 9. Recorridos clásicos
void ArbolBinario::inOrdenRec(NodoArbol* nodo, std::vector<int>& resultado) {
    if (nodo == nullptr) return;
    inOrdenRec(nodo->izquierdo, resultado);
    resultado.push_back(nodo->dato);
    inOrdenRec(nodo->derecho, resultado);
}

void ArbolBinario::preOrdenRec(NodoArbol* nodo, std::vector<int>& resultado) {
    if (nodo == nullptr) return;
    resultado.push_back(nodo->dato);
    preOrdenRec(nodo->izquierdo, resultado);
    preOrdenRec(nodo->derecho, resultado);
}

void ArbolBinario::postOrdenRec(NodoArbol* nodo, std::vector<int>& resultado) {
    if (nodo == nullptr) return;
    postOrdenRec(nodo->izquierdo, resultado);
    postOrdenRec(nodo->derecho, resultado);
    resultado.push_back(nodo->dato);
}

std::vector<int> ArbolBinario::recorridoInOrden() {
    std::vector<int> resultado;
    inOrdenRec(raiz, resultado);
    return resultado;
}

std::vector<int> ArbolBinario::recorridoPreOrden() {
    std::vector<int> resultado;
    preOrdenRec(raiz, resultado);
    return resultado;
}

std::vector<int> ArbolBinario::recorridoPostOrden() {
    std::vector<int> resultado;
    postOrdenRec(raiz, resultado);
    return resultado;
}

// 10. Calcular nivel + posición horizontal de cada nodo.
//     Usamos un recorrido in-orden: cada vez que "visitamos" un nodo le
//     asignamos la siguiente posición horizontal disponible. Esto evita
//     que las ramas se crucen al dibujar el árbol en la web.
void ArbolBinario::calcularGrafico(NodoArbol* nodo, int nivel, int &contadorInOrden, std::vector<NodoGrafico>& resultado) {
    if (nodo == nullptr) return;

    calcularGrafico(nodo->izquierdo, nivel + 1, contadorInOrden, resultado);

    NodoGrafico ng;
    ng.valor = nodo->dato;
    ng.nivel = nivel;
    ng.posicion = contadorInOrden;
    ng.tieneHijoIzquierdo = (nodo->izquierdo != nullptr);
    ng.tieneHijoDerecho = (nodo->derecho != nullptr);
    resultado.push_back(ng);
    contadorInOrden++;

    calcularGrafico(nodo->derecho, nivel + 1, contadorInOrden, resultado);
}

std::vector<NodoGrafico> ArbolBinario::obtenerNodosGraficos() {
    std::vector<NodoGrafico> resultado;
    int contador = 0;
    calcularGrafico(raiz, 0, contador, resultado);
    return resultado;
}

// 11. Liberar memoria de todo el árbol (post-orden: primero hijos, luego el nodo)
void ArbolBinario::liberarRec(NodoArbol* nodo) {
    if (nodo == nullptr) return;
    liberarRec(nodo->izquierdo);
    liberarRec(nodo->derecho);
    delete nodo;
}

// 12. Destructor
ArbolBinario::~ArbolBinario() {
    liberarRec(raiz);
}