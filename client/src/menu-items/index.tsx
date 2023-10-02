import Demo from "./demo"

interface Object { name: string; path: string; icon: JSX.Element; }
interface ObjectGroup { name: string; path?: string; icon: JSX.Element; itemGropss: Array<Object> }
export interface PropsMenuList {
    items: {
        nameGroup?: string
        icon: JSX.Element;
        itemGroup?: Array<ObjectGroup>;
        itemNav?: Array<Object>;
        child?: boolean;
    }
}

const MenuList = {
    items: [...Demo]
}

export default MenuList