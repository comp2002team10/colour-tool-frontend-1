import React from 'react';
import './annotation.css';
import Figure from "./components/figure";
import { Grid, Card, Button, RadioGroup, FormControlLabel, Radio, TextField, CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';

class Annotation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figures : [],
            currentFigureIndex: 0,
            figuresLoaded: false,
            annotated: true,
            colour: "black and white",
            use: "data-vis",
            legend: "n-legend",
            maptype: "uncertain",
            number: 1,
            difficulty: 1,
        };
        this.changeFigure = this.changeFigure.bind(this);
    }

    componentDidMount() {
        fetch(`https://express-backend-vfm5.onrender.com/annotation/1`)
            .then(res => res.json())
            .then((res) => {
                if (res === null) {
                    console.log("res is null");
                    return;
                } else {
                    this.setState({
                        colour: res.colour,
                        use: res.use,
                        legend: res.legend,
                        maptype: res.maptype,
                        number: res.number,
                        difficulty: res.difficulty,
                    })
                }
            })
        fetch("https://files.catbox.moe/b2yosr.json") // all images: https://files.catbox.moe/7dvpgw.json
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    figures: res,
                    figuresLoaded: true
                })
                console.log("fetched")
            })
    }

    fetchAnnotation(id) {
        fetch(`https://express-backend-vfm5.onrender.com/annotation/${id.toString()}`)
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
            if (this.state.currentFigureIndex === 49) {
                this.setState({currentFigureIndex: 0});
                this.fetchAnnotation(1);
            } else {
                this.setState({currentFigureIndex: this.state.currentFigureIndex + 1});
                this.fetchAnnotation(this.state.currentFigureIndex + 2);
            }
        } else {
            if (this.state.currentFigureIndex === 0) {
                this.setState({currentFigureIndex: 49});
                this.fetchAnnotation(50);
            } else {
                this.setState({currentFigureIndex: this.state.currentFigureIndex - 1});
                this.fetchAnnotation(this.state.currentFigureIndex);
            }
        }

        const newAnnotation = {
            id: this.state.currentFigureIndex + 1,
            colour: this.state.colour,
            use: this.state.use,
            legend: this.state.legend,
            maptype: this.state.maptype,
            number: this.state.number,
            difficulty: this.state.difficulty,
        }
        
        if (this.state.annotated) {
            fetch(`https://express-backend-vfm5.onrender.com/update/${newAnnotation.id.toString()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAnnotation),
            })
        } else {
            fetch(`https://express-backend-vfm5.onrender.com/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAnnotation),
            })
        }

        console.log("New annotation added.")
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
            return;
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
                                    {this.state.figuresLoaded === true ? (
                                        <Figure imgUrl={this.getImgURL(this.state.currentFigureIndex)} />
                                    ) : (
                                        <CircularProgress />
                                    )}
                                </div>
                                <div className="metadata">
                                    <p>Title: {figureInfo.name}</p>
                                    <p>Year: {figureInfo.year}</p>
                                    <p>Doi: {figureInfo.doi}</p>
                                </div>
                            </div>
                            <div className="bar">
                                <Button size="small" onClick={() => this.changeFigure(false)}>Prev</Button>
                                    {this.state.currentFigureIndex + 1} / 50     
                                <Button size="small" onClick={() => this.changeFigure(true)}>Next</Button>
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
                                                defaultValue={this.state.colour}
                                                value={this.state.colour}
                                                onChange={(e) => this.setState({colour: e.target.value})}
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
                                                defaultValue={this.state.use}
                                                value={this.state.use}
                                                onChange={(e) => this.setState({use: e.target.value})}
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
                                                value={this.state.legend}
                                                onChange={(e) => this.setState({legend: e.target.value})}
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
                                                value={this.state.maptype}
                                                onChange={(e) => this.setState({maptype: e.target.value})}
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
                                        <TextField value={this.state.number} onChange={(e) => this.setState({number: e.target.value})}
                                             id="outlined-basic" variant="outlined" />
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
                                                value={this.state.difficulty}
                                                onChange={(e) => this.setState({difficulty: e.target.value})}
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

export default Annotation;
