import Dashboard from "./dashboard"
import Product from "./product"

interface Object { name: string; path: string; icon: JSX.Element; }
interface ObjectGroup { name: string; path?: string; icon: JSX.Element; itemGropss: Array<Object> }
export interface PropsMenuList {
    items: {
        nameGroup: string
        itemGroup: Array<ObjectGroup>;
        itemNav: Array<Object>;
    }
}

export interface PropsMenuItem {
    nameGroup: string;
    itemNav: Array<Object>;
    itemGroup: Array<ObjectGroup>;
}

const MenuList = {
    items: [Dashboard, Product]
}

export default MenuList