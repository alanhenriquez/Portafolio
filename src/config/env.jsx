/* 
Este archivo almacena variables de entorno utilizadas a lo largo del proyecto.

•   Para lo que respecta a themes y class... Verificar su configuracion en el
    archivo index.css
 */


const env = {
    themes: {
        a: 'theme-light',
        b: 'theme-dark'
    },
    styles: {
        class: {
            on: 'on',
            off: 'off',
            active1: 'active1',
            active2: 'active2',
            active3: 'active3',
        }
    },
    appAccess: {
        img: {
            userImg: '/src/images/IMG_20221227_172311120.jpg',
        }
    }
}

export default env;