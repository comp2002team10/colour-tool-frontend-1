import React from 'react';
import './App.css';
import Figure from "./Figure";
import { Grid, Card, Button, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { Stack } from '@mui/system';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figures : [],
            currentFigureIndex: 0,
            figuresLoaded: false
        };
        this.changeFigure = this.changeFigure.bind(this);
    }

    componentDidMount() {
        fetch("https://files.catbox.moe/7dvpgw.json")
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    figures: res,
                    figuresLoaded: true
                })
            })
    }

    changeFigure(increment) {
        if (increment === true) {
            if (this.state.currentFigureIndex === 29688) {
                this.setState({currentFigureIndex: 0});
            } else {
                this.setState({currentFigureIndex: this.state.currentFigureIndex + 1});
            }
        } else {
            if (this.state.currentFigureIndex === 0) {
                this.setState({currentFigureIndex: 29688});
            } else {
                this.setState({currentFigureIndex: this.state.currentFigureIndex - 1});
            }
        }
    }

    getFigureInfo(index) {
        if (!this.state.figuresLoaded) {
            return {name: "",
                    doi: "",
                    year: ""};
        } else {
            return {name: this.state.figures["in"][index]["name"],
                    doi: this.state.figures["in"][index]["doi"],
                    year: this.state.figures["in"][index]["year"]};
        }
    }

    getImgURL(index) {
        if (!this.state.figuresLoaded) {
            return "https://i.imgur.com/llF5iyg.gif";
        } else {
            return this.state.figures["in"][index]["url"];
        }
    }

    render() {
        document.title = "Figure Viewer";
        let figureInfo = this.getFigureInfo(this.state.currentFigureIndex);
        return (
            <div className="App">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <div className="card">
                                <div className="figure">
                                    <Figure imgUrl={this.getImgURL(this.state.currentFigureIndex)}/>
                                </div>
                                <div className="metadata">
                                    <p>Title: {figureInfo.name}</p>
                                    <p>Year: {figureInfo.year}</p>
                                    <p>Doi: {figureInfo.doi}</p>
                                </div>
                            </div>
                            <div className="bar">                                
                                <Button className="button" onClick={() => this.changeFigure(false)}>Prev</Button>
                                {this.state.currentFigureIndex + 1}/29689
                                <Button className="button" onClick={() => this.changeFigure(true)}>Next</Button>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={2}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <Card>
                                        <div className="ques-box">
                                            <h3>Q1. What is the colour type?</h3>
                                            <RadioGroup
                                                aria-labelledby="colour-type"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="black and white" control={<Radio />} label="Black and white" />
                                                <FormControlLabel value="grey" control={<Radio />} label="Greyscale" />
                                                <FormControlLabel value="colour" control={<Radio />} label="Colour" />
                                            </RadioGroup>
                                        </div>
                                    </Card>
                                </Grid>
                                <Grid item sm={6}>
                                    <Card>
                                    <div className="ques-box">
                                        <h3>Q2. Is colour used for aesthetics or data visualisation?</h3>
                                        <RadioGroup
                                                aria-labelledby="colour-use"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="aesthetics" control={<Radio />} label="Aesthetics" />
                                                <FormControlLabel value="data-vis" control={<Radio />} label="Data Visualisation" />
                                                <FormControlLabel value="uncertain" control={<Radio />} label="Not sure" />
                                        </RadioGroup>
                                    </div>
                                    </Card>
                                </Grid>
                                <Grid item sm={6}>
                                    <Card>
                                    <div className="ques-box">
                                        <h3>Q3. Is a colour mapping legend shown?</h3>
                                        <RadioGroup
                                                aria-labelledby="legend"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="legend" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="n-legend" control={<Radio />} label="No" />
                                                <FormControlLabel value="uncertain" control={<Radio />} label="Not sure" />
                                        </RadioGroup>
                                    </div>
                                    </Card>
                                </Grid>
                                <Grid item sm={6}>
                                    <Card>
                                    <div className="ques-box">
                                        <h3>Q4. Is the colour mapping continuous or categorical?</h3>
                                        <RadioGroup
                                                aria-labelledby="continuous"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="continuous" control={<Radio />} label="Continuous" />
                                                <FormControlLabel value="categorical" control={<Radio />} label="Categorical" />
                                                <FormControlLabel value="uncertain" control={<Radio />} label="Not sure" />
                                        </RadioGroup>
                                    </div>
                                    </Card>
                                </Grid>
                                <Grid item sm={6}>
                                    <Card>
                                    <div className="ques-box">
                                        <h3>Q5. How many colour values are used?</h3>
                                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                    </div>
                                    </Card>
                                </Grid>
                                <Grid item sm={6}>
                                    <Card>
                                    <div className="ques-box">
                                        <h3>Q6. Difficulty?</h3>
                                        <RadioGroup
                                                row
                                                aria-labelledby="difficulty"
                                                name="row-radio-buttons-group"
                                            >
                                                <FormControlLabel value="1" control={<Radio />} label="1" />
                                                <FormControlLabel value="2" control={<Radio />} label="2" />
                                                <FormControlLabel value="3" control={<Radio />} label="3" />
                                                <FormControlLabel value="4" control={<Radio />} label="4" />
                                                <FormControlLabel value="5" control={<Radio />} label="5" />
                                        </RadioGroup>
                                    </div>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

export default App;
