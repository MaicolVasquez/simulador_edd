#ifndef COLA_HPP
#define COLA_HPP

// Usamos un nombre específico para evitar conflictos con la Pila
struct NodoCola {
    int dato;
    NodoCola* siguiente;
    
    NodoCola(int d) {
        dato = d;
        siguiente = nullptr;
    }
};

class Cola {
private:
    NodoCola* frente; // Apunta al primer elemento (el que va a salir)
    NodoCola* final;  // Apunta al último elemento (el recién ingresado)

public:
    Cola();

    // Métodos principales
    void insertar(int dato); // Encola un nuevo elemento al final
    int eliminar();          // Desencola y retorna el elemento del frente

    // Métodos de consulta
    bool estaVacia();
    int verFrente();         // Para que la web muestre quién es el siguiente en salir
    
    ~Cola();
};

#endif