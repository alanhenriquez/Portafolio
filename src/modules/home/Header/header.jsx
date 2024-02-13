import { Avatar, Stack } from "@mui/material";
import NavigationAnchor from "../../../components/NavigationAnchor/NavigationAnchor";
import './header.css'
import env from "../../../config/env";



const HEADER = ({ }) => {



    const itemsAnchor = [
        {
            key: '1',
            href: '#home',
            title: 'HOME',
        },
        {
            key: '2',
            href: '#about',
            title: 'ABOUT',
        },
        {
            key: '3',
            href: '#proyects',
            title: 'PROYECTS',
        }
    ]



    return (
        <>
            <div className="headerHome">
                <Stack direction={'row'} spacing={3}>
                    <Avatar alt="Remy Sharp" src={env.appAccess.img.userImg} />
                    <NavigationAnchor affix={false} direction="horizontal" items={itemsAnchor}></NavigationAnchor>
                </Stack>
            </div>
        </>
    )
}

export default HEADER;