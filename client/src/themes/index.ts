import { colors, createTheme } from "@mui/material";

import themePalette from "./palette";
import typography from "./typography";
import type { paletteTS } from "./palette";

export interface Props {
  darkMode?: boolean;
  fontFamily?: string;
}

const theme = ({ darkMode, fontFamily }: Props) => {
  //nội dung cần đổi (vd màu của header)
  const palette: paletteTS = themePalette({ darkMode });

  const themes = createTheme({
    // những gì thay đổi mới chỉnh sửa trong đây
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    colors: {
      color_header: palette.colors?.color_header,
      binh: palette.colors?.binh,
    },
    //ghi chú để đây khi nào cần đến, nếu muốn tạo thêm object nằm ở ngoài này
    khoitaonew: {
      binh_new: colors.orange[500],
    },
    // thay đổi font-family thì vào đây??? :))
    typography: typography({ fontFamily }),
  });

  return themes;
};

export default theme;
