/**
 * Created by asus on 2016/11/23.
 */
import React, { Component,StyleSheet} from 'react';
import '../../Stylesheets/App/homePage.css';
import {Link} from 'react-router';

export default class TabBar extends Component {

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
        const {contents} = this.props
        return(
            <div className="tabBarContainer">
                {
                    contents&&contents.map((el,index)=>{
                        return(
                            <div
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
    onfocus:{
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        color:'#666',
        height:40
    },
    onblur:{
        display:'flex',
        flex:1,
        backgroundColor:'#ffddcc',
        justifyContent:'center',
        alignItems:'center',
        color:'#ff5500',
        height:40,
        paddingTop:3,
        borderBottomWidth:3,
        borderBottomStyle:'solid',
        borderBottomColor:'#ff5500'
    }
}

