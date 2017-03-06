import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import PublishComment from '../../Component/CommonComponent/PublishComment'
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';
import {_OrderDetail,Remark} from '../../Action/auth'
import DelayModal from '../../Component/CommonComponent/DelayModal'
import UUID from 'uuid-js'

export default class PublishEvalute extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modalDelay:false,
            images:[],
            imageUri:require('../../Images/camera.png'),
            Mosaic:'http://jdy-images.oss-cn-shenzhen.aliyuncs.com/',
            uploadImg:''
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }


    componentWillMount() {
        //this.getOrderDetail()
    }

    //async getOrderDetail(){
    //    await _OrderDetail(this.props.location.query.id)
    //    .then(res=>{
    //        console.log('ererer',res)
    //    })
    //}

    //上传图片
    fileChange (e){
        var client = new OSS.Wrapper({
            region: 'oss-cn-shenzhen',
            accessKeyId: 'LTAIbrSAT1OgIEDo',
            accessKeySecret: 'rOI5hYbqCTy3B2sb6Zbt77Is9h34XS',
            bucket: "jdy-images"
        });

        var file = e.target.files[0];
        var fileName = window.URL.createObjectURL(file)
        var index1=file.name.lastIndexOf(".");
        var index2=file.name.length;
        var suffix=file.name.substring(index1,index2)

        var uuid4 = UUID.create().toString();
        console.log(uuid4.toString());
        var storeAs = 'sq/'+uuid4+''+suffix;
        this.setState({modalDelay:true})

        client.multipartUpload(storeAs, file).then((result)=> {
            this.setState({modalDelay:false})
            this.setState({imageUri:fileName,uploadImg:storeAs})
        }).catch(function (err) {
            console.log(err);
        })
    }

    async toRemark(){
        const {orderNo,productId} = this.props.location.query
        let {uploadImg,Mosaic} = this.state
        uploadImg = Mosaic + uploadImg
        await Remark(orderNo,productId,this.refs.comment.value,uploadImg)
        .then(res=>{
            alert('评论成功')
            this.context.router.goBack()
        })
    }

    render() {
        const {image} = this.props.location.query
        return (
            <div className="containerNav">
                <div className="df plAll">
                    <div className="logoHeight">
                        <img className="border_ra" src={image?image:require('../../Images/storeClothes.png')} alt=""/>
                    </div>
                    <div className="flex1 ml5 font14 color6 height3">
                        <textarea
                            className="height_all borderno"
                            name=""
                            placeholder="评价一下吧。。。"
                            cols="30"
                            rows="10"
                            ref = 'comment'
                        />
                    </div>
                </div>
                <div className=" border_bottom">
                    <div className="filediv tc mt5 plAll">
                        <input
                            ref="images"
                            type="file"
                            name=""
                            multiple="multiple"
                            onChange={(e)=>this.fileChange(e)}
                        />
                        <img className="border_ra uploadImg" src={this.state.imageUri}/>
                    </div>
                </div>
                <SplitLine/>
                {/*<Link to="/orderList/chaseRatings"> </Link>*/}
                <PublishComment
                    onClick = {()=>this.toRemark()}
                />
            </div>
        );
    }
}
