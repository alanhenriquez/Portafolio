import { useEffect } from "react";




/**
 *  Custom hook to observe DOM changes and execute a callback when an element is added.
 * 
 * ------------------------------------------------------------------------------------------------
 * 
 * @param {function} callback - The callback function to execute when a DOM element is added.
 * @returns {{stopObserver: function, setConfig: function}} - Functions to control the observer.
 * 
 * ------------------------------------------------------------------------------------------------
 * 
 * @example
 * // Import the custom hook
 * import useDOMChangesObserver from './useDOMChangesObserver';
 * 
 * // Define the callback function to be executed when a DOM element is added
 * const handleDOMChange = () => {
 *     console.log('DOM element added!');
 *     // Additional logic can be added here
 * };
 * 
 * // Implement the custom hook
 * const { stopObserver, setConfig } = useDOMChangesObserver(handleDOMChange);
 * 
 * // To stop observing DOM changes, use: 
 * stopObserver();
 * 
 * // To set new configuration for the observer, use:
 * // setConfig({ attributes: true, childList: true, subtree: true });
 * 
 * 
 * @end - finaliza ejemplo
 * 
 * ------------------------------------------------------------------------------------------------
 * 
 * @version 1.0
 */
function useDOMChangesObserver(callback) {
    useEffect(() => {
        const targetNode = document.body;
        
        const observer = new MutationObserver(mutationsList => {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'childList') {
                    callback();
                }
            });
        });
        
        const config = { childList: true, subtree: true };
        
        observer.observe(targetNode, config);
        
        return () => {
            observer.disconnect();
        };
    }, []);
}

export default useDOMChangesObserver;
