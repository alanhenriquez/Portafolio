import { Button, Grid } from '@mui/material';
import './about_me.css';


const ABOUT_ME = ({ }) => {



    return (
        <>
            <div id='about' className="aboutMeHome">
                <Grid container className='grid1' spacing={0} xs={12}>
                    <Grid container item xs={12} md={12 / 2}>
                        <Grid item>
                            <div className="section1">
                                <Grid container spacing={5} xs={12}>
                                    <Grid item xs={12}>
                                        <div className="saludo">
                                            <div className="container">
                                                <h2>¿QUIEN SOY?</h2>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="mensaje">
                                            <div className="container">
                                                <h2>Pasión por perfección.</h2>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={12 / 2}>
                        <Grid item>
                            <div className="section2">
                                <Grid container spacing={3} xs={12}>
                                    <Grid item xs={12}>
                                        <div className="infoPersonal">
                                            <div className="container">
                                                <h4>Mi enfoque se centra en fusionar diseño y programación para crear experiencias digitales impactantes. Con dominio en front-end y bases de datos SQL y NoSQL, estoy constantemente explorando nuevas técnicas para potenciar mis habilidades. ¡Unamos fuerzas para dar vida a tu visión digital!</h4>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="boton">
                                            <div className="container btv1">
                                                <Button
                                                    variant="contained"
                                                    disableElevation
                                                >
                                                    MIRA LO QUE HE HECHO
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ABOUT_ME;