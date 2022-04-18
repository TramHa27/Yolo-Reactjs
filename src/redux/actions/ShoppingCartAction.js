import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../types/ShoppingCartType";

export const addItem = (newItem) => {
  return {
    type: ADD_ITEM,
    newItem,
  };
};

export const updateItem = (itemUpdate) => {
  return {
    type: UPDATE_ITEM,
    itemUpdate,
  };
};

export const deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    item,
  };
};
