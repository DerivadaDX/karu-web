import React from "react";
import List from "@mui/material/List";
import ItemListNav from './ItemList'

export default function MenuSideBar({navLinks}) {
    return (
        <React.Fragment>
            <List component="div" disablePadding>
            {navLinks.map( item => (
            <ItemListNav key={item.title}
                title={item.title}
                path={item.path}
                icon={item.icon}
                />
            ))}
            </List>
        </React.Fragment>
    );
}