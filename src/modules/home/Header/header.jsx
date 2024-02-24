import { Avatar, Stack } from "@mui/material";
import NavigationAnchor from "../../../components/NavigationAnchor/NavigationAnchor";
import './header.css'
import { Translate } from "@mui/icons-material";
import SimpleDrawer from "../../../components/SimpleDrawer/SimpleDrawer";
import useTranslation from "../../../hooks/useTranslation";
import env from "../../../config/env";
import langs from "../../../config/langs";
import { useEffect, useState } from "react";


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
        }
    ];

    

    return (
        <>
            <div className="headerHome">
                <Stack direction={'row'} spacing={3}>
                    <SimpleDrawer
                        anchorDirection="right"
                        menuItems={menuItems}
                        renderActivator={(props) => (
                            <Avatar {...props} alt="Alan Henríquez" src={env.appAccess.img.userImg} />
                        )}
                    />
                    <NavigationAnchor affix={false} direction="horizontal" items={anchorMenu}></NavigationAnchor>
                </Stack>
            </div>
        </>
    )
}

export default HEADER;