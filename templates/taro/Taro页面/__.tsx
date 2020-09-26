import './<%= dirName %>.scss';


import { Image, Text, View } from '@tarojs/components';
import Taro, { Config } from '@tarojs/taro';

import { WithLogin } from '../../utils/decorator';

interface P {
}
interface S {
}

@WithLogin('didShow')
export default class  extends Taro.Component<P, S> {
  constructor(props:P) {
    super(props);
    this.state = {

    }
  }
  config: Config = {
    navigationBarTitleText: '<%= dirName %>-page'
  };

  render() {
    return <View className="<%= dirName %>">
      <%= dirName %>
    </View>
  }
}
