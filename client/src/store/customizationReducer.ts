import config from "../config";
import * as actionTypes from "./actions";

import type { State } from "../App";

export const initialState: State = {
  customization: {
    themes: config.themes,
    fontFamily: config.fontFamily,
  },
};

export interface action {
  type: string;
  themes?: boolean;
  fontFamily?: string;
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
        ...state,
        themes: action.themes,
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily,
      };
    default:
      return state;
  }
};

export default customizationReducer;
