import './index.scss';

import * as React from 'react';



const initState = {};
const initProps = {};
type P = typeof initProps;
type S = typeof initState;

export  class  <%= dirName %> extends React.Component<P, S> {
  state = initState;
  static defaultProps = initProps;
  
  render() {
   
    return <div className="<%= dirName %>">
         <%= dirName %>
       </div>
  }
}
