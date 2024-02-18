import { Avatar, Stack } from "@mui/material";
import NavigationAnchor from "../../../components/NavigationAnchor/NavigationAnchor";
import './header.css'
import env from "../../../config/env";
import { Mail, Translate } from "@mui/icons-material";
import SimpleDrawer from "../../../components/SimpleDrawer/SimpleDrawer";



const HEADER = ({ }) => {

    const { anchorMenu } = eval(`env.appAccess.strings.en`);



    const handleItemClick = (item) => {
        console.log(item);
    };


    const menuItems = [
        {
            icon: <Translate />,
            label: 'Idioma',
            onClick: () => handleItemClick('Starred'),
            children: [
                {
                    iconText: '🇪🇸',
                    label: 'Español',
                    onClick: (value) => handleItemClick(value),
                },
                {
                    iconText: '🇺🇸',
                    label: 'Ingles',
                    onClick: (value) => handleItemClick(value),
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