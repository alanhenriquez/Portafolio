import ABOUT_ME from '../../modules/home/AboutMe/about_me';
import BANNER from '../../modules/home/Banner/banner';
import FOOTER from '../../modules/home/Footer/footer';
import HEADER from '../../modules/home/Header/header';
import INTERESTS from '../../modules/home/Interests/Interests';
import PROYECTS from '../../modules/home/Proyects/proyects';
import './home.css';



const HOME = ({ }) => {



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