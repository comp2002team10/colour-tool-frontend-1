import React from 'react';
import './annotation.css';
import { Grid, Card, Typography } from '@mui/material';
import MenuBar from './components/menubar';

class Cover extends React.Component {

    render() {
        document.title = "CO1OUR";
        return (
            <div className="App">
                <Grid container spacing={2}>
                    <Grid sx={{ flexGrow: 1 }} item xs={12}>
                        <MenuBar handleLogOut={null}/>
                    </Grid>
                    {/* <Grid item xs={8}>
                        <Card>
                            <div className="card">
                                <Typography variant="h4" gutterBottom>
                                Use of colour
                                </Typography>
                                <Typography variant="body1" >
                                Use of colour for data vis. ...
                                </Typography>
                            </div>

                        </Card>
                    </Grid> */}
                </Grid>
            </div>
        )
    }
}

export default Cover;