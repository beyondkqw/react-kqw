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

    onClick(index,id,name){
        const {onClick} = this.props
        this.setState({index:index})
        onClick&&onClick(index,id,name)
    }

    render(){
        const {contents,className} = this.props
        console.log('contents',contents);
        return(
            <div className="leftContainer">
                {
                    contents&&contents.map((el,index)=>{
                        return(
                            <div>
                                {
                                    (this.state.index==index)?
                                        <div
                                            className={"items"+' '+className+' '+'onfocus'}
                                            onClick={()=>this.onClick(index,el.id,el.name)}
                                        >
                                            {el.name}
                                        </div>
                                        :
                                        <div
                                            className={"items"+' '+className+' '+'onblur'}
                                            onClick={()=>this.onClick(index,el.id,el.name)}
                                        >
                                            {el.name}
                                        </div>
                                }
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
        color:'#666',
        height:40,
        padding:'5px 2px',
    },
    onfocus:{
        backgroundColor:'#ffddcc',
        color:'#ff5500',
        padding:'5px 2px',
        borderLeftWidth:3,
        borderLeftStyle:'solid',
        borderLeftColor:'#ff5500'
    }
}

