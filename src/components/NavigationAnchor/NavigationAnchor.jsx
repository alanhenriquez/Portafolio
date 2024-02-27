import React from 'react';
import { Anchor } from 'antd';

/**
 * NavigationAnchor Component
 * 
 * Componente que renderiza un menú de navegación con anclas.
 * 
 * Props:
 * - affix (boolean): Modo fijo del menú de navegación. Por defecto es true.
 * - bounds (number): Distancia de limitación del área del ancla. Por defecto es 5.
 * - getContainer (function): Contenedor de desplazamiento. Por defecto es () => window.
 * - getCurrentAnchor (function): Personaliza el resaltado del ancla. Por defecto es undefined.
 * - offsetTop (number): Píxeles para desplazarse desde la parte superior al calcular la posición del desplazamiento. Por defecto es 0.
 * - showInkInFixed (boolean): Indica si mostrar la tinta cuadrada cuando affix={false}. Por defecto es false.
 * - targetOffset (number): Desplazamiento del desplazamiento del ancla, por defecto como offsetTop. Por ejemplo: 50.
 * - onChange (function): Escucha el cambio del enlace de anclaje. Por defecto es undefined.
 * - onClick (function): Establece el manejador para manejar el evento de clic. Por defecto es undefined.
 * - items (array): Configuración de datos para el contenido de las opciones, soporta anidación a través de children.
 * - direction (string): Establece la dirección del menú de anclaje. Puede ser 'vertical' o 'horizontal'. Por defecto es 'vertical'.
 * - replace (boolean): Reemplaza href de los elementos en el historial del navegador en lugar de agregarlo. Por defecto es false.
 * - className (string): Opcional. Clases CSS adicionales a aplicar al componente `Anchor`.
 * 
 */
const NavigationAnchor = ({
    affix = true,
    bounds = 5,
    getContainer = () => window,
    getCurrentAnchor,
    offsetTop = 0,
    showInkInFixed = false,
    targetOffset,
    onChange,
    onClick,
    items,
    direction = 'vertical',
    replace = false,
    className
}) => {
    // Validar que items sea un array
    if (!Array.isArray(items)) {
        throw new Error("La propiedad 'items' debe ser un array.");
    }

    // Validar cada elemento del array
    items.forEach(item => {
        if (typeof item.key !== 'string') {
            throw new Error(`La propiedad 'key' del elemento en la lista de 'items' debe ser de tipo string. Elemento: ${JSON.stringify(item)}`);
        }
        if (typeof item.href !== 'string') {
            throw new Error(`La propiedad 'href' del elemento en la lista de 'items' debe ser de tipo string. Elemento: ${JSON.stringify(item)}`);
        }
        if (typeof item.title !== 'string') {
            throw new Error(`La propiedad 'title' del elemento en la lista de 'items' debe ser de tipo string. Elemento: ${JSON.stringify(item)}`);
        }
        if (item.children && !Array.isArray(item.children)) {
            throw new Error(`La propiedad 'children', si está presente, debe ser un array. Elemento: ${JSON.stringify(item)}`);
        }
    });

    return (
        <div className={className}>
            <Anchor
                affix={affix}
                bounds={bounds}
                getContainer={getContainer}
                getCurrentAnchor={getCurrentAnchor}
                offsetTop={offsetTop}
                showInkInFixed={showInkInFixed}
                targetOffset={targetOffset}
                onChange={onChange}
                onClick={onClick}
                items={items}
                direction={direction}
                replace={replace}
            />
        </div>
    );
};

export default NavigationAnchor;
