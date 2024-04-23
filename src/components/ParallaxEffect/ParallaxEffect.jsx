import React, { useEffect } from 'react';

const Parallax = () => {
    useEffect(() => {
        // Obtener referencia al elemento de fondo parallax
        const parallax = document.querySelector('.parallax-background');

        // Función para manejar el efecto parallax con suavizado
        function handleParallax() {
            // Calcular la posición de desplazamiento
            let scrollPosition = window.scrollY;

            // Aplicar la función de suavizado (sinusoidal)
            let translateY = scrollPosition * 0.2;
            let easeAmount = Math.sin(translateY * 0.02) * 20; // Ajusta el valor para cambiar la cantidad de suavizado
            parallax.style.transform = 'translateY(' + (translateY + easeAmount) + 'px)';
        }

        // Llamar a la función inicialmente
        handleParallax();

        // Escuchar el evento de scroll y actualizar el efecto parallax usando requestAnimationFrame
        window.addEventListener('scroll', function () {
            handleParallax();
        });
    }, []);

    return (
        <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
            <div className="parallax-background" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '200%', // Ajusta según sea necesario
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: 'url("/src/images/piqsels.com-id-fvkkl.jpg")', // Ruta de tu imagen
                zIndex: 1
            }}></div>
            <div className="parallax-content" style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                padding: '100px 0', // Ajusta según sea necesario
                color: '#fff',
                zIndex: 2000
            }}>
                <h1>Welcome to Parallax Effect</h1>
                <p>This is a simple example of a parallax effect created using React.</p>
            </div>
        </div>
    );
};

export default Parallax;
