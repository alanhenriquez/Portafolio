import { Grid, IconButton, Stack, Typography } from '@mui/material';
import './footer.css';
import { Email, Instagram, LinkedIn, LocationOn, Phone } from '@mui/icons-material';
import { Tooltip } from 'antd';
import Link from '../../../components/Link/Link';
import Image from '../../../components/Image/Image';



const FOOTER = () => {



    const social = [
        { key: 1, tootip: 'Instagram', icon: (<Instagram></Instagram>), link: '#proyects' },
        { key: 2, tootip: 'Linkedin', icon: (<LinkedIn></LinkedIn>), link: 'https://mui.com/material-ui/material-icons/' },
    ]

    const contacto = [
        { key: 1, title: 'El Salvador', icon: (<LocationOn></LocationOn>) },
        { key: 1, title: '+503 78578157', icon: (<Phone></Phone>) },
        { key: 2, title: 'alanderekh@gmail.com', icon: (<Email></Email>) },
    ]



    return (
        <>
            <div id='footer' className="footerHome">
                <Grid container className='grid1' spacing={0} xs={12}>
                    <Grid item xs={12} md={12}>
                        <div className="section1">

                        </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div className="section2">
                            <Grid container className='grid1' spacing={0} xs={12}>
                                <Grid item xs={12} md={6}>
                                    <div className="logo">
                                        <div className="imagen">
                                            <div className="conatiner">
                                                <img src="/src/images/logos/GridArt_20240226_093324423.png" alt="logo" />
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div className="info">
                                        <div className="contactos">
                                            <div className='title'>
                                                <div className='text'>
                                                    
                                                    <p>Contacto</p>
                                                    
                                                </div>
                                                <div className='deco'>

                                                    <span></span>
                                                    
                                                </div>
                                            </div>
                                            <div className="conatiner">
                                                <Stack spacing={2} direction={'row'}>
                                                    {
                                                        contacto.map((item) => (
                                                            <>
                                                                <div className="cardContacto">
                                                                    <Stack direction={'row'} spacing={2}>
                                                                        <div className='icon'>{item.icon}</div>
                                                                        <div className='text'>{item.title}</div>
                                                                    </Stack>
                                                                </div>
                                                            </>
                                                        ))
                                                    }
                                                </Stack>
                                            </div>
                                        </div>
                                        <div className="social">
                                            <div className='title'>
                                                <div className='text'>
                                                    
                                                    <p>REDES SOCIALES</p>
                                                    
                                                </div>
                                                <div className='deco'>

                                                    <span></span>
                                                    
                                                </div>
                                            </div>
                                            <div className="container">
                                                <Stack spacing={3} direction={'row'}>
                                                    {
                                                        social.map((item) => (
                                                            <div className="cardSocial">
                                                                <Tooltip title={item.tootip}>
                                                                    <Link to={item.link}>
                                                                        <IconButton>{item.icon}</IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                        ))
                                                    }
                                                </Stack>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    )



}

export default FOOTER;