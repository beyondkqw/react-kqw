/**
 * Created by asus on 2016/11/23.
 */
import React, { Component,StyleSheet} from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';

export default class TabBarColumn extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            index:0
        };
      }

    async componentWillMount() {
        const {index} = this.props
        await this.setState({index:index?index:0})
    }

    onClick(index){
        const {onClick} = this.props
        this.setState({index:index})
        onClick&&onClick(index)
    }

    render(){
        const {contents,className} = this.props
        return(
            <div className="leftContainer">
                {
                    contents&&contents.map((el,index)=>{
                        return(
                            <div
                                className={"items"+' '+className}
                                onClick={()=>this.onClick(index)}
                                style={this.state.index==index?styles.onfocus:styles.onblur}
                            >
                                {el}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

const styles = {
    onblur:{
        display:'flex',
        alignItems:'center',
        color:'#666',
        height:40,
        paddingLeft:5
    },
    onfocus:{
        display:'flex',
        backgroundColor:'#ffddcc',
        alignItems:'center',
        color:'#ff5500',
        height:40,
        paddingRight:3,
        paddingLeft:2,
        borderLeftWidth:3,
        borderLeftStyle:'solid',
        borderLeftColor:'#ff5500'
    }
}

