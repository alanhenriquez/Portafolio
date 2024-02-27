import { Avatar, Stack } from "@mui/material";
import NavigationAnchor from "../../../components/NavigationAnchor/NavigationAnchor";
import './header.css'
import { Translate } from "@mui/icons-material";
import SimpleDrawer from "../../../components/SimpleDrawer/SimpleDrawer";
import useTranslation from "../../../hooks/useTranslation";
import env from "../../../config/env";
import langs from "../../../config/langs";


const HEADER = ({ }) => {



    const { anchorMenu } = env.appAccess.strings;
    const { setNewLang } = useTranslation(langs, 'es');



    const menuItems = [
        {
            icon: <Translate />,
            label: 'Idioma',
            children: [
                {
                    iconText: '🇪🇸',
                    label: 'Español',
                    onClick: () => setNewLang('es'), // Cambiamos el idioma a 'es'
                },
                {
                    iconText: '🇺🇸',
                    label: 'Inglés',
                    onClick: () => setNewLang('en'), // Cambiamos el idioma a 'en'
                }
            ]
        },
    ];



    return (
        <>
            <div className="headerHome">
                <Stack direction={'row'} spacing={{ xs: 2, md: 3 }}>
                    <div style={{display: 'grid', placeItems: 'center'}}>
                        <SimpleDrawer
                            anchorDirection="right"
                            menuItems={menuItems}
                            renderActivator={(props) => (
                                <Avatar style={{ width: '3vw', height: '3vw' }} {...props} alt="Alan Henríquez" src={env.appAccess.img.userImg} />
                            )}
                        />
                    </div>
                    <div style={{display: 'grid', placeItems: 'center'}}>
                        <NavigationAnchor affix={false} direction="horizontal" items={anchorMenu}></NavigationAnchor>
                    </div>
                </Stack>
            </div>
        </>
    )
}

export default HEADER;