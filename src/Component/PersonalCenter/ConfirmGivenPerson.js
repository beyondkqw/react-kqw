import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import Search from '../../Component/NewComponent/Search';
import LiItem from '../../Component/CommonComponent/LiItem'
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';


export default class ConfirmGivenPerson extends Component {

    static contextTypes = {
        router:PropTypes.object
    }

    getInformation(){
        this.context.router.push({pathname:'/personalCenter/commisionGiving',query:{toChange:true}})
    }

    render() {
        return (
            <div className="containerNav">
                <Search
                    toChange = {true}
                    style={{backgroundColor:'#fff',borderBottom:'1px solid #e5e5e5'}}
                />
                <SplitLine />
                <div className ="list-block m0 font14">
                    <LiItem
                        title={'聚朵云的天堂'}
                        imgUrl={require('../../Images/headerImg.jpg')}
                        name={''}
                        isShow={false}
                        onClick={()=>this.getInformation()}
                    />
                </div>
            </div>
        );
    }
}
