import { Grid, Stack } from "@mui/material";
import StandardImageList from "../../../components/StandardImageList/StandardImageList";
import env from "../../../config/env";
import './proyects.css';
import { Home } from "@mui/icons-material";




const PROYECTS = ({ }) => {



    return (
        <>
            <div id='proyects' className="proyectsHome">
                <div className="pyContainer">
                    <Grid container className="grid1" spacing={0} xs={12}>
                        <Grid item xs={6}>
                            <div className="section2">
                                <div className="containerImages">
                                    <StandardImageList cols={3} data={env.appAccess.img.prWeb}></StandardImageList>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="section1">
                                <Grid container spacing={5} xs={12}>
                                    <Grid item xs={12}>
                                        <div className="titulo1">
                                            <div className={"container " + env.styles.variants.text.a}>
                                                <h2>¡MIRA!</h2>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="titulo2">
                                            <div className={"container " + env.styles.variants.text.b}>
                                                <h2>Algunos de mis proyectos.</h2>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default PROYECTS;