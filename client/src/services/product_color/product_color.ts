import axios from "axios";

export interface PropsGetProductColor {
  shop_id?: number;
  product_type_id?: number;
}

export interface PropsDeleteProductColor {
  id: number;
}

export interface PropsCreateProductColor {
  shop_id: number;
  product_type_id: number;
  name: string;
  code?: string;
  describe: string;
  notes: string;
}

export interface PropsUpdateProductColor extends PropsCreateProductColor {
  id: number;
}

const productType = {
  getList: function (params: PropsGetProductColor) {
    return axios.get("/product_color/list", { params });
  },

  create: function (body: PropsCreateProductColor) {
    return axios.post("/product_color/create", body);
  },

  update: function (body: PropsUpdateProductColor) {
    return axios.post("/product_color/update", body);
  },

  delete: function (body: PropsDeleteProductColor) {
    return axios.post("/product_color/delete", body);
  },
};

export default productType;
