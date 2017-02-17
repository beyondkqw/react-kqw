/**
 * Created by Administrator on 2017/2/6.
 */


import React, { Component } from 'react';

export default class NavBar extends Component {
    render() {
        const {title,renderBack} = this.props
        return (
            <div>
                <div
                    style={{height:45,backgroundColor:'#ff5500',top:0}}
                    className="width100  flex flex-align-center flex-pack-center pf"
                >
                    {
                        renderBack?
                            <div
                                className="pa"
                                onClick={()=>window.history.go(-1)}
                                style={{
                                lineHeight:0,
                                width:9,
                                height:16,
                                left:10,
                                top:14,
                            }}
                            >
                                <img
                                    src={require("../../Images/common/renderBack.png")}
                                />
                            </div>
                            :null
                    }

                    <span style={{color:'#fff',fontSize:16}}>{title}</span>
                </div>
                <div style={{height:45}}>

                </div>
            </div>

        );
    }
}