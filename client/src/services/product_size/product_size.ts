import axios from "axios";

export interface PropsGetProductSize {
  shop_id?: number;
}

export interface PropsDeleteProductSize {
  id: number;
}

export interface Size {
  name: string;
  code?: string;
  describe: string;
  notes: string;
  id?: number | string;
  product_type_id?: number;
  shop_id?: number;
  status?: string;
}
export interface PropsCreateProductSize {
  product_sizes: object;
}

export interface PropsUpdateProductSize {
  product_sizes: {
    addNew?: Size[];
    update?: Size[];
  };
}

// export interface PropsUpdateProductSize extends PropsCreateProductSize {
//   id: number;
// }

const productSize = {
  getList: function (params: PropsGetProductSize) {
    return axios.get("/product_size/list", { params });
  },

  create: function (body: PropsCreateProductSize) {
    return axios.post("/product_size/create", body);
  },

  update: function (body: PropsUpdateProductSize) {
    return axios.post("/product_size/update", body);
  },

  delete: function (body: PropsDeleteProductSize) {
    return axios.post("/product_size/delete", body);
  },
};

export default productSize;
