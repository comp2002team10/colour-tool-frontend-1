import React from 'react';
import './login.css';
import { Card, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        }
    }

    async login() {
        // await fetch("http://localhost:3000/annotation", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(this.username),
        // })
        // .catch(error => {
        //     window.alert(error);
        //     return;
        // });
    }

    render() {
        document.title = "Login";
        return (
            <div className="App">
                <Card>
                    <div className="loginbox">
                        <h3>Username</h3>
                        <TextField onChange={(e) => this.setState({username: e.target.value})}
                                id="outlined-basic" variant="outlined" />
                        <div className="loginbutton">
                            {this.state.username === "" ? (
                                <Button variant="contained" disabled>Log in</Button>
                            ) : (
                                <Link style={{ textDecoration:'none'}} to="/">
                                    <Button variant="contained" onClick={() => this.login()}>Log in</Button>
                                </Link>
                            )}
                        </div>
                    </div>  
                </Card>
            </div>
        )
    }
}

export default Login;
