import React, { useState } from 'react';
import './Header.css'
import { IconButton, Drawer, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header(props) {
    const [ toggle, setToggle ] = useState(false)
    return ( <>
    <div className="header">Finding Falcone!</div>
    <div className='header-buttons'>
        <input type="button" value="Reset" onClick={() => props.reset()} />
        <span className='line' />
        <a href='https://www.geektrust.com/'>
            <input type="button" value="GeekTrust Home" />
        </a>
        <Button className="toggle-button" onClick={() => setToggle(true)}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                >
                <MenuIcon />
            </IconButton>
        </Button>   
    </div>
    
    <Drawer
    anchor="right"
    open={toggle}
    onClose={() => setToggle(false)}
    >
        <Box
            sx={{ width: 200 }}
            role="presentation"
        >
            <List>
                {['Reset', 'GeekTrust Home'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton onClick={text === 'Reset' ? () => props.reset() : null}>
                        {text === 'GeekTrust Home' ? 
                            <a href='https://www.geektrust.com/' style={{textDecoration: 'none'}}>
                                <ListItemText primary={text} />
                            </a> : 
                            <ListItemText primary={text} />}
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>
    </> );
}

export default Header;