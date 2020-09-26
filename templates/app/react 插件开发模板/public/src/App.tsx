import React from 'react';

import { useStore, getStore, Provider, PeopleModel } from './store';
const ChangeCard: React.FC = () => {
  let store = useStore();
  return (
    <div>
      修改姓名:
      <input
        type="text"
        value={store.people.name}
        onChange={e => {
          store.update(state => {
            state.people.name = e.target.value;
          });
        }}
      />
    </div>
  );
};
const People: React.FC<{
  people: PeopleModel;
}> = props => {
  return (
    <ul>
      <li>姓名:{props.people.name}</li>
      <li>年龄:{props.people.age}</li>
      <li>性别:{props.people.gender == 1 ? '女' : '男'}</li>
    </ul>
  );
};
export const ShowWrap: React.FC = () => {
  let store = useStore();
  return <People people={store.people} />;
};
export const App: React.FC = () => {
  return (
    <Provider>
      <ShowWrap />
      <ChangeCard />
      <button
        onClick={() => {
          getStore().update(state => {
            state.people.age = Math.random();
            state.people.name = '你比好';
          });
        }}
      >
        在js中直接写
      </button>
    </Provider>
  );
};
