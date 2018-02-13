import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';
import Search from './Search';


class Routered extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={App}/>
                        <Route path="/Search/:name" component={Search}/>
                    </div>
                </BrowserRouter>
            </div>

        );
    }
}

export default Routered;
