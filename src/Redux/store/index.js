// store: 整个数据的仓库，负责关联 reducer 和 action，通过 store 对象可以给 reducer 分配 action
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
const store = createStore(reducer, applyMiddleware(thunk))
export default store
