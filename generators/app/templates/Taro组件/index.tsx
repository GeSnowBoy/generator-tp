import './index.scss';

import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';



const initState = {};
const initProps = {};
type P = typeof initProps;
type S = typeof initState;

export  class  <%= dirName %> extends Taro.Component<P, S> {
  state = initState;
  static defaultProps = initProps;
  
  render() {
   
    return <View className="wrap">
         <%= dirName %>
       </View>
  }
}
