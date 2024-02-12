



const installs = {
    proyect: {
        react_vite: {
            install: 'npx create-vite nombre-de-tu-app',
            view_pc: {
                exec: 'npm run dev',
                acess_local: 'http://localhost:5173/',
            },
            view_pc_and_movil: {
                exec: 'npm run dev -- --host',
                acess_local: 'http://localhost:5173/',
                acess_network: 'http://your_ip_pc_autogenerated:5173/',
            }
        },
        react_cra_webpack: 'npx create-react-app nombre-de-tu-app'
    },
    react_libraries: {
        react_router_dom: 'npm install react-router-dom',
        react_dnd: 'npm install react-dnd react-dnd-html5-backend',
        swiper: 'npm install swiper',
        chart_js: 'npm install chart.js',
    },
    react_ui_frameworks: {
        material_ui: {
            mui_core: 'npm install @mui/material @emotion/react @emotion/styled',
            mui_icons: 'npm install @mui/icons-material',
            mui_lab: 'npm install @mui/lab @mui/material',
        },
        ant_design: {
            install: 'npm install antd --save',
        },
        chakra_ui: {
            install: 'npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion'
        },
        prime_react: {
            install: 'npm install primereact',
        },
        next_ui: {
            install: 'npm i @nextui-org/react framer-motion',
        },
        semantic_ui: {
            install: 'npm install semantic-ui-react semantic-ui-css',
        },
        react_suite_js: {
            install: 'npm install rsuite --save',
        },
    },
    react_css_libraries: {
        tailwindcss: {
            install: 'npm install -D tailwindcss',
            init: 'npx tailwindcss init -p',
            //en caso de requerirse en los archivos css, utilizar:
            incss: "@import 'tailwindcss/base'; @import 'tailwindcss/components'; @import 'tailwindcss/utilities';"
        },
        canvas_confetti: {
            install: 'npm install canvas-confetti'
        }
    }
}

export default installs;