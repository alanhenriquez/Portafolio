import { useState, useEffect } from 'react';

const useStyler = (initialStyles) => {
    const [styles, setStyles] = useState(initialStyles || {});
    const [PrepairedStyles, setPrepairedStyles] = useState(''); //auxiliar en el futuro


    
    useEffect(() => {
        const styleTag = document.createElement('style');
        const styleId = `dynamic-style-useStyler`;

        styleTag.id = styleId;
        document.head.appendChild(styleTag);

        return () => {
            const element = document.getElementById(styleId);
            if (element) {
                element.parentNode.removeChild(element);
            }
        };
    }, []);

    useEffect(() => {
        const styleTag = document.getElementById(`dynamic-style-useStyler`);
        

        if (styleTag) {
            styleTag.innerHTML = '';
            let referenceStyles = '';
            

            Object.entries(styles).forEach(([selector, rules]) => {
                const pseudoRules = {};
                let regularRules = '';
                
                Object.entries(rules).forEach(([property, value]) => {
                    if (property.startsWith(':')) {
                        // Si es una pseudo-clase, añadimos las reglas al objeto de pseudo-clases
                        pseudoRules[property] = value;
                    } else {
                        // Si no es una pseudo-clase, agregamos las reglas directamente
                        regularRules += `    ${toKebabCase(property)}: ${value};\n`;
                    }
                });
                
                // Concatenamos las reglas regulares con las pseudo-clases
                let ruleSet = `${selector} {\n${regularRules}}\n\n`;
                Object.entries(pseudoRules).forEach(([pseudo, pseudoValue]) => {
                    ruleSet += `${selector}${pseudo} {\n`;
                    ruleSet += Object.entries(pseudoValue).map(([subProperty, subValue]) => {
                        return `    ${toKebabCase(subProperty)}: ${subValue};\n`;
                    }).join('');
                    ruleSet += '}\n\n';
                });

                //guardamos las nuevas reglas a la variable
                referenceStyles += ruleSet;
            }); 

            
            styleTag.appendChild(
                document.createTextNode(convertToResponsiveUnits(referenceStyles))
            );

            window.addEventListener('resize', () => {
                styleTag.appendChild(
                    document.createTextNode(convertToResponsiveUnits(referenceStyles))
                );
            });
            
            
            //Actualizamos la string de los estilos css preparados.
            setPrepairedStyles(referenceStyles);
        }
    }, [styles]);
    


    const addStyle = (selector, rules) => {
        const convertedRules = Object.keys(rules).reduce((acc, key) => {
            acc[toKebabCase(key)] = rules[key];
            return acc;
        }, {});

        setStyles((prevStyles) => ({
            ...prevStyles,
            [selector]: convertedRules,
        }));
    };

    const removeStyle = (selector) => {
        setStyles((prevStyles) => {
            const updatedStyles = { ...prevStyles };
            delete updatedStyles[selector];
            return updatedStyles;
        });
    };



    const toKebabCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };

    const cssGetColors = (cssString) => {
        // Expresión regular para buscar códigos de colores hexadecimales
        const hexColorRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;
    
        // Expresión regular para buscar nombres de colores estándar
        const namedColorRegex = /\b(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)\b/g;
    
        // Expresión regular para buscar valores RGB y RGBA
        const rgbColorRegex = /rgba?\((\s*\d+%?\s*,){2}\s*\d+%?\s*(?:,\s*(?:0?\.\d+|\d+(?:\.\d+)?%))?\)/g;
    
        // Expresión regular para buscar valores HSL y HSLA
        const hslColorRegex = /hsla?\(\s*\d+\s*(?:,\s*\d+%){2}\s*(?:,\s*(?:0?\.\d+|\d+(?:\.\d+)?%))?\)/g;
    
        // Array para almacenar los colores encontrados
        const colors = [];
    
        // Función para agregar colores coincidentes a un array
        const addMatchesToColorsArray = (regex, str) => {
            let match;
            while ((match = regex.exec(str)) !== null) {
                colors.push(match[0]);
            }
        };
    
        // Buscar colores hexadecimales y agregarlos al array
        addMatchesToColorsArray(hexColorRegex, cssString);
    
        // Buscar nombres de colores estándar y agregarlos al array
        addMatchesToColorsArray(namedColorRegex, cssString);
    
        // Buscar valores RGB y RGBA y agregarlos al array
        addMatchesToColorsArray(rgbColorRegex, cssString);
    
        // Buscar valores HSL y HSLA y agregarlos al array
        addMatchesToColorsArray(hslColorRegex, cssString);
    
        // Retornar el array de colores
        return colors;
    };

    const cssGetProperties = (cssString) => {
        // Dividir el string CSS en líneas
        const lines = cssString.split('\n');
        
        // Objeto para almacenar las propiedades CSS
        const properties = {};
    
        // Expresión regular para validar una propiedad CSS
        const propertyRegex = /^\s*([a-zA-Z-]+)\s*:/;
    
        // Iterar sobre cada línea del CSS
        lines.forEach(line => {
            // Eliminar espacios en blanco al inicio y al final de la línea
            const trimmedLine = line.trim();
            // Verificar si la línea es una declaración de propiedad CSS
            if (propertyRegex.test(trimmedLine)) {
                // Dividir la línea en nombre de propiedad y valor
                const [property, value] = trimmedLine.split(':');
                // Agregar la propiedad al objeto de propiedades
                properties[property.trim()] = value.trim();
            }
        });
    
        // Obtener las claves (nombres de propiedades) del objeto de propiedades
        const propertyNames = Object.keys(properties);
        // Retornar las propiedades ordenadas alfabéticamente
        return propertyNames.sort();
    };
    
    const cssGetValues = (cssString, unique = true) => {
        // Dividir el string CSS en líneas
        const lines = cssString.split('\n');
    
        // Array para almacenar los valores de las propiedades CSS
        const values = [];
    
        // Expresión regular para validar una propiedad CSS y su valor
        const propertyRegex = /^\s*([a-zA-Z-]+)\s*:\s*([^;]+)/;
    
        // Iterar sobre cada línea del CSS
        lines.forEach(line => {
            // Eliminar espacios en blanco al inicio y al final de la línea
            const trimmedLine = line.trim();
            // Verificar si la línea es una declaración de propiedad CSS
            const match = trimmedLine.match(propertyRegex);
            if (match) {
                const value = match[2].trim();
                values.push(value);
            }
        });
    
        // Si unique es true, eliminar valores duplicados
        if (unique) {
            return [...new Set(values)];
        }
    
        return values;
    };

    const cssGetUnits = (cssString, unique = true) => {
        // Dividir el string CSS en líneas
        const lines = cssString.split('\n');
        
        // Objeto para almacenar las unidades de medida CSS
        const units = {};
    
        // Expresión regular para validar una propiedad CSS y extraer su valor
        const propertyRegex = /^\s*([a-zA-Z-]+)\s*:\s*([^;]+)/;
    
        // Expresión regular para buscar unidades de medida CSS en un valor
        const unitRegex = /(\d*\.?\d+)(px|rem|em|%)/g;
    
        // Iterar sobre cada línea del CSS
        lines.forEach(line => {
            // Eliminar espacios en blanco al inicio y al final de la línea
            const trimmedLine = line.trim();
            // Verificar si la línea es una declaración de propiedad CSS
            const match = trimmedLine.match(propertyRegex);
            if (match) {
                const value = match[2].trim();
                // Buscar unidades de medida en el valor y agregarlas al objeto units
                let unitMatch;
                while ((unitMatch = unitRegex.exec(value)) !== null) {
                    const unit = unitMatch[2];
                    if (!units.hasOwnProperty(unit)) {
                        units[unit] = [];
                    }
                    units[unit].push(unitMatch[0]);
                }
            }
        });
    
        // Si unique es true, convertir los arrays de unidades en arrays únicos
        if (unique) {
            Object.keys(units).forEach(unit => {
                units[unit] = [...new Set(units[unit])];
            });
        }
    
        return units;
    };
    
    const cssGetUnitValues = (cssString, unique = true) => {
        // Dividir el string CSS en líneas
        const lines = cssString.split('\n');
        
        // Array para almacenar todos los valores de las unidades de medida CSS
        const allUnitValues = [];
    
        // Expresión regular para buscar todas las unidades de medida CSS en un valor
        const allUnitsRegex = /\d*\.?\d+(px|rem|em|%)/g;
    
        // Iterar sobre cada línea del CSS
        lines.forEach(line => {
            // Verificar si la línea contiene unidades de medida
            const matches = line.match(allUnitsRegex);
            if (matches) {
                // Agregar los valores encontrados al array de valores de unidades
                matches.forEach(match => {
                    allUnitValues.push(match);
                });
            }
        });
    
        // Si unique es true, eliminar valores duplicados
        if (unique) {
            return [...new Set(allUnitValues)];
        }
    
        return allUnitValues;
    };        

    const cssGetPropertyValues = (cssString, unique = true) => {
        // Dividir el string CSS en líneas
        const lines = cssString.split('\n');
        
        // Objeto para almacenar los valores de las propiedades CSS
        const propertyValues = {};
    
        // Expresión regular para validar una propiedad CSS y su valor
        const propertyRegex = /^\s*([a-zA-Z-]+)\s*:\s*([^;]+)/;
    
        // Iterar sobre cada línea del CSS
        lines.forEach(line => {
            // Eliminar espacios en blanco al inicio y al final de la línea
            const trimmedLine = line.trim();
            // Verificar si la línea es una declaración de propiedad CSS
            const match = trimmedLine.match(propertyRegex);
            if (match) {
                const property = match[1].trim();
                const value = match[2].trim();
                // Si ya existe la propiedad, agregamos el valor
                if (propertyValues.hasOwnProperty(property)) {
                    propertyValues[property].push(value);
                } else { // Si no existe la propiedad, creamos un array con el valor
                    propertyValues[property] = [value];
                }
            }
        });
    
        // Si unique es true, convertir los valores en arrays únicos
        if (unique) {
            Object.keys(propertyValues).forEach(property => {
                propertyValues[property] = [...new Set(propertyValues[property])];
            });
        }
    
        return propertyValues;
    };

    const cssGetSelectors = (cssString, includePseudoClasses = true, unique = true) => {
        // Dividir el string CSS en líneas
        const lines = cssString.split('\n');
        
        // Array para almacenar los selectores CSS
        const selectors = [];
    
        // Expresión regular para buscar selectores CSS
        const selectorRegex = /([^{]+)\s*{/;
    
        // Expresión regular para verificar si un selector incluye una pseudo-clase
        const pseudoClassRegex = /:[^:]+/;
    
        // Iterar sobre cada línea del CSS
        lines.forEach(line => {
            // Verificar si la línea contiene un selector CSS
            const match = line.match(selectorRegex);
            if (match) {
                const selector = match[1].trim();
                if (!includePseudoClasses && pseudoClassRegex.test(selector)) {
                    return; // Si no se deben incluir pseudo-clases y el selector las tiene, lo ignoramos
                }
                selectors.push(selector);
            }
        });
    
        // Si unique es true, eliminar selectores duplicados
        if (unique) {
            return [...new Set(selectors)];
        }
    
        return selectors;
    };

    const convertToResponsiveUnits = (cssString) => {
        // Obtener todos los selectores presentes en el CSS
        const selectors = cssGetSelectors(cssString, true, true);
    
        // Obtener todos los valores con unidades de medida presentes en el CSS
        const units = cssGetUnitValues(cssString, false);
    
        // Calcular los valores en unidades responsive para las unidades presentes
        const valuesInResponsiveUnits = units.map(unit => {
            return unit.replace(/\d*\.?\d+(px|rem|em|%)/g, value => {
                const parsedValue = parseFloat(value);
                const vwValue = (parsedValue / window.innerWidth) * 100;
                const vhValue = (parsedValue / window.innerHeight) * 100;
                return `${Math.max(vwValue, vhValue)}vw`;
            });
        });
    
        // Reemplazar las unidades en el CSS con los valores en unidades responsive
        let convertedCssString = cssString;
        valuesInResponsiveUnits.forEach((responsiveUnit, index) => {
            convertedCssString = convertedCssString.replace(units[index], responsiveUnit);
        });
    
        // Reemplazar los selectores especificados con los nuevos valores en unidades responsive
        selectors.forEach(selector => {
            const selectorRegex = new RegExp(selector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
            convertedCssString = convertedCssString.replace(selectorRegex, `${selector}`);
        });
    
        return convertedCssString;
    };
    
    
    


    return { addStyle, removeStyle };
};

export default useStyler;
