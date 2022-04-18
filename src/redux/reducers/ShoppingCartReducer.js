import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../types/ShoppingCartType";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const stateDefault = {
  value: items,
};

export const ShoppingCartReducer = (state = stateDefault, action) => {
  const findItem = (arr, item) =>
    arr.filter(
      (e) =>
        e.slug === item.slug && e.color === item.color && e.size === item.size
    );

  const delItem = (arr, item) =>
    arr.filter(
      (e) =>
        e.slug !== item.slug || e.color !== item.color || e.size !== item.size
    );

  const sortItem = (arr) =>
    arr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

  switch (action.type) {
    case ADD_ITEM: {
      const newItem = action.newItem;
      const duplicate = findItem(state.value, newItem);
      if (duplicate.length > 0) {
        state.value = delItem(state.value, newItem);
        state.value = [
          ...state.value,
          {
            ...newItem,
            id: duplicate[0].id,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...newItem,
            id:
              state.value.length > 0
                ? state.value[state.value.length - 1].id + 1
                : 1,
          },
        ];
      }
      localStorage.setItem("cartItems", JSON.stringify(sortItem(state.value)));
      return { ...state };
    }

    case UPDATE_ITEM: {
      const itemUpdate = action.itemUpdate;

      const item = findItem(state.value, itemUpdate);

      if (item.length > 0) {
        state.value = delItem(state.value, itemUpdate);
        state.value = [
          ...state.value,
          {
            ...itemUpdate,
            id: item[0].id,
          },
        ];
        localStorage.setItem(
          "cartItems",
          JSON.stringify(sortItem(state.value))
        );
      }
      return { ...state };
    }

    case DELETE_ITEM: {
      const item = action.item;
      state.value = delItem(state.value, item);
      localStorage.setItem("cartItems", JSON.stringify(sortItem(state.value)));
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
