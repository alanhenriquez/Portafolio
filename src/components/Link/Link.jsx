import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useSmoothScroll from '../../hooks/useSmoothScroll';

const Link = ({ to, children, className, target, download, executeClick}) => {
  const { scrollTo } = useSmoothScroll();
  const [ExecuteClick, setExecuteClick] = useState(executeClick || false);
  const reference = useRef();

  const handleClick = (event) => {
    // Validar si se debe descargar el recurso
    if (download && !isValidDownload(to)) {
      event.preventDefault(); // Evitar que el enlace se abra si no es un recurso descargable
      return;
    }

    // Si el destino es un ID dentro de la página, utiliza el hook useSmoothScroll
    if (to.startsWith('#')) {
      scrollTo(to.substring(1));
    }
  };

  const isValidDownload = (url) => {
    // Aquí podrías implementar la lógica de validación para determinar si el recurso es descargable
    // Por ejemplo, podrías verificar si la URL es válida o si el recurso está disponible para descarga.
    // Esto podría ser una validación simple o más compleja dependiendo de tus necesidades.
    // En este ejemplo, simplemente se valida si la URL comienza con 'http' o 'https'.
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
  };

  // Determina el valor del atributo href basado en la condición
  const href = !to.startsWith('#') ? to : null;


  useEffect(() => {
    if (executeClick) {
      const ref = reference;
      ref.current.click();
    }
  }, [executeClick]);


  return (
    <a ref={reference} href={href} target={target} onClick={handleClick} className={className + 'link-component-root'} role="button" tabIndex="0" download={download ? true : null}>
      {children || null}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']), // Opciones posibles del target
  download: PropTypes.bool, // Nueva prop para decidir si descargar o no
};

// Valor por defecto para la prop target
Link.defaultProps = {
  target: '_blank', // Se establece "_blank" como valor por defecto
};

export default Link;
