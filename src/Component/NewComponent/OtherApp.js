import React, { Component } from 'react';
import QuickRouter from '../../Component/NewComponent/QuickRouter'
import '../../Stylesheets/App/homePage.css';
import {TagList} from '../../Action/auth'

export default class OtherApp extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tagItem:[]
        };
      }
    componentWillMount() {
        this.getTagList()
    }
    //首页导航栏
    async getTagList(){
        await TagList(this.props.type)
            .then(res=>{
                this.setState({tagItem:res.resultList})
            })
            .catch(err=>{
                console.warn('getHomeMoudle',err)
            })
    }
    render() {
        const {tagItem} = this.state
        return (
            <div className="oapp">
                <ul>
                    {
                        tagItem&&tagItem.map((el,index)=>{
                            return(
                                <QuickRouter
                                    routerName={el.name}
                                    routerUrl={el.img}
                                    routerPath={el.webLink}
                                />
                            )
                        })
                    }

                </ul>
            </div>
        );
    }
}
