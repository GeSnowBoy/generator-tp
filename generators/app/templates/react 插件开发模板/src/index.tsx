import * as React from 'react';
import produce from 'immer';

export default function useStoreCreator<T extends Object>(initStore: T) {
  const UserContext = React.createContext({
    ...initStore,
    update: (fn: (state: T) => void) => {}
  });
  let store = {
    ...initStore,
    update: (fn: (state: T) => void) => {}
  };
  const Provider: React.FC<{}> = props => {
    const [state, setState] = React.useState(initStore);
    store = {
      ...state,
      update: (fn: (state: T) => void) => {
        setState(produce(state, fn));
      }
    };
    return (
      <UserContext.Provider value={store}>
        {props.children}
      </UserContext.Provider>
    );
  };
  function useStore() {
    return React.useContext(UserContext);
  }
  function getStore() {
    return store;
  }
  return {
    useStore,
    Provider,
    getStore
  };
}
