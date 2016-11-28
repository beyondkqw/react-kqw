import React, { Component } from 'react';
import LeftImg from '../../Component/NewComponent/LeftImg'
import RightImg from '../../Component/NewComponent/RightImg'
import '../../Stylesheets/App/homePage.css';

//
//const imgUrl = [{imgUrl:require('../../Images/leftVoucher.png')},
//    {imgUrl:require('../../Images/rightTop.png')},{imgUrl:require('../../Images/rightBottom.png')}]
export default class Cell_3 extends Component {
    render() {

        const {imgUrl} = this.props

        return (
            <div className="voucherNav border_top border_bottom">
                <div className="width_50 fl height_all border_right tc pr">
                    <LeftImg
                        imgPath = {imgUrl[0].img}
                    />
                </div>
                <div className="width_50 fl height_all">
                    <div className="border_bottom halfHeight tc pr">
                      <RightImg
                          imgPath = {imgUrl[1].img}
                      />
                    </div>
                    <div className="tc halfHeight pr">
                        <RightImg
                            imgPath = {imgUrl[2].img}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
