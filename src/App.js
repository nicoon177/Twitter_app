import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'javascript',
            twit: [],
        };
        this.handleNameChange  = this.handleNameChange.bind(this);
        this.searchTweets  = this.searchTweets.bind(this);
    }

    componentDidMount() {
        this.searchTweets();
    }


    handleNameChange(event) {
        this.setState({name: event.target.value});
    }


    searchTweets = () => {
        fetch(`/api/search?q=${this.state.name}`)
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(json => {
                this.setState({
                    twit: json.statuses,
                })
            });

    };


    render() {
        const {twit} = this.state;
        return (
            <div>
                <div className='search-twit'>
                    <form>
                        <input className='search' type="text" placeholder='Enter search' onChange={this.handleNameChange} />
                        <input className='btn-search' type="submit" value='Search' onClick={this.searchTweets} />
                    </form>
                </div>
                <div>
                    {
                        twit.map(function (item) {
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


export default withRouter(App);
