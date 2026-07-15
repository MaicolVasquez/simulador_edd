const MotorExplicaciones = {
    /**
     * Genera la explicación detallada de una operación.
     * @param {string} estructura - 'pila', 'cola', 'lista' o 'arbol'
     * @param {string} operacion - 'insertar' o 'eliminar'
     * @param {number|null} valor - El valor ingresado o procesado
     * @param {object} contexto - Datos adicionales del estado (ej. si estaba vacía, o posición)
     * @returns {string} Código HTML con la explicación estructurada paso a paso.
     */
    obtenerExplicacion(estructura, operacion, valor, contexto = {}) {
        let pasos = [];

        switch (estructura) {
            case 'pila':
                if (operacion === 'insertar') {
                    pasos = [
                        `<strong>Paso 1:</strong> Se solicita insertar el valor <code>${valor}</code> en la Pila (operación <em>Push</em>).`,
                        `<strong>Paso 2:</strong> Se reserva dinámicamente un nuevo bloque de memoria (<code>Nodo</code>) que almacena el dato <code>${valor}</code>.`,
                        contexto.estabaVacia
                            ? `<strong>Paso 3:</strong> Como la pila estaba vacía, el puntero <code>siguiente</code> del nuevo nodo se establece en <code>nullptr</code>.`
                            : `<strong>Paso 3:</strong> El puntero <code>siguiente</code> del nuevo nodo se configura para que apunte al actual nodo en el <code>tope</code> de la pila.`,
                        `<strong>Paso 4:</strong> El puntero principal de control, llamado <code>tope</code>, se actualiza para apuntar a este nuevo nodo, convirtiéndolo en el nuevo extremo superior de acceso (Principio LIFO: Último en Entrar, Primero en Salir).`
                    ];
                } else if (operacion === 'eliminar') {
                    if (contexto.estabaVacia) {
                        pasos = [`<strong>Estado:</strong> La Pila está vacía (<code>tope == nullptr</code>). No hay elementos para desapilar.`];
                    } else {
                        pasos = [
                            `<strong>Paso 1:</strong> Se solicita eliminar el elemento superior de la Pila (operación <em>Pop</em>).`,
                            `<strong>Paso 2:</strong> Se accede al nodo referenciado por el puntero <code>tope</code>, identificando el valor a extraer: <code>${valor}</code>.`,
                            `<strong>Paso 3:</strong> Se crea un puntero auxiliar (<code>Nodo* aux = tope</code>) para no perder la referencia del nodo físico que vamos a borrar.`,
                            `<strong>Paso 4:</strong> Se desplaza el puntero del sistema <code>tope</code> hacia abajo, asignándole la dirección del siguiente nodo (<code>tope = tope->siguiente</code>).`,
                            `<strong>Paso 5:</strong> Se libera de forma segura la memoria del nodo extraído de la pila utilizando la instrucción <code>delete aux</code> para evitar fugas de memoria (<em>memory leaks</em>).`
                        ];
                    }
                }
                break;

            case 'cola':
                if (operacion === 'insertar') {
                    pasos = [
                        `<strong>Paso 1:</strong> Se solicita encolar el valor <code>${valor}</code> (operación <em>Enqueue</em>).`,
                        `<strong>Paso 2:</strong> Se asigna memoria para un nuevo <code>NodoCola</code> con el valor <code>${valor}</code> y su puntero <code>siguiente</code> apuntando a <code>nullptr</code>.`,
                        contexto.estabaVacia
                            ? `<strong>Paso 3:</strong> Dado que la Cola estaba vacía, tanto el puntero del extremo de salida (<code>frente</code>) como el extremo de entrada (<code>final</code>) se configuran para apuntar a este único nodo.`
                            : `<strong>Paso 3:</strong> Al haber elementos en espera, el puntero <code>siguiente</code> del nodo que actualmente está al <code>final</code> de la cola se redirige para enlazar con el nuevo nodo creado.<br><strong>Paso 4:</strong> Se actualiza el puntero de control de entrada general para que sea el nuevo nodo: <code>final = nuevoNodo</code> (Principio FIFO: Primero en Entrar, Primero en Salir).`
                    ];
                } else if (operacion === 'eliminar') {
                    if (contexto.estabaVacia) {
                        pasos = [`<strong>Estado:</strong> La Cola está vacía (<code>frente == nullptr</code>). No hay clientes o datos en espera para procesar.`];
                    } else {
                        pasos = [
                            `<strong>Paso 1:</strong> Se solicita desencolar el elemento al frente de la estructura (operación <em>Dequeue</em>).`,
                            `<strong>Paso 2:</strong> Se ubica el elemento que lleva más tiempo en espera referenciado por el puntero <code>frente</code>, cuyo valor es <code>${valor}</code>.`,
                            `<strong>Paso 3:</strong> Se guarda temporalmente la dirección de este nodo con un puntero auxiliar (<code>NodoCola* aux = frente</code>).`,
                            `<strong>Paso 4:</strong> El puntero de salida se desplaza hacia atrás: <code>frente = frente->siguiente</code>.`,
                            contexto.quedoVacia
                                ? `<strong>Paso 5:</strong> Debido a que el elemento removido era el último que quedaba en el sistema, el puntero <code>final</code> también debe reiniciarse apuntando a <code>nullptr</code>.`
                                : `<strong>Paso 5:</strong> El puntero <code>final</code> permanece inalterado en su posición actual, ya que quedan elementos pendientes de salida.`,
                            `<strong>Paso 6:</strong> Se destruye el nodo huérfano liberando su memoria asignada en el montón (<em>heap</em>) con <code>delete aux</code>.`
                        ];
                    }
                }
                break;

            case 'lista':
                if (operacion === 'insertar') {
                    pasos = [
                        `<strong>Paso 1:</strong> Se solicita insertar el valor <code>${valor}</code> de manera secuencial al final de la Lista Enlazada Simple.`,
                        `<strong>Paso 2:</strong> Se instancia un nuevo <code>NodoLista</code> en memoria con el dato y puntero de enlace <code>siguiente = nullptr</code>.`,
                        contexto.estabaVacia
                            ? `<strong>Paso 3:</strong> Como la lista no poseía elementos, el puntero de acceso principal se inicializa apuntando directamente a este nuevo nodo: <code>cabeza = nuevoNodo</code>.`
                            : `<strong>Paso 3:</strong> Al haber elementos previos, se inicia un recorrido secuencial desde la <code>cabeza</code> utilizando un puntero temporal (<code>actual</code>) que avanza de dirección en dirección hasta hallar el nodo cuyo enlace <code>siguiente</code> sea nulo (<code>nullptr</code>).<br><strong>Paso 4:</strong> Se conecta el último elemento de la secuencia al nuevo bloque enlazando <code>actual->siguiente = nuevoNodo</code>.`
                    ];
                } else if (operacion === 'eliminar') {
                    if (contexto.estabaVacia) {
                        pasos = [`<strong>Estado:</strong> La Lista Enlazada está vacía (<code>cabeza == nullptr</code>). No se puede ejecutar ninguna eliminación.`];
                    } else if (contexto.esCabeza) {
                        pasos = [
                            `<strong>Paso 1:</strong> Se busca eliminar el valor <code>${valor}</code>. El sistema detecta que este valor coincide inmediatamente con el primer nodo de la secuencia (la <code>cabeza</code>).`,
                            `<strong>Paso 2:</strong> Se almacena temporalmente la dirección de la cabeza actual: <code>NodoLista* aux = cabeza</code>.`,
                            `<strong>Paso 3:</strong> Se reasigna el inicio de la lista al segundo elemento: <code>cabeza = cabeza->siguiente</code>.`,
                            `<strong>Paso 4:</strong> Se elimina físicamente el nodo inicial llamando a <code>delete aux</code>.`
                        ];
                    } else {
                        pasos = [
                            `<strong>Paso 1:</strong> Se busca eliminar la primera ocurrencia del valor <code>${valor}</code> de la secuencia lineal.`,
                            `<strong>Paso 2:</strong> Se inicializa un puntero de exploración en el primer nodo (<code>anterior = cabeza</code>). Se recorre la lista comparando los datos del nodo siguiente (<code>anterior->siguiente->dato</code>).`,
                            contexto.encontrado
                                ? `<strong>Paso 3:</strong> Se localiza el nodo que precede al que queremos eliminar.<br><strong>Paso 4:</strong> Se almacena en un puntero auxiliar la dirección del nodo objetivo: <code>NodoLista* aux = anterior->siguiente</code>.<br><strong>Paso 5:</strong> Se realiza un puente de desvío de enlaces (<em>bypass</em>): el nodo anterior se conecta directamente con el nodo posterior al que vamos a borrar (<code>anterior->siguiente = aux->siguiente</code>).<br><strong>Paso 6:</strong> Se libera la memoria del nodo aislado con <code>delete aux</code>.`
                                : `<strong>Paso 3:</strong> El recorrido finaliza en el último nodo (<code>siguiente == nullptr</code>) sin encontrar coincidencias con el valor solicitado. No se altera la estructura.`
                        ];
                    }
                }
                break;

            case 'arbol':
                if (operacion === 'insertar') {
                    pasos = [
                        `<strong>Paso 1:</strong> Se evalúa la inserción del valor <code>${valor}</code> en el Árbol Binario de Búsqueda (BST).`,
                        contexto.esRaiz
                            ? `<strong>Paso 2:</strong> Al estar el árbol completamente vacío, la inserción es directa: se crea un <code>NodoArbol</code> y se asigna como el punto de inicio de la jerarquía (<code>raiz = nuevoNodo</code>).`
                            : `<strong>Paso 2:</strong> Al existir una estructura previa, se utiliza una búsqueda recursiva para encontrar la ubicación adecuada siguiendo las leyes de un BST:<br>` +
                            `- Si el valor es menor al nodo actual, se ramifica recursivamente hacia el subárbol <strong>izquierdo</strong>.<br>` +
                            `- Si el valor es mayor o igual, se desciende recursivamente hacia el subárbol <strong>derecho</strong>.<br>` +
                            `<strong>Paso 3:</strong> Una vez que se alcanza un espacio vacío (<code>nullptr</code>), se acopla el nuevo nodo en esa posición como un nodo hoja.`
                    ];
                } else if (operacion === 'eliminar') {
                    if (contexto.estabaVacia) {
                        pasos = [`<strong>Estado:</strong> El Árbol Binario está vacío. No existen nodos para remover.`];
                    } else if (!contexto.encontrado) {
                        pasos = [
                            `<strong>Paso 1:</strong> Se inicia el recorrido recursivo de búsqueda del valor <code>${valor}</code> desde la <code>raiz</code>.`,
                            `<strong>Paso 2:</strong> Tras comparar el valor buscado con las ramas correspondientes, se llega a un nodo nulo sin éxito. El valor no existe dentro del árbol.`
                        ];
                    } else {
                        pasos = [
                            `<strong>Paso 1:</strong> Se recorre recursivamente el árbol buscando el valor <code>${valor}</code>. Se localiza el nodo físico que contiene el dato.`,
                            `<strong>Paso 2:</strong> Se analiza la estructura de sus ramificaciones para ejecutar uno de los tres casos de eliminación estándar:`
                        ];

                        if (contexto.caso === 1) {
                            pasos.push(
                                `<strong>Caso 1 (Nodo Hoja):</strong> El nodo con valor <code>${valor}</code> no tiene hijos (tanto <code>izquierdo</code> como <code>derecho</code> son nulos).<br>` +
                                `<strong>Solución:</strong> Se desconecta de su nodo padre estableciendo el puntero del padre a <code>nullptr</code> y se borra de la memoria directamente con <code>delete nodo</code>.`
                            );
                        } else if (contexto.caso === 2) {
                            pasos.push(
                                `<strong>Caso 2 (Nodo con un solo Hijo):</strong> El nodo posee únicamente una descendencia activa (izquierda o derecha).<br>` +
                                `<strong>Solución:</strong> Se guarda la dirección del hijo único, se elimina el nodo actual y se retorna la dirección del hijo para que el nodo padre lo adopte directamente en su lugar.`
                            );
                        } else if (contexto.caso === 3) {
                            pasos.push(
                                `<strong>Caso 3 (Nodo con dos Hijos):</strong> El nodo tiene hijos en ambas direcciones.<br>` +
                                `<strong>Solución:</strong> No se puede eliminar directamente sin destruir la jerarquía completa. Se aplican los siguientes subpasos:<br>` +
                                `1. Se localiza el <strong>sucesor en in-orden</strong> (el valor mínimo del subárbol derecho, bajando todo lo posible a la izquierda por la rama derecha). El valor hallado es <code>${contexto.sucesorValor}</code>.<br>` +
                                `2. Se sobrescribe el valor del nodo que queríamos eliminar colocando en su lugar el valor de dicho sucesor (<code>nodo->dato = sucesor->dato</code>).<br>` +
                                `3. Se ejecuta un llamado recursivo hacia la rama derecha para eliminar el nodo sucesor original de su posición original (el cual encajará obligatoriamente en el Caso 1 o 2).`
                            );
                        }
                    }
                }
                break;
        }

        // Retorna la lista de pasos envuelta en un formato ordenado e interactivo
        return `
            <div class="explicacion-contenedor">
                <p style="margin-bottom: 8px; font-weight: bold; color: #2c3e50;">
                    Operación ejecutada: <span style="text-transform: uppercase; color: #3498db;">${operacion}</span> en <span style="text-transform: uppercase; color: #2c3e50;">${estructura}</span>
                </p>
                <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
                    ${pasos.map(paso => `<li>${paso}</li>`).join('')}
                </ol>
            </div>
        `;
    }
};