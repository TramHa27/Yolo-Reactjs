import { applyMiddleware, combineReducers, createStore } from "redux";
//Cấu hình middlewrare (Để có thể dispatch redux 1 action là function)
import { ProductModalReducer } from "./reducers/ProductModalReducer";
import { ShoppingCartReducer } from "./reducers/ShoppingCartReducer";
import thunk from "redux-thunk";
const rootReducer = combineReducers({
  //Khai báo reducer
  ProductModalReducer,
  ShoppingCartReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
