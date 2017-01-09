import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/order.css';
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import {SellerProductList} from '../../Action/auth';

export default class RemarkManage extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            sellerGoodsList:''
        };
      }
    componentWillMount() {
        this.getSellerOrder()
    }

    //请求列表接口
    async getSellerOrder(){
        await SellerProductList('','')
            .then(res=>{
                this.setState({sellerGoodsList:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }
    render() {
        const {sellerGoodsList} = this.state
        return (
            <div className="containerNav">
                {
                    sellerGoodsList == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'列表是空的哦~'}
                        />
                        :
                    sellerGoodsList&&sellerGoodsList.map(el=>{
                        return(
                                <Link
                                    to="/evaluationDetails"
                                    query={{imgUrl:el.IMAGE,name:el.NAME,price:el.CURRENT_PRICE,comment:el.COMMENT_COUNT}}
                                >
                                    <StoreRow
                                        title = {el.NAME}
                                        price = {el.CURRENT_PRICE}
                                        imgurl = {el.IMAGE}
                                        peopleRemark = {el.COMMENT_COUNT}
                                        assess = {true}
                                    />
                                </Link>
                        )

                    })
                }

            </div>
        );
    }
}
