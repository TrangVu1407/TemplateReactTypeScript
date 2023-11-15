import axios from "axios";

export interface PropsGetProductSize {
  shop_id?: number;
}

export interface PropsDeleteProductSize {
  id: number;
}

export interface PropsCreateProductSize {
  product_type_id: number;
  shop_id: number;
  name: string;
  code?: string;
  describe: string;
  notes: string;
}

export interface PropsUpdateProductSize extends PropsCreateProductSize {
  id: number;
}

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
