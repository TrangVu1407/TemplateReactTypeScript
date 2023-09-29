import { libraryColors } from "../assets/libraryColors";
import type { Props } from "./index";
declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      color_header: string | undefined;
      binh: string | undefined;
      backgroundColor: string | undefined;
      background: string | undefined;
    };

    khoitaonew: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      color_header: string | undefined;
      binh: string | undefined;
      backgroundColor: string | undefined;
      background: string | undefined;
    };

    khoitaonew?: {
      binh_new?: string;
    };
  }

  // khởi tạo biến mới ở paletee dùng cách này
  interface PaletteOptions {}
}

export interface paletteTS {
  mode: string;
  colors?: {
    color_header: string;
    binh: string;
    backgroundColor: string;
    background: string;
  };
}

export default function themePalette({ darkMode }: Props) {
  // if(darkMode==="dark") lấy giá trị mặc định được tạo do viết theo Typescript, nên bắt nuộc phải có return. nếu không màn hình giọi nó không chịu hiểu
  // màu sáng
  let paletts: paletteTS = {
    // nền đen
    mode: "dark",
    colors: {
      binh: libraryColors.red,
      color_header: libraryColors.pink400,
      background: libraryColors.color121212,
      backgroundColor: libraryColors.colorWhite,
    },
  };

  if (darkMode === false) {
    // nền sáng!!!
    paletts.mode = "light";
    paletts.colors = {
      binh: libraryColors.white,
      color_header: libraryColors.cyan500,
      background: libraryColors.colorWhite,
      backgroundColor: libraryColors.color121212,
    };
  }

  return paletts;
}
