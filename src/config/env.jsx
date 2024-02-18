/* 
Este archivo almacena variables de entorno utilizadas a lo largo del proyecto.

•   Para lo que respecta a themes y class... Verificar su configuracion en el
    archivo index.css
 */

import EN from "./langs/en";
import ES from "./langs/es";





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
        },
        variants: {
            buttons: {
                a: 'btv1',
            },
            text: {
                a: 'txtTitle1',
                b: 'txtTitle2',
            },
        }
    },
    appAccess: {
        strings: {
            es: ES,
            en: EN,
        },
        img: {
            userImg: '/src/images/IMG_20221227_172311120.jpg',
            prWeb: [
                /* vaidbit */
                {
                    img: '/src/images/imgProyectos/web/vaidbit/p10.png',
                    title: 'Publicaciones',
                    from: 'web',
                    proyect: 'vaidbit',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/vaidbit/p11.png',
                    title: 'Listas',
                    from: 'web',
                    proyect: 'vaidbit',
                    createdFor: 'freelance'
                },
                /* lumont */
                {
                    img: '/src/images/imgProyectos/web/lumont/p2.png',
                    title: 'Descripciones 1',
                    from: 'web',
                    proyect: 'lumont',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/lumont/p3.png',
                    title: 'Descripciones 2',
                    from: 'web',
                    proyect: 'lumont',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/lumont/p4.png',
                    title: 'Banner 1',
                    from: 'web',
                    proyect: 'lumont',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/lumont/p5.png',
                    title: 'Banner 2',
                    from: 'web',
                    proyect: 'lumont',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/lumont/p6.png',
                    title: 'Servicios 1',
                    from: 'web',
                    proyect: 'lumont',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/lumont/p7.png',
                    title: 'Servicios 2',
                    from: 'web',
                    proyect: 'lumont',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/lumont/p8.png',
                    title: 'Precios',
                    from: 'web',
                    proyect: 'lumont',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/lumont/p9.png',
                    title: 'Footer',
                    from: 'web',
                    proyect: 'lumont',
                    createdFor: 'freelance'
                },
                /* genius forms */
                {
                    img: '/src/images/imgProyectos/web/forms/p12.png',
                    title: 'Editor',
                    from: 'web',
                    proyect: 'forms',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/forms/p13.png',
                    title: 'Editor en acción',
                    from: 'web',
                    proyect: 'forms',
                    createdFor: 'freelance'
                },
                /* landing page ugb */
                {
                    img: '/src/images/imgProyectos/web/landigPageUGB/p1.png',
                    title: 'Formularion 1',
                    from: 'web',
                    proyect: 'landigugb',
                    createdFor: 'freelance'
                },
                {
                    img: '/src/images/imgProyectos/web/landigPageUGB/p14.png',
                    title: 'Formulario 2',
                    from: 'web',
                    proyect: 'landigugb',
                    createdFor: 'freelance'
                },
            ],
            prApp: [],
        }
    }
}

export default env;