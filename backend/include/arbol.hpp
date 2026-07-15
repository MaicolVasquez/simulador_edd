#ifndef ARBOL_HPP
#define ARBOL_HPP

#include <vector>

// Estructura base para cada nodo del árbol
struct NodoArbol {
    int dato;
    NodoArbol* izquierdo;
    NodoArbol* derecho;

    NodoArbol(int d) {
        dato = d;
        izquierdo = nullptr;
        derecho = nullptr;
    }
};

// Paquete de datos listo para que la web dibuje un nodo:
// nivel = profundidad del nodo (fila donde se dibuja)
// posicion = posición horizontal relativa dentro de ese nivel (según recorrido in-orden)
struct NodoGrafico {
    int valor;
    int nivel;
    int posicion;
    bool tieneHijoIzquierdo;
    bool tieneHijoDerecho;
};

class ArbolBinario {
private:
    NodoArbol* raiz;
    int cantidad;

    // Métodos privados de apoyo (recursivos)
    NodoArbol* insertarRec(NodoArbol* nodo, int dato);
    NodoArbol* eliminarRec(NodoArbol* nodo, int dato, bool &eliminado);
    NodoArbol* encontrarMinimo(NodoArbol* nodo);
    void liberarRec(NodoArbol* nodo);
    void inOrdenRec(NodoArbol* nodo, std::vector<int>& resultado);
    void preOrdenRec(NodoArbol* nodo, std::vector<int>& resultado);
    void postOrdenRec(NodoArbol* nodo, std::vector<int>& resultado);
    void calcularGrafico(NodoArbol* nodo, int nivel, int &contadorInOrden, std::vector<NodoGrafico>& resultado);

public:
    // Constructor
    ArbolBinario();

    // Métodos principales de modificación
    void insertar(int dato);
    bool eliminar(int dato);

    // Métodos de consulta (útiles para la interfaz gráfica)
    bool estaVacio();
    int tamano();
    bool contiene(int dato);
    int altura(); // útil para dimensionar el lienzo en la web

    // Recorridos clásicos (útiles para el Motor Didáctico -> Persona 4)
    std::vector<int> recorridoInOrden();
    std::vector<int> recorridoPreOrden();
    std::vector<int> recorridoPostOrden();

    // Entrega cada nodo con su nivel y posición horizontal ya calculados,
    // para que la web solo tenga que ubicar cajas en un plano y trazar líneas.
    std::vector<NodoGrafico> obtenerNodosGraficos();

    // Destructor
    ~ArbolBinario();
};

#endif