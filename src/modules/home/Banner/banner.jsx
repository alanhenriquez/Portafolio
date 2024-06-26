
import { Button, Grid, Stack } from '@mui/material';
import './banner.css';
import { SouthEast } from '@mui/icons-material';




const BANNER = ({ }) => {



    return (
        <>
            <div id='home' className="bannerHome">
                <Grid container className='grid1' spacing={0} xs={12}>
                    <Grid item xs={12} md={12 / 2}>
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
                                        <a href='#footer'>
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                endIcon={<SouthEast></SouthEast>}
                                            >
                                                CONTACTAME
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={12 / 2}>
                        <div className="section2">
                            <div className="s2Cards">
                                <div className="conatiner1">
                                    <img src='https://bucket.alanderek.com/portafolio/portada_perfil.jpg'></img>
                                </div>
                                <div className="conatiner2">
                                    <img src='/src/images/piqsels.com-id-fvkkl.jpg'></img>
                                </div>
                                <div className="conatiner3">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default BANNER;