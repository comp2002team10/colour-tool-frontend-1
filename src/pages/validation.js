import React from 'react';
import './annotation.css';
import Figure from './components/figure';
import { Grid, Card, Button, RadioGroup, FormControlLabel, Radio, TextField, CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import MenuBar from './components/menubar';

class Validation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figures : [],
            currentFigureIndex: 0,
            figuresLoaded: false,
            annotated: false,
            colour: "",
            use: "",
            legend: "",
            maptype: "",
            number: "",
            difficulty: "",
        };
        this.changeFigure = this.changeFigure.bind(this);
    }

    componentDidMount() {
        fetch("https://files.catbox.moe/aumoxt.json") // all images: https://files.catbox.moe/7dvpgw.json // 50: https://files.catbox.moe/oggcjf.json
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    figures: res,
                    figuresLoaded: true
                })
            })
    }

    fetchAnnotation(id, user) {
        fetch(`https://express-backend-vfm5.onrender.com/annotation/${id.toString()}/${user.toString()}`)
            .then(res => res.json())
            .then((res) => {
                if (res === null) {
                    this.setState({
                        annotated: false,
                        colour: "",
                        use: "",
                        legend: "",
                        maptype: "",
                        number: 0,
                        difficulty: 0,
                    })
                } else {
                    this.setState({
                        annotated: true,
                        colour: res.colour,
                        use: res.use,
                        legend: res.legend,
                        maptype: res.maptype,
                        number: res.number,
                        difficulty: res.difficulty,
                    })
                }
            })
    }

    changeFigure(increment) {
        if (increment === true) {
            if (this.state.currentFigureIndex === 149) {
                this.setState({currentFigureIndex: 0});
                this.fetchAnnotation(1, this.state.user);
            } else {
                this.setState({currentFigureIndex: this.state.currentFigureIndex + 1});
                this.fetchAnnotation(this.state.currentFigureIndex + 2, this.state.user);
            }
        } else {
            if (this.state.currentFigureIndex === 0) {
                this.setState({currentFigureIndex: 149});
                this.fetchAnnotation(150, this.state.user);
            } else {
                this.setState({currentFigureIndex: this.state.currentFigureIndex - 1});
                this.fetchAnnotation(this.state.currentFigureIndex, this.state.user);
            }
        }
    }

    submitAnnotation() { 
        const newAnnotation = {
            id: this.state.currentFigureIndex + 1,
            imageId: this.state.figures["in"][this.state.currentFigureIndex]["imageID"],
            colour: this.state.colour,
            use: this.state.use,
            legend: this.state.legend,
            maptype: this.state.maptype,
            number: this.state.number,
            difficulty: this.state.difficulty,
        }
        
        if (this.state.annotated) {
            fetch(`https://express-backend-vfm5.onrender.com/update/${newAnnotation.id.toString()}/${newAnnotation.user.toString()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAnnotation),
            })
        } else {
            fetch(`https://express-backend-vfm5.onrender.com/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAnnotation),
            })
        }
        this.setState({annotated: true});
    }

    getImgURL(index) {
        if (!this.state.figuresLoaded) {
            return;
        } else {
            return this.state.figures["in"][index]["url"];
        }
    }

    render() {
        document.title = "Validation tool";
        return (
            <div className="App">
                <Grid container spacing={2}>
                    <Grid sx={{ flexGrow: 1 }} item xs={12}>
                        <MenuBar handleLogOut={null}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <div className="card">
                                <div className="figure">
                                    {this.state.figuresLoaded === true ? (
                                        <Figure imgUrl={this.getImgURL(this.state.currentFigureIndex)} />
                                    ) : (
                                        <CircularProgress />
                                    )}
                                </div>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Validation;