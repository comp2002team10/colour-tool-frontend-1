import React from 'react';
import './login.css';
import { Card, Button, MenuItem, InputLabel, Select, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';


const usernames = [
    "Bob Laramee",
    "Hyanggi Lee",
    "Jamie Vickers",
    "Luke Whitfield",
    "Nita Krasniqi",
    "Wenfei Qi",
    "Yizhan Huang",
    "Zhening Zhu",
    ];
    // Bob Laramee
    // Hyanggi Lee, psyhl8@nottingham.ac.uk,   (Admin Leader)
    // Wenfei Qi, scywq1@nottingham.ac.uk, 
    // Nita Krasniqi, psynk8@nottingham.ac.uk  (Team Leader)
    // Jamie Vickers, psyjv3@nottingham.ac.uk, 
    // Yizhan Huang,  scyyh11@nottingham.ac.uk, 
    // Luke Whitfield, psylw1@nottingham.ac.uk,  (Gitlab manager)
    // Zhening Zhu (Jenny), scyzz7@nottingham.ac.uk, 
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


    // handleChange = (event: SelectChangeEvent<typeof personName>) => {
    //     const {
    //       target: { value },
    //     } = event;
    //   }

    render() {
        document.title = "Login";
        return (
            <div className="App">
                <Card>
                    <div className="loginbox">
                        <FormControl sx={{ m: 1, width: 300 }}>
                            {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
                            <InputLabel>Username</InputLabel>
                            <Select
                                label="Username"
                                onChange={(e) => this.setState({username: e.target.value})}
                            >
                                {usernames.map((username) => (
                                    <MenuItem
                                        key={username}
                                        value={username}
                                        >
                                        {username}
                                    </MenuItem>
                                ))}
                            </Select>
                            <div className="loginbutton">
                                {this.state.username === "" ? (
                                    <Button variant="contained" disabled>Log in</Button>
                                ) : (
                                    <Link style={{ textDecoration:'none'}} to="/">
                                        <Button variant="contained" onClick={() => this.login()}>Log in</Button>
                                    </Link>
                                )}
                            </div>
                        </FormControl>
                    </div>  
                </Card>
            </div>
        )
    }
}

export default Login;
