import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';


class Exploration extends React.Component {


    render() {
        return (
            <div className="App">
                 <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Filter Images
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem> <Checkbox {...label} label = "colour"/></MenuItem>
        <MenuItem> <Checkbox {...label} label = "black and white"/></MenuItem>
        <MenuItem> <Checkbox {...label} label = "greyscale"/></MenuItem>
      </Menu>

            
            </div>
        );
    }

}