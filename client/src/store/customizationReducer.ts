import config from "../config";
import * as actionTypes from "./actions";

import type { State } from "../App";

export const initialState: State = {
  customization: {
    themes: config.themes,
  },
};

export interface action {
  type: string;
  themes?: boolean;
}

const customizationReducer = (
  state = initialState.customization,
  action: action
) => {
  switch (action.type) {
    case actionTypes.SET_THEMES:
      if (action.themes === true) {
        config.name = "Như";
      } else if (action.themes === false) {
        config.name = "Bình";
      }
      return {
        themes: action.themes,
      };
    default:
      return state;
  }
};

export default customizationReducer;
