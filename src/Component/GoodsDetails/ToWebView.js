import React, { Component,PropTypes } from 'react';

export default class ToWebView extends Component {

    render() {
        const {url} = this.props.location.query
        return (
            <div className="containerNav">
                <iframe
                    src={url}
                    overflow='auto'
                    onLoad="$(this).css('height',$(this).contents().find('body')[0].scrollHeight)"
                    scrolling="yes"
                    style={{border:'none',width:'100%',height:'100%',position:'absolute',top:0,bottom:0}}>
                </iframe>
            </div>
        );
    }
}
