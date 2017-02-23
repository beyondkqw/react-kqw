import React, { Component,PropTypes } from 'react';

export default class ToWebView extends Component {

    render() {
        const {url} = this.props.location.query
        return (
            <div className="containerNav">
                <iframe src={url} frameborder="0" style={{width:'100%',height:'100%'}}></iframe>
            </div>
        );
    }
}
