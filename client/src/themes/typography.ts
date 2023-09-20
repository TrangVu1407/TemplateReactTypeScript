import type { Props } from "./index";

export default function themeTypography({ fontFamily }: Props) {
  let fontFamilyNew = `'${fontFamily}', sans-serif`;
  return {
    fontFamily: fontFamilyNew,
  };
}
