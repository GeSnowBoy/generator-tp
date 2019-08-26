import './index.scss';

import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';


interface P {
  
}

interface S {
  
}

export default class  <%= dirName %> extends Taro.Component<P, S> {
  constructor(props:P) {
    super(props);
    this.state = {
      
    };
  }
  
  render() {
   
    return <View className="<%= dirName %>">
         <%= dirName %>
       </View>
  }
}
