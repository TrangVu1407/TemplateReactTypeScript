import Demo from "./demo"
import dashboard from "./dashboard"

interface Object { name: string; path: string; icon: JSX.Element; }
interface ObjectGroup { name: string; path?: string; icon: JSX.Element; itemGropss: Array<Object> }
export interface PropsMenuList {
    items: {
        nameGroup?: string
        itemGroup?: Array<ObjectGroup>;
        itemNav?: Array<Object>;
    }
}

const MenuList = {
    items: [...dashboard, ...Demo]
}

export default MenuList