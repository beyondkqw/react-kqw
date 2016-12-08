import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class AboutDemo extends Component {
    render() {
        return (
            <div>
                <div className="navbanner tc">
                    <div className="imglogo border-ra"><img src={require('../../Images/wx.png')}/></div>
                    <span className="di color_white">聚朵云 1.0.1</span>
                </div>
                <h4 className="tc aboutjdy">关于聚朵云</h4>
                <p className="pl1">
                    聚朵云是基于井田商学院研发的一款APP，旨在为中小企业提供更加便捷高效的企业咨询管理服务。
                    井田商学院是中国乃至世界首家由成功企业家担任教学导师和事业导师的商学院，其召集近百位通中国、
                    通理论、通实践的企业精英参与课程研发，遵循实战检验原则，拒绝任何空洞的理论说教，力求为企业决策层提供最有效的决策依据，秉承“帮助中小企业成就基业”的理念，
                    不断创新，与时俱进，因应时势和社会变革，致力打造引领中国企业创新和商业模式变革的精品课程品牌。学院的教学融合企业经营管理实践与东方人文修养，在提供企业家事业成
                    长平台的同时，也促进企业家的人生修炼不断升华。中华民族的复兴之梦——中国梦，在召唤具有东方特色的原创管理思想和企业家教育新模式。理想之灯，照亮我们奔跑的前程。
                </p>
            </div>
        );
    }
}
