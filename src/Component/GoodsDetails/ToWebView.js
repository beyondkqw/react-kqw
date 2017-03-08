import React, { Component,PropTypes } from 'react';

export default class ToWebView extends Component {

    render() {
        const {LogCompany,LogNo} = this.props.location.query
        const LogUrl = `http://m.kuaidi100.com/index_all.html?type=[${LogCompany}]&postid=${LogNo}`
        return (
            <div>
                <iframe
                    src={LogUrl}
                    overflow='auto'
                    onLoad="$(this).css('height',$(this).contents().find('body')[0].scrollHeight)"
                    scrolling="yes"
                    style={{border:'none',width:'100%',height:'100%',position:'absolute',top:0,bottom:0}}>
                </iframe>
            </div>
        );
    }
}
