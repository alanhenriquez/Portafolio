import { useEffect, useState } from 'react';
import useDOMChangesObserver from './useDOMChangesObserver';



const useTranslation = (texts, original) => {



    /*/////////////////////////////////////////////////////////////////////////////////////////////*/
    /* STATES -------------------------------------------------------------------------------------*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/



    // Estados
    const [NewLang, setNewLang] = useState(null);
    const LocalLang = localStorage.getItem('appLang');

    // Langs
    const [CurrentLang, setCurrentLang] = useState((LocalLang && LocalLang.toLowerCase() !== 'null' ? LocalLang : original));
    const [PreviousLang, setPreviousLang] = useState(original);



    /*/////////////////////////////////////////////////////////////////////////////////////////////*/
    /* UTILS --------------------------------------------------------------------------------------*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/



    // Función para guardar el idioma en localStorage
    const saveLangToLocalStorage = (lang) => {
        localStorage.setItem('appLang', lang);
    };

    function obtenerPadresConTextoHijo(elemento = document.body) {
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

    function changeLanguage(lang1, lang2) {
        const nuevo = lang2; //nuevo idioma al cual cambiar
        const previous = lang1; //idioma anterior al nuevo idioma por el cual camnbiar

        obtenerPadresConTextoHijo().forEach(element => {
            texts.forEach(trad => {
                if (trad[nuevo] && trad[previous]) {
                    if (trad[previous].toLowerCase() === element.textContent.trim().toLowerCase()) {
                        element.textContent = trad[nuevo];
                    }
                }
            });
        });

        setCurrentLang(nuevo); //settear el nuevo lenguaje a cargar
        setPreviousLang(prevState => previous === prevState ? nuevo : prevState); //verificar lenguaje previo
        saveLangToLocalStorage(nuevo); //guardar los cambios en el localStorage
    }



    /*/////////////////////////////////////////////////////////////////////////////////////////////*/
    /* EFFECTS ------------------------------------------------------------------------------------*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/



    useEffect(() => {
        if (PreviousLang) {
            changeLanguage(PreviousLang, CurrentLang);
        }
    }, []);


    useEffect(() => {
        changeLanguage(PreviousLang, NewLang);
    }, [NewLang]);


    useDOMChangesObserver(() => changeLanguage(PreviousLang, NewLang || CurrentLang));


    /*/////////////////////////////////////////////////////////////////////////////////////////////*/
    /* RETURNS ------------------------------------------------------------------------------------*/
    /*/////////////////////////////////////////////////////////////////////////////////////////////*/

    

    return {
        setNewLang
    };



}

export default useTranslation;
