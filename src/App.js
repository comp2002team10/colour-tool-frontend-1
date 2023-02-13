import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Annotation from './pages/annotation';
import Login from './pages/login';

class App extends React.Component {
    render() {
        document.title = "Figure Viewer";
        return (
            <div>
                <Routes>
                    <Route exact path = "/" element = {<Annotation />} />
                    <Route exact path = "/login" element = {<Login />} />
                </Routes>
            </div>
        )
    }
}

export default App;
