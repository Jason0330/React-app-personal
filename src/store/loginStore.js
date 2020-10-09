import { observable,action} from "mobx";

class loginStore {
  @observable isLogin = sessionStorage.getItem('isLogin') === 'true'?true:false;
  @action setUser =()=>{
    this.isLogin = true
    sessionStorage.setItem('isLogin','true')
  }
  @action outLog =()=>{
    this.isLogin = false
    sessionStorage.setItem('isLogin','false')
  }
  @action saveInfo =(info)=>{
    sessionStorage.setItem('userinfo',info)
  }
}

export default loginStore;