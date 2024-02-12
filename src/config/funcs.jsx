



const funcs = {
    global: {
        detectTheme() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return "dark";
            } else {
                return "light";
            }
        },
    },
    clock: {
        doEvery(callback, intervalo) {
            if (intervalo && intervalo > 0) {
                setInterval(callback, intervalo);
            }
        },
        doIn(callback, intervalo) {
            if (intervalo && intervalo > 0) {
                setTimeout(callback, intervalo);
            }
        },
    },
    findIn: {
        findObjectPath(objeto, clave, valor, niveles = 0) {
            function buscar(obj, claves, valor, ruta) {
                if (Array.isArray(obj)) {
                    for (let i = 0; i < obj.length; i++) {
                        const resultado = buscar(obj[i], claves, valor, [...ruta, `[${i}]`]);
                        if (resultado) {
                            return resultado;
                        }
                    }
                } else if (obj !== null && typeof obj === 'object') {
                    for (const [key, value] of Object.entries(obj)) {
                        const esCoincidencia = Array.isArray(claves)
                            ? claves.includes(key)
                            : key === claves;

                        if (esCoincidencia && value === valor) {
                            ruta.push(key);
                            const nivelesARemover = Math.min(niveles, ruta.length - 1);
                            return ruta.slice(0, ruta.length - nivelesARemover).join('.');
                        } else if (Array.isArray(value)) {
                            for (let i = 0; i < value.length; i++) {
                                const resultado = buscar(value[i], claves, valor, [...ruta, `${key}.${i}`]);
                                if (resultado) {
                                    return resultado;
                                }
                            }
                        } else if (value !== null && typeof value === 'object') {
                            const resultado = buscar(value, claves, valor, [...ruta, key]);
                            if (resultado) {
                                return resultado;
                            }
                        }
                    }
                }
                return null;
            }

            const clavesArray = Array.isArray(clave) ? clave : [clave];
            const resultado = buscar(objeto, clavesArray, valor, []);
            return resultado !== null ? resultado : null;
        },
        findObjectValueByPath(objeto, ruta) {
            const claves = ruta.split('.');
            let valorActual = objeto;

            for (const clave of claves) {
                if (/\[\d+\]/.test(clave)) {
                    // Manejar casos con índices en formato [n]
                    const indice = parseInt(clave.match(/\[(\d+)\]/)[1]);
                    valorActual = valorActual[indice];
                } else {
                    valorActual = valorActual[clave];
                }

                if (valorActual === undefined) {
                    // La clave no existe en la ruta proporcionada
                    return undefined;
                }
            }

            return valorActual;
        },
    },
    updateIn: {
        updateObjectValueByPath(objeto, ruta, nuevoValor) {
            const claves = ruta.split('.');
            let objetoActual = objeto;
        
            for (let i = 0; i < claves.length - 1; i++) {
                const clave = claves[i];
        
                if (/\[\d+\]/.test(clave)) {
                    // Manejar casos con índices en formato [n]
                    const indice = parseInt(clave.match(/\[(\d+)\]/)[1]);
                    objetoActual = objetoActual[indice];
                } else {
                    objetoActual = objetoActual[clave];
                }
        
                if (objetoActual === undefined) {
                    // La clave no existe en la ruta proporcionada
                    return null;
                }
            }
        
            const ultimaClave = claves[claves.length - 1];
            if (/\[\d+\]/.test(ultimaClave)) {
                // Manejar casos con índices en formato [n]
                const indice = parseInt(ultimaClave.match(/\[(\d+)\]/)[1]);
                objetoActual[indice] = nuevoValor;
            } else {
                objetoActual[ultimaClave] = nuevoValor;
            }
        
            return objeto;
        }
    },
    deleteIn: {
        deleteObjectPropertyByPath(objeto, ruta) {
            const claves = ruta.split('.');
            let objetoActual = objeto;
        
            for (let i = 0; i < claves.length - 1; i++) {
                const clave = claves[i];
        
                if (/\[\d+\]/.test(clave)) {
                    // Manejar casos con índices en formato [n]
                    const indice = parseInt(clave.match(/\[(\d+)\]/)[1]);
                    objetoActual = objetoActual[indice];
                } else {
                    objetoActual = objetoActual[clave];
                }
        
                if (objetoActual === undefined) {
                    // La clave no existe en la ruta proporcionada
                    return null;
                }
            }
        
            const ultimaClave = claves[claves.length - 1];
            if (/\[\d+\]/.test(ultimaClave)) {
                // Manejar casos con índices en formato [n]
                const indice = parseInt(ultimaClave.match(/\[(\d+)\]/)[1]);
                objetoActual.splice(indice, 1);
            } else {
                delete objetoActual[ultimaClave];
            }
        
            return objeto;
        }
    },
    addIn: {
        addObjectPropertyByPath(objeto, ruta, nuevaClave, nuevoValor, createPath = false) {
            const claves = ruta.split('.');
            let objetoActual = objeto;

            for (let i = 0; i < claves.length - 1; i++) {
                const clave = claves[i];

                if (/\[\d+\]/.test(clave)) {
                    // Manejar casos con índices en formato [n]
                    const indice = parseInt(clave.match(/\[(\d+)\]/)[1]);
                    objetoActual = objetoActual[indice];
                } else {
                    if (!objetoActual[clave] && createPath) {
                        objetoActual[clave] = {};
                    }
                    objetoActual = objetoActual[clave];
                }

                if (objetoActual === undefined && !createPath) {
                    // La clave no existe en la ruta proporcionada
                    return null;
                }
            }

            const ultimaClave = claves[claves.length - 1];
            if (/\[\d+\]/.test(ultimaClave)) {
                // Manejar casos con índices en formato [n]
                const indice = parseInt(ultimaClave.match(/\[(\d+)\]/)[1]);
                objetoActual[indice][nuevaClave] = nuevoValor;
            } else {
                objetoActual[ultimaClave] = { ...objetoActual[ultimaClave], [nuevaClave]: nuevoValor };
            }

            return objeto;
        },
    },
    filterIn: {
        filterObjects(arr, callback = null, filterKeys = [], valueToFind = null, results = []) {
            if (!Array.isArray(arr)) {
                throw new Error('El primer parámetro debe ser un array.');
            }

            if (callback !== null && typeof callback !== 'function') {
                throw new Error('El segundo parámetro debe ser una función o null.');
            }

            if (!Array.isArray(filterKeys)) {
                throw new Error('El tercer parámetro debe ser un array.');
            }

            if (callback !== null && (filterKeys.length > 0 || valueToFind !== null)) {
                throw new Error('No se permite usar simultáneamente el parámetro "callback" con los parámetros "filterKeys" o "valueToFind".');
            }


            // Función auxiliar para filtrar objetos anidados por clave y valor
            function filterNestedObject(obj, keys, valueToFind) {
                for (const key of keys) {
                    // Verificar si la clave existe y si su valor coincide con el valor buscado
                    if (obj.hasOwnProperty(key) && obj[key] === valueToFind) {
                        return obj; // Devolver el objeto si hay una coincidencia
                    }
                }
                return null; // Devolver null si no se encuentra ninguna coincidencia
            }


            for (const obj of arr) {
                let found = false;

                if (callback === null) {
                    // Filtrado por valor de propiedad anidada
                    const filteredObj = filterNestedObject(obj, filterKeys, valueToFind);
                    if (filteredObj !== null) {
                        results.push(filteredObj);
                        found = true;
                    }
                } else {
                    // Filtrado por función de callback
                    if (callback(obj)) {
                        results.push(obj);
                        found = true;
                    }
                }

                if (!found) {
                    // Si no se encontró una coincidencia, continuamos buscando en objetos anidados
                    for (const prop in obj) {
                        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                            funcs.filterIn.filterObjects([obj[prop]], callback, filterKeys, valueToFind, results);
                        }
                    }
                }
            }

            return results;
        },
    },
    converts: {
        objectsArrayToSingleArray(objectArray = [{}], keyToGet = '') {
            const processed = objectArray.map((value) => value[keyToGet]) || [];
            return processed.filter((value) => (value !== (undefined || null)) ? value : []);
        },
    },
    reactStates: {
        prevState: (setterState) => {
            return new Promise((resolve) => {
              setterState((prevState) => {
                resolve(prevState);
                return prevState; 
              });
            });
        },
        handlers: {
            handleOnChange(newValue, setterState) {
                setterState(newValue);
            },
            async handleOnChangeAsync(newValue, setterState) {
                try {
                    setterState(await newValue());
                } catch (error) {
                    console.error.consoleErr(error);
                }
            },
        },
    },
    dom: {
        disableNodesInside(selectionQuery, interactiveElementTypes = ['button', 'input', 'select', 'textarea', 'label', 'div']) {
            const parentNode = document.querySelector(selectionQuery);
            if (!parentNode) {
                console.warn(`No se encontró ningún nodo con el selector: ${selectionQuery}`);
                return;
            }

            const interactiveElements = parentNode.querySelectorAll(interactiveElementTypes.join(','));
            interactiveElements.forEach(node => {
                node.style.opacity = 0.925;
                node.style.filter = 'grayscale(70%)';
                node.style.pointerEvents = 'none';
                node.disabled = true;
            });
        },
        enableNodesInside(selectionQuery) {
            const parentNode = document.querySelector(selectionQuery);
            if (!parentNode) {
                console.warn(`No se encontró ningún nodo con el selector: ${selectionQuery}`);
                return;
            }

            const childNodes = parentNode.querySelectorAll('*');
            childNodes.forEach(node => {
                node.disabled = false;
                node.style.opacity = '';
                node.style.filter = '';
                node.style.pointerEvents = '';
            });
        },
        areNodesInsideDisabled(selectionQuery, interactiveElementTypes = ['button', 'input', 'select', 'textarea', 'label', 'div']) {
            const parentNode = document.querySelector(selectionQuery);
            if (!parentNode) {
                console.warn(`No se encontró ningún nodo con el selector: ${selectionQuery}`);
                return false;
            }

            const childNodes = parentNode.querySelectorAll(interactiveElementTypes.join(','));
            for (const node of childNodes) {
                if (!node.disabled) {
                    return false; // Si se encuentra un nodo habilitado, retorna falso
                }
            }
            return true; // Si no se encontró ningún nodo habilitado, retorna verdadero
        }
    }
}


  
export default funcs;

