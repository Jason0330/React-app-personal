//对所有的store进行整合
import LoginStore from './loginStore';

let loginStore = new LoginStore()

const stores = {
    loginStore,
  };
  /// 默认导出接口
  export default stores;