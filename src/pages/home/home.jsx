import ABOUT_ME from '../../modules/home/AboutMe/about_me';
import BANNER from '../../modules/home/Banner/banner';
import HEADER from '../../modules/home/Header/header';
import PROYECTS from '../../modules/home/Proyects/proyects';
import './home.css';




const HOME = ({ }) => {



    return (
        <>
            <div className="sectionsHome on">
                <HEADER></HEADER>
                <BANNER></BANNER>
                <ABOUT_ME></ABOUT_ME>
                <PROYECTS></PROYECTS>
            </div>
        </>
    )
}

export default HOME;