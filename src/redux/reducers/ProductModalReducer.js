import { SET_MODAL, MOVE_MODAL } from "../types/ProductModalType";

const stateDefault = {
  value: null,
};

export const ProductModalReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_MODAL: {
      state.value = action.slug;
      return { ...state };
    }
    case MOVE_MODAL: {
      state.value = null;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};
