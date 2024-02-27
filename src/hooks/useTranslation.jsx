import { useEffect, useState } from 'react';
import useDOMChangesObserver from './useDOMChangesObserver';



const useTranslation = (texts, original) => {



    /*/////////////////////////////////////////////////////////////////////////////////////////////*/
    /* UTILS --------------------------------------------------------------------------------------*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/


    
    // Función para validar el idioma en localStorage
    const validateLangFromLocalStorage = (prev, current) => {
        if ((prev && current) &&
            (typeof prev === 'string' && typeof current === 'string') &&
            (!Number.isInteger(parseInt(prev) && !Number.isInteger(parseInt(current))))
        ) {
            return true;
        } else {
            return false;
        }
    };

    // Función para guardar el idioma en localStorage
    const saveLangToLocalStorage = (prev, current) => {
        if (validateLangFromLocalStorage(prev, current)) {
            localStorage.setItem('appLang', JSON.stringify({prev: prev, current: current}));
        } else {
            console.error(`tipo de dato de lenguaje no valido: {prev: ${typeof prev}, current: ${typeof current}`);
        }
    };

    // Función para recuperar el idioma en localStorage
    const getLangFromLocalStorage = (getCurrent = true) => {
        const response = JSON.parse(localStorage.getItem('appLang')) || null;

        if (!response || response === null) {
            return original;
        }

        const { prev, current } = response;
        if (validateLangFromLocalStorage(prev, current)) {
            if (getCurrent) {
                return current;
            } else {
                return prev;
            }
        } else {
            console.error(`tipo de dato de lenguaje en el localStorage no valido: {prev: ${typeof prev}, current: ${typeof current}`);
        }
    };

    const obtenerPadresConTextoHijo = (elemento = document.body) => {
        let padresConTexto = [];

        function buscarTextoRecursivamente(nodo) {
            if (nodo.nodeType === Node.TEXT_NODE && nodo.textContent.trim() !== '') {
                padresConTexto.push(nodo);
            } else {
                nodo.childNodes.forEach(childNode => {
                    buscarTextoRecursivamente(childNode);
                });
            }
        }

        buscarTextoRecursivamente(elemento);
        return padresConTexto;
    }



    /*/////////////////////////////////////////////////////////////////////////////////////////////*/
    /* STATES -------------------------------------------------------------------------------------*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/



    // Estados
    const [NewLang, setNewLang] = useState(null);

    // Langs
    const [CurrentLang, setCurrentLang] = useState(getLangFromLocalStorage(true));
    const [PreviousLang, setPreviousLang] = useState(getLangFromLocalStorage(false));
    const [DetectChangeDOM, setDetectChangeDOM] = useState(0);


    
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/
    /* MAINS --------------------------------------------------------------------------------------*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/



    const changeLanguage = (c, n, referenceConsole = -1) => {
        let new_lang = n; 
        let inicial = original; 
        let current = c; 
        let prev = inicial 


        
        //Verificamos que no sean falsos
        if (prev && current) {

            if (inicial === current && current !== new_lang) {
                /* 
                [1]     Entramos a esta condicional solo si:
                •   El idioma original es igual al idioma actual.
                •   El idioma actual es diferente del nuevo idioma.

                [2]     El proceso será: 
                •   El idioma previo toma el valor del idioma actual.
                •   El idioma actual toma el valor del nuevo idioma.

                [nota]  Es importante mantener el flujo especificado
                ------  para su correcto funcionamiento.
                */
                

                prev = current;
                current = new_lang;


            } else if (current !== new_lang) {
                /* 
                [1]     Entramos a esta condicional solo si:
                •   El idioma original es diferente del idioma actual.
                •   El idioma actual es diferente del nuevo idioma.

                [2]     El proceso será: 
                •   El idioma previo toma el valor del idioma actual.
                •   El idioma actual toma el valor del nuevo idioma.

                [nota]  Es importante mantener el flujo especificado
                ------  para su correcto funcionamiento.
                */
                
                prev = current;
                current = new_lang;

            } else {
                /* 
                [nota]  Hacer nada!! 
                [nota]  No eliminar. Es importante mantener el flujo especificado
                ------  para su correcto funcionamiento.
                */
            }

            const textNodes = obtenerPadresConTextoHijo(); // Obtener todos los nodos de tipo texto del DOM
            textNodes.forEach(node => {
                texts.forEach(trad => {
                    const previousText = trad[prev]; // Recuperar los textos en el idioma anterior
                    const newText = trad[current]; // Recuperar los textos en el nuevo idioma
                    if (previousText && newText && node.textContent.trim().toLowerCase() === previousText.toLowerCase()) {
                        /* 
                        [1]     Entramos a esta condicional solo si:
                        •   Los textos en el idioma anterior existen.
                        •   Los textos en el nuevo idioma existen.
                        •   Los textos de los nodos en el DOM son iguales a los textos 
                            en el idioma anterior
        
                        [2] El proceso será: 
                        •   Convertir los textos de todos los nodos del DOM a
                            los textos del nuevo idioma.
        
                        [nota]  Es importante mantener el flujo especificado
                        ------  para su correcto funcionamiento.
                        */
                        
                        node.textContent = newText;

                    }
                });
            });
    
            saveLangToLocalStorage(prev, current); // Guardar la nueva configuracion del idioma de la app en el localStorage
        }
    }
    
    

    /*/////////////////////////////////////////////////////////////////////////////////////////////*/
    /* EFFECTS ------------------------------------------------------------------------------------*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/



    useEffect(() => {
        changeLanguage(PreviousLang, CurrentLang);
    }, []);



    useEffect(() => {
        if (NewLang && NewLang !== null) {
            changeLanguage(CurrentLang, NewLang);
            setCurrentLang(getLangFromLocalStorage(true));
            setPreviousLang(getLangFromLocalStorage(false));
        }
    }, [NewLang]);



    useEffect(() => {
        changeLanguage(PreviousLang, CurrentLang)
    }, [CurrentLang, PreviousLang, DetectChangeDOM]);
    


    useDOMChangesObserver(() => {
        setDetectChangeDOM((prevState) => prevState + 1);
    })



    /*/////////////////////////////////////////////////////////////////////////////////////////////*/
    /* RETURNS ------------------------------------------------------------------------------------*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/



    return {
        setNewLang
    };



}

export default useTranslation;
