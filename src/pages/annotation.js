import React from 'react';
import './annotation.css';
import Figure from './components/figure';
import Login from './components/login';
import { Grid, Card, Button, RadioGroup, FormControlLabel, Radio, TextField, CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import MenuBar from './components/menubar';

class Annotation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figures : [],
            currentFigureIndex: 0,
            figuresLoaded: false,
            annotated: false,
            user: "",
            colour: "",
            use: "",
            legend: "",
            maptype: "",
            number: "",
            difficulty: "",
        };
        this.changeFigure = this.changeFigure.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
        fetch("https://files.catbox.moe/cnlqci.json") // all images: https://files.catbox.moe/7dvpgw.json // 50: https://files.catbox.moe/oggcjf.json
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
            if (this.state.currentFigureIndex === 99) {
                this.setState({currentFigureIndex: 0});
                this.fetchAnnotation(1, this.state.user);
            } else {
                this.setState({currentFigureIndex: this.state.currentFigureIndex + 1});
                this.fetchAnnotation(this.state.currentFigureIndex + 2, this.state.user);
            }
        } else {
            if (this.state.currentFigureIndex === 0) {
                this.setState({currentFigureIndex: 99});
                this.fetchAnnotation(100, this.state.user);
            } else {
                this.setState({currentFigureIndex: this.state.currentFigureIndex - 1});
                this.fetchAnnotation(this.state.currentFigureIndex, this.state.user);
            }
        }

        const newAnnotation = {
            id: this.state.currentFigureIndex + 1,
            user: this.state.user,
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

    handleLogin(username) {
        console.log(username);
        this.setState({user: username});
        fetch(`https://express-backend-vfm5.onrender.com/annotation/1/${username.toString()}`)
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
    }

    handleLogOut() {
        console.log("log out");
        this.setState({user: ""});
    }

    render() {
        if (this.state.user !== "") {
            document.title = "Figure Viewer";
            let figureInfo = this.getFigureInfo(this.state.currentFigureIndex);
            return (
                <div className="App">
                    <Grid container spacing={2}>
                    <Grid sx={{ flexGrow: 1 }} item xs={12 }>
                        <MenuBar handleLogOut={this.handleLogOut}/>
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
                                    <div className="metadata">
                                        <p>Title: {figureInfo.name}</p>
                                        <p>Year: {figureInfo.year}</p>
                                        <p>Doi: {figureInfo.doi}</p>
                                    </div>
                                </div>
                                <div className="bar">
                                    <Button size="small" onClick={() => this.changeFigure(false)}>Prev</Button>
                                        {this.state.currentFigureIndex + 1} / 100   
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
                                                    row
                                                    aria-labelledby="colour-use"
                                                    name="row-radio-buttons-group"
                                                    defaultValue={this.state.use}
                                                    value={this.state.use}
                                                    onChange={(e) => this.setState({use: e.target.value})}
                                                >
                                                    <FormControlLabel value="aesthetics" control={<Radio />} label="Aesthetics" />
                                                    <FormControlLabel value="data-vis" control={<Radio />} label="Data Visualisation" />
                                                    <FormControlLabel value="uncertain" control={<Radio />} label="Not sure" />
                                                    <FormControlLabel value="NA" control={<Radio />} label="Not applicable" />
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
                                                    row
                                                    aria-labelledby="continuous"
                                                    name="row-radio-buttons-group"
                                                    value={this.state.maptype}
                                                    onChange={(e) => this.setState({maptype: e.target.value})}
                                                >
                                                    <FormControlLabel value="continuous" control={<Radio />} label="Continuous" />
                                                    <FormControlLabel value="categorical" control={<Radio />} label="Categorical" />
                                                    <FormControlLabel value="both" control={<Radio />} label="Both" />
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
                                            <FormControlLabel value="NA" control={<Radio />} label="Not applicable/many" />
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
                                                    <div className="hint">(1=very easy, 5=very hard)</div>
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
        } else {
            document.title = "Login";
            return(
                <div>
                    {/* <MenuBar /> */}
                    <Login handleLogin={this.handleLogin} />
                </div>
            );
        }        
    }
}

export default Annotation;
