import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function MenuBar({handleLogOut}) {
    const pages = ["annotation", "validation", "exploration"];
    const navigate = useNavigate();
    const status = handleLogOut;
    
    const lightTheme = createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#434f63",
          },
        },
    });

    const handleLink = (page) => {
        navigate(`/${page}`);
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <ColorLensRoundedIcon />
                </IconButton>
                <Typography variant="h6"
                    noWrap
                    component="a"
                    href="/" sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                    CO1OUR
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={() => handleLink(page)}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
                {status === null ? (
                    <AccountCircleRoundedIcon />
                ) : (
                    <Button color="inherit" onClick={() => handleLogOut()}>Log out</Button>
                )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
  );
}