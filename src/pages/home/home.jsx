import { useEffect } from 'react';
import useStyler from '../../hooks/useStyler';
import ABOUT_ME from '../../modules/home/AboutMe/about_me';
import BANNER from '../../modules/home/Banner/banner';
import FOOTER from '../../modules/home/Footer/footer';
import HEADER from '../../modules/home/Header/header';
import INTERESTS from '../../modules/home/Interests/Interests';
import PROYECTS from '../../modules/home/Proyects/proyects';
import './home.css';



const HOME = ({ }) => {
    /* const { addStyle, removeStyle } = useStyler({
        '.myClass': {
            width: '100px',
            height: '100px',
            backgroundColor: '#262626',
            padding: '10px',
            borderRadius: '5px', 
            display: 'flex',
            'font-size': '14px', 
            justifyContent: 'center',
            alignItems: 'center',
            ':hover': {
                backgroundColor: '#ccc',
                cursor: 'pointer'
            },
            ':active': { 
                borderRadius: '5%', 
                transform: 'scale(1.05)'
            }
        },
        '.anotherClass': {
            fontSize: '18px !important',
            fontWeight: 'bold',
        }
    }, '/src/modules/home/Footer/footer.css'); */





    return (
        <>
            <div className="sectionsHome">
                <HEADER></HEADER>
                <BANNER></BANNER>
                <ABOUT_ME></ABOUT_ME>
                <PROYECTS></PROYECTS>
                <INTERESTS></INTERESTS>
            </div>
            <FOOTER></FOOTER>
        </>
    )
}

export default HOME;