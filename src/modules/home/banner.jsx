
import { Button, Stack } from '@mui/material';
import './banner.css';
import { Insights, Shortcut, SouthEast } from '@mui/icons-material';




const BANNER = ({ }) => {



    return (
        <>
            <div className="bannerHome">
                <Stack className='stack1' direction={'row'} spacing={0}>
                    <div className="section1">
                        <Stack direction={'column'} spacing={12}>
                            <div className="s1Cards titulo">
                                <div className="container">
                                    <h1>ALAN HENRÍQUEZ</h1>
                                </div>
                            </div>
                            <div className="s1Cards descrption">
                                <div className="container">
                                    <p>¡Hola! Soy Alan Henriquez, apasionado del desarrollo web y móvil, especializado en front-end. Mi objetivo es crear experiencias digitales cautivadoras que combinen belleza y funcionalidad. ¿Listo para dar vida a tu visión digital? ¡Contáctame ahora!</p>
                                </div>
                            </div>
                            <div className="s1Cards button">
                                <div className="container off">
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        endIcon={<SouthEast></SouthEast>}
                                    >
                                        CONTACTAME
                                    </Button>
                                </div>
                            </div>
                        </Stack>
                    </div>
                    <div className="section2">
                        <div className="s2Cards">
                            <div className="conatiner1">
                                <img src='/src/images/IMG_20221227_172311120.jpg'></img>
                            </div>
                            <div className="conatiner2">
                                <img src='/src/images/piqsels.com-id-fvkkl.jpg'></img>
                            </div>
                            <div className="conatiner3">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </Stack>
            </div>
        </>
    )
}

export default BANNER;