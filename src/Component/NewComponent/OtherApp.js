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
        await TagList(1)
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
                    <li>
                        <div className="app_icon">
                            <img  src={require('../../Images/fresh.png')}/>
                        </div>
                        <span>生鲜</span>
                    </li>
                    <li>
                        <div className="app_icon">
                            <img  src={require('../../Images/fruit.png')}/>
                        </div>
                        <span>蔬果</span>
                    </li>
                    <li>
                        <div className="app_icon">
                            <img  src={require('../../Images/egg.png')}/>
                        </div>
                        <span>禽蛋</span>
                    </li>
                    <li>
                        <div className="app_icon">
                            <img  src={require('../../Images/meat.png')}/>
                        </div>
                        <span>肉类</span>
                    </li>
                    {/*{
                        tagItem&&tagItem.map((el,index)=>{
                            return(
                                <QuickRouter
                                    routerName={el.name}
                                    routerUrl={el.img}
                                    routerPath={el.webLink}
                                />
                            )
                        })
                    }*/}

                </ul>
            </div>
        );
    }
}
