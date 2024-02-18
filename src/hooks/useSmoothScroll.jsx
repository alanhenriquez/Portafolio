import { useState } from 'react';

function useSmoothScroll() {
  // Estado para indicar si se está realizando un desplazamiento
  const [isScrolling, setIsScrolling] = useState(false);

  // Función para realizar un desplazamiento suave
  function scrollTo(target, options = {}) {
    const {
      duration = 450, // Duración predeterminada del desplazamiento en milisegundos
      callback, // Función de devolución de llamada opcional
      easing = easeInOutCubic, // Función de suavizado predeterminada
      container = window // Contenedor predeterminado (la ventana)
    } = options;

    // Obtiene el elemento de destino a partir de su ID o como el propio elemento
    const targetElement = typeof target === 'string' ? document.getElementById(target) : target;

    // Si el elemento de destino no se encuentra, muestra un mensaje de error y sale de la función
    if (!targetElement) {
      console.error(`Element with id "${target}" not found`);
      return;
    }

    // Obtiene las coordenadas de la ventana o el contenedor
    const containerRect = container === window ? { top: 0, left: 0 } : container.getBoundingClientRect();

    // Obtiene las coordenadas del elemento de destino
    const targetRect = targetElement.getBoundingClientRect();

    // Obtiene la posición actual de desplazamiento del contenedor
    const startScrollTop = container.pageYOffset !== undefined ? container.pageYOffset : container.scrollTop;
    const startScrollLeft = container.pageXOffset !== undefined ? container.pageXOffset : container.scrollLeft;

    // Obtiene el tiempo de inicio del desplazamiento
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    // Indica que se está realizando un desplazamiento
    setIsScrolling(true);

    // Función de animación para realizar el desplazamiento
    function animateScroll() {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const elapsed = currentTime - startTime;

      // Calcula la posición de destino a la que se debe desplazar
      const targetOffsetTop = targetRect.top - containerRect.top + startScrollTop;
      const targetOffsetLeft = targetRect.left - containerRect.left + startScrollLeft;

      // Calcula la posición de desplazamiento suave en función del tiempo
      const positionTop = easing(Math.min(elapsed / duration, 1)) * (targetOffsetTop - startScrollTop) + startScrollTop;
      const positionLeft = easing(Math.min(elapsed / duration, 1)) * (targetOffsetLeft - startScrollLeft) + startScrollLeft;

      // Realiza el desplazamiento suave
      if (container.scrollTo) {
        container.scrollTo({
          top: positionTop,
          left: positionLeft,
          behavior: 'smooth'
        });
      } else {
        container.scrollTop = positionTop;
        container.scrollLeft = positionLeft;
      }

      // Si el tiempo transcurrido es menor que la duración, sigue animando el desplazamiento
      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        // Si el desplazamiento ha finalizado, indica que ya no se está desplazando
        setIsScrolling(false);
        // Si se proporciona una función de devolución de llamada, llámala
        if (typeof callback === 'function') {
          callback();
        }
      }
    }

    // Inicia la animación de desplazamiento
    animateScroll();
  }

  return { scrollTo, isScrolling };
}

// Función de suavizado easeInOutCubic
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export default useSmoothScroll;
