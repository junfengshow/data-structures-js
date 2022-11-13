import { createLogger } from 'redux-logger'
import 'antd/dist/antd.less';
import './global.css';

export const dva = {
  config: {
    onAction: createLogger(),
    onError (e: Error) {
      console.log(e)
    }
  }
}
