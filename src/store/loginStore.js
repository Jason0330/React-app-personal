import { observable,action} from "mobx";

class loginStore {
  @observable isLogin = false;
  @action setUser =()=>{
    this.isLogin = true
  }
  @action outLog =()=>{
    this.isLogin = false
  }
}

export default loginStore;