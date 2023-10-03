interface ObjectPermission {
  id: number;
  screen: string;
}

interface ObjectEmployee {
  id: number;
  shop_name: string;
  name: string;
}

export interface typeLocalStorage {
  permissions: Array<ObjectPermission>;
  employee: ObjectEmployee;
}
