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
        this.onClick(index);
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
    onblur:{
        display:'flex',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        color:'#666',
        fontSize:14,
        height:40
    },
    onfocus:{
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
        borderBottomColor:'#ff5500',
        fontSize:14
    }
}

