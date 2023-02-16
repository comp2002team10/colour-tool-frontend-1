import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Annotation from './pages/annotation';

class App extends React.Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route exact path = "/" element = {<Annotation />} />
                </Routes>
            </div>
        )
    }
}

export default App;
