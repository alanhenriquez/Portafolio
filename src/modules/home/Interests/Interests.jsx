import { Button, Grid, Stack } from '@mui/material';
import PreviewPDF from '../../../components/PreviewPDF/PreviewPDF';
import env from '../../../config/env';
import './Interests.css';
import { Download } from '@mui/icons-material';
import Link from '../../../components/Link/Link';
import AlertDialogSlide from '../../../components/AlertDialogSlide/AlertDialogSlide';
import { useEffect, useState } from 'react';



const INTERESTS = () => {
    const [ExecuteClick, setExecuteClick] = useState(false);

    useEffect(() => {
        setExecuteClick(false);
    }, [ExecuteClick]);

    return (
        <>
            <div id='interest' className="interestHome">
                <Grid height={'100%'} container xs={12}>
                    <Grid style={{ display: 'grid', placeItems: 'center' }} item xs={12 / 2} md={12 / 2}>
                        <div className="titulo">
                            <Stack spacing={5}>
                                <div className={"container " + env.styles.variants.text.a}>
                                    <h2>MI PORTAFOLIO</h2>
                                </div>
                                <div>
                                    <AlertDialogSlide
                                        dialogContent={'Estas a punto de descargar mi curriculum. Quieres continuar con la descarga?'}
                                        dialogTitle={'Descarga de Curriculum'}
                                        agreeText={'Descargar'}
                                        disagreeText={'Cancelar'}
                                        onAgree={() => {
                                            setExecuteClick(true);
                                        }}
                                        renderActivator={(props) =>
                                            <div className={env.styles.variants.buttons.a}>
                                                <Button
                                                    {...props}
                                                    startIcon={<Download></Download>}
                                                    variant="contained"
                                                    disableElevation
                                                >
                                                    DESCARGAR
                                                </Button>
                                                <Link to='https://bucket.alanderek.com/portafolio/docs/Alan%20Henr%C3%ADquez.pdf' download target={'_blank'} executeClick={ExecuteClick}></Link>
                                            </div>
                                        }
                                    />
                                </div>
                            </Stack>
                        </div>
                    </Grid>
                    <Grid style={{ display: 'grid', placeItems: 'center' }} item xs={12 / 2} md={12 / 2}>
                        <div className="documento">
                            <PreviewPDF cssPreview={{height: '80vh', width: '35vw'}} pdfFileUrl={'https://bucket.alanderek.com/portafolio/docs/Alan%20Henr%C3%ADquez.pdf'} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default INTERESTS;