//对所有的store进行整合
import LoginStore from './loginStore';
import CarStore from './carStore';

let loginStore = new LoginStore();
let carStore = new CarStore();

const stores = {
    loginStore,
    carStore
  };
  /// 默认导出接口
  export default stores;