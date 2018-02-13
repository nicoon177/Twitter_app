import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
    constructor() {
        super();
        this.state = {
            twits: [],
            name: ''
        }
    }

    componentDidMount() {
        fetch(`api/search?q=%23javascript`)
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(json => {
                this.setState({
                    twits: json.statuses,
                })
            })
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    render() {
        const { twits, name } = this.state;
        return (
            <div className='twits'>
                <div className='search-twit'>
                    <form action="">
                        <input className='search' type="text" placeholder='Enter search' onChange={this.handleNameChange}/>
                        <Link to={`/Search/${name}`}>
                            <input className='btn-search' type="submit" value='Search'/>
                        </Link>
                    </form>
                </div>
                <div>
                    {
                        twits.map(function (item) {
                            return (
                                <div className='twit' key={item.id}>
                                    <div className="header_twit">
                                        <div className="header-img">
                                            <img src={item.user.profile_image_url} alt='title'/>
                                        </div>
                                        <div className="header-content">
                                            <h4 className="header-name">
                                                {
                                                    <a href="">{item.user.name} <span>{item.user.screen_name}</span></a>
                                                }
                                                <span className='header-data'>{item.created_at}</span>
                                            </h4>
                                            <div className="twit_content">
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}

export default App;
