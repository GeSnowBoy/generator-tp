# `useStoreCreator`文档

> 简介: 基于 react hooks 写的极简数据管理 hooks. 总共不到 40 行代码,有 typescript 类型提示, 简单易用,0 学习成本.功能强大.

### 快速使用

```
/* 文件 useStore.tsx */
// 引入hooks
import useStoreCreater from './useStoreCreater';
// store的初始值
let initStore = {
 name:'测试',
 age:38
};
// 初始化
let { Provider, useStore, getStore } = useStoreCreater(initStore);
// 导出
export { useStore, Provider, getStore };
```

---

```
// 引入useStore
import {useStore,Provider} from '../useStore';
const CreateCode: React.FC = () => {

  let store = useStore();
  // 使用  Provider 包裹住 (一般只在应用的顶级组件包裹一次)
   return (
    <Provider>
        <div
          onClick={() => {
            //  store 更新用 update方法
            store.update(state => {
              state.name = '其他名字';
            });
          }}
        >
          {store.name}
        </div>
     </Provider>
  );
```

### API 详解

| API                                 | 说明         | 参数                               | 返回值                             |
| ----------------------------------- | ------------ | ---------------------------------- | ---------------------------------- |
| `useStoreCreator(initStore:object)` | 生成数据仓库 | initStore: 对象类型,初始化仓库的值 | `{ useStore, Provider, getStore }` |

| 返回值   | 说明                                        | 使用                                                                       |
| -------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| useStore | React hooks                                 | `let store = useStore();` 返回 store 对象. 通过 `store.update`方法更新数据 |
| Provider | 使用 useStore 需要用 Provider 包裹,提供数据 | `<Provider>{props.children}</Provider>`                                    |
| getStore | 同 useSotre,直接在 js 中使用                | 同 useSotre,直接在 js 中使用                                               |

> store.update 更新数据
> 参数值 : fn:(state:Store)=>void  
> 使用 :在回调 fn 函数里面直接修改 store 的值
> 例子: `store.update(state=>{state.name = '其他值'})`
