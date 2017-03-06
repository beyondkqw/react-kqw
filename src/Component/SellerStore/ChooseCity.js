import React, { Component,PropTypes } from 'react';
import Search from '../../Component/NewComponent/Search'

export default class ChooseCity extends Component {
    render() {
        return (
            <div className="containerNav">
                <Search
                    style={{backgroundColor:'#ff5500'}}
                    location = {true}
                    onClick={(value)=>this.searchStore(value)}
                />
            </div>
        );
    }
}
