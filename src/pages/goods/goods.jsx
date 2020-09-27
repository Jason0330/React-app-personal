
import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import './goods.scss'

class goods extends Component {

  state = {
    data: [],
    outdata: {},
    id:''
  }

  UNSAFE_componentWillMount() {
    let id = this.props.match.params.e
    this.setState({id:id})
  }

  transData=(val)=>{
    this.setState({data:val.prodatas,outdata:val.outdata})
  }

  toDetail=(id,proid)=>{
    this.props.history.push(`/goodDetail/${id}/${proid}`)
  }

  render() {
    return (
      <div>
        <Header title={this.state.outdata.eventName} id={this.state.id} moveDate={this.transData}/>
        <div className="outside">
          {
          this.state.data.map(item => (
            <div key={item.productId} className="goodsbox" onClick={()=>this.toDetail(this.state.id,item.productId)}>
              <img src={item.imageUrl} alt="" className="goodimg" />
              <p className="new">当季新品</p>
              <p className="goodsname">{item.brandName}</p>
              <p className="overtext">{item.productName}</p>
              <div className="price">
                <p className="pricename">¥{item.price}</p>
              <p>{item.discount}折</p>
              </div>
            </div>
          ))
        }
        </div> 
      </div>
    )
  }
}

export default goods;