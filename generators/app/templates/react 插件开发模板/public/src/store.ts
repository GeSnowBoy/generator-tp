import useStoreCreator from '../../lib/index.min';

let initStore = {
  people: { name: 'jessica', age: 12, gender: 1 }
};
export type PeopleModel = typeof initStore['people'];
let { Provider, useStore, getStore } = useStoreCreator(initStore);
export { Provider, useStore, getStore };
