import { observable,action} from "mobx";

class carStore {
  @observable count = Number(sessionStorage.getItem('shopnum'))=== null ? 0: Number(sessionStorage.getItem('shopnum'));

  @action setData =(data)=>{
    this.count++;
      let a = {...data}
      if( sessionStorage.getItem('shops') ==='' || sessionStorage.getItem('shops') === null) {
         sessionStorage.setItem("shops",JSON.stringify(a))
      }else{
        let b = {...data}
        let n = {
          ...JSON.parse(sessionStorage.getItem('shops')),
          ...b
        }
        sessionStorage.setItem("shops",JSON.stringify(n))
      } 
      sessionStorage.setItem("shopnum",this.count);
      // console.log(JSON.parse(sessionStorage.getItem('shops')))
  }
  
}

export default carStore;