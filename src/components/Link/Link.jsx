import React from 'react';
import PropTypes from 'prop-types';
import useSmoothScroll from '../../hooks/useSmoothScroll';

const Link = ({ to, children, className }) => {
  const { scrollTo } = useSmoothScroll();

  const handleClick = () => {
    // Si el destino es un ID dentro de la página, utiliza el hook useSmoothScroll
    if (to.startsWith('#')) {
      scrollTo(to.substring(1));
    }
  };

  // Determina el valor del atributo href basado en la condición
  const href = !to.startsWith('#') ? to : null;

  return (
    <a href={href} target={'_blank'} onClick={handleClick} className={className} role="button" tabIndex="0">
      {children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Link;
