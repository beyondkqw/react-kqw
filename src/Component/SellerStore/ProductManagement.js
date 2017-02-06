import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/personal.css';
import NavBar from '../../Component/CommonComponent/NavBar'

export default class ProductManagement extends Component {
    render() {
        return (
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'产品管理'}
                />
                <div className="clearAll">
                    <CellComponent
                        className={'border_right'}
                        imgUrl={require('../../Images/common/EvaluationManagement.png')}
                        title={'评价管理'}
                        describing={''}
                        link={'/remarkManage'}
                    />
                    <Link to="/onSale" query={{storeId:this.props.location.query.storeId}}>
                        <CellComponent
                            imgUrl={require('../../Images/common/saleGoods.png')}
                            title={'出售中的宝贝'}
                            describing={'30件'}
                        />
                    </Link>
                    <Link to="/mineOffDown" query={{storeId:this.props.location.query.storeId}}>
                        <CellComponent
                            className={'border_right'}
                            imgUrl={require('../../Images/common/offTheShelf.png')}
                            title={'自己下架宝贝'}
                            //describing={'充值云卡通的记录'}
                        />
                    </Link>

                </div>
            </div>
        );
    }
}
