import React, {Component} from 'react';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.name,
            twit: [],

        }
    }

    componentDidMount() {
        fetch(`/api/search?q=${this.state.name}`)
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(json => {
                this.setState({
                    twit: json.statuses,
                })
            })
    }


    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    render() {
        const {twit} = this.state;
        return (
            <div>
                <div className='search-twit'>
                    <form>
                        <input className='search' type="text" placeholder='Enter search' onChange={this.handleNameChange} />
                        <input className='btn-search' type="submit" value='Search' />
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


export default Search;