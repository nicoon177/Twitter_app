import React, {Component} from 'react';



class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: props.match.params.name,
            twits: {}
        }
    }

    componentDidMount() {
        fetch(`api/search?q=${this.state.name}`)
            .then(response => response.json())
            // .then(json => console.log(json))
            .then(json => {
                this.setState({
                    twits: json.statuses,
                })
            })
    }



    render() {
        return (
            <div>
                <h2>the page serched. Name = {this.state.name}</h2>
            </div>
        )
    }



}


export default Search;