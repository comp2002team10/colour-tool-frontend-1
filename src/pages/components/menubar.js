import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function MenuBar({handleLogOut}) {
    const lightTheme = createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#434f63",
          },
        },
      });

  return (
        <ThemeProvider theme={lightTheme}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    CO1OUR
                </Typography>
                    <Button color="inherit" onClick={() => handleLogOut()}>Log out</Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
  );
}