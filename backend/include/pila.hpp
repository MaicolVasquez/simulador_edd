#ifndef PILA_HPP
#define PILA_HPP

#include <iostream>
#include <string>

// Estructura base para cada bloque de la pila
struct Nodo {
    int dato;           // El valor numérico que ingresa el usuario
    Nodo* siguiente;    // El puntero que enlaza con el elemento de abajo
    
    // Constructor para inicializar el nodo fácilmente
    Nodo(int d) {
        dato = d;
        siguiente = nullptr;
    }
};

class Pila {
private:
    Nodo* tope; // El único punto de acceso en una pila (LIFO)

public:
    // Constructor
    Pila();

    // Métodos principales de modificación
    // Nota: Retornamos un booleano o un int para avisarle a la web si tuvo éxito
    void insertar(int dato); 
    int eliminar();          // Retorna el dato eliminado para que el Motor Didáctico pueda narrarlo

    // Métodos de consulta (útiles para la interfaz gráfica)
    bool estaVacia();
    int verTope();           // Para mostrar qué número está arriba sin eliminarlo
    
    // Destructor para limpiar la memoria al cerrar el programa
    ~Pila();
};

#endif