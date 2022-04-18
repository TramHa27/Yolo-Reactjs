import { SET_MODAL, MOVE_MODAL } from "../types/ProductModalType.js";

export const setModalAction = (slug) => {
  return {
    type: SET_MODAL,
    slug,
  };
};

export const moveModalAction = () => {
  return {
    type: MOVE_MODAL,
  };
};
