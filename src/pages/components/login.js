import React, { useState } from 'react';
import './login.css';
import { Card, Button, MenuItem, InputLabel, Select, FormControl } from '@mui/material';

export default function Login({handleLogin}) {
    // const usernames = [
    //     "Bob Laramee",
    //     "Hyanggi Lee",
    //     "Jamie Vickers",
    //     "Luke Whitfield",
    //     "Nita Krasniqi",
    //     "Wenfei Qi",
    //     "Yizhan Huang",
    //     "Zhening Zhu",
    // ];

    const usernames = [
        "RL",
        "HL",
        "JV",
        "LW",
        "NK",
        "WQ",
        "YH",
        "ZZ",
    ];

    const [user, setUser] = useState();

        return (
            <div className="App">
                <Card>
                    <div className="loginbox">
                        <FormControl sx={{ m: 1, width: 300 }}>
                            {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
                            <InputLabel>Username</InputLabel>
                            <Select
                                label="Username"
                                onChange={(e) => setUser(e.target.value)}
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
                                {user === undefined || "" ? (
                                    <Button variant="contained" disabled>Log in</Button>
                                ) : (
                                    // <Link style={{ textDecoration:'none'}} to="/">
                                        <Button variant="contained" onClick={() => handleLogin(user) }>Log in</Button>
                                    // </Link>
                                )}
                            </div>
                        </FormControl>
                    </div>  
                </Card>
            </div>
        )
}