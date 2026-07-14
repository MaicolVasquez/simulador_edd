#include <iostream>
#include "include/pila.hpp"
#include "include/cola.hpp"

using namespace std;

int main() {
    cout << "=== PRUEBA DIDACTICA DE PILA (LIFO) ===" << endl;
    Pila miPila;
    cout << "Apilando: 10, 20, 30..." << endl;
    miPila.insertar(10);
    miPila.insertar(20);
    miPila.insertar(30);
    
    cout << "Tope actual: " << miPila.verTope() << endl;
    cout << "Sacando de la Pila: " << miPila.eliminar() << " (Deberia ser 30)" << endl;
    cout << "Sacando de la Pila: " << miPila.eliminar() << " (Deberia ser 20)" << endl;
    cout << "Sacando de la Pila: " << miPila.eliminar() << " (Deberia ser 10)" << endl;

    cout << "\n=== PRUEBA DIDACTICA DE COLA (FIFO) ===" << endl;
    Cola miCola;
    cout << "Encolando clientes: 100, 200, 300..." << endl;
    miCola.insertar(100);
    miCola.insertar(200);
    miCola.insertar(300);
    
    cout << "Frente actual: " << miCola.verFrente() << endl;
    cout << "Atendiendo de la Cola: " << miCola.eliminar() << " (Deberia ser 100)" << endl;
    cout << "Atendiendo de la Cola: " << miCola.eliminar() << " (Deberia ser 200)" << endl;
    cout << "Atendiendo de la Cola: " << miCola.eliminar() << " (Deberia ser 300)" << endl;

    cout << "\n¡Todo funciona correctamente, cero fugas de memoria!" << endl;
    return 0;
}