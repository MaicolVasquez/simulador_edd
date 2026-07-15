#ifndef LISTA_HPP
#define LISTA_HPP

#include <vector>

// Estructura base para cada bloque de la lista
struct NodoLista {
    int dato;               // El valor numérico que ingresa el usuario
    NodoLista* siguiente;   // El puntero que enlaza con el siguiente elemento

    // Constructor para inicializar el nodo fácilmente
    NodoLista(int d) {
        dato = d;
        siguiente = nullptr;
    }
};

class Lista {
private:
    NodoLista* cabeza; // Primer elemento de la lista
    int cantidad;       // Cantidad de elementos (útil para la web)

public:
    // Constructor
    Lista();

    // Métodos principales de modificación
    void insertar(int dato);            // Inserta un nuevo elemento al final
    bool eliminar(int dato);            // Elimina la primera ocurrencia de "dato"
    bool eliminarPorPosicion(int pos);  // Elimina el elemento ubicado en "pos" (0-indexado)

    // Métodos de consulta (útiles para la interfaz gráfica)
    bool estaVacia();
    int tamano();
    bool contiene(int dato);

    // Devuelve todos los valores en orden, listos para que la web dibuje
    // cada nodo y sus flechas de enlace (índice 0 = cabeza).
    std::vector<int> obtenerElementos();

    // Destructor para limpiar la memoria al cerrar el programa
    ~Lista();
};

#endif