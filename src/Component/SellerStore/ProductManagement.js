import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/personal.css';

export default class ProductManagement extends Component {
    render() {
        return (
            <div className="containerNav">
                <div className="clearAll">
                    <CellComponent
                        className={'border_right'}
                        imgUrl={require('../../Images/total.png')}
                        title={'评价管理'}
                        describing={''}
                        link={'/remarkManage'}
                    />
                    <CellComponent
                        imgUrl={require('../../Images/payment.png')}
                        title={'出售中的宝贝'}
                        describing={'30件'}
                        link={'/onSale'}
                    />
                    <Link to="/mineOffDown" query={{storeId:this.props.location.query.storeId}}>
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/diary.png')}
                            title={'自己下架宝贝'}
                            describing={'充值云卡通的记录'}
                        />
                    </Link>

                </div>
            </div>
        );
    }
}
