import axios from "axios";

export interface PropsGetProductType {
  shop_id?: number;
}

export interface PropsDeleteProductType {
  id: number;
}

export interface PropsCreateProductType {
  shop_id: number;
  name: string;
  code?: string;
  describe: string;
  notes: string;
}

export interface PropsUpdateProductType extends PropsCreateProductType {
  id: number;
}

const productType = {
  getList: function (params: PropsGetProductType) {
    return axios.get("/product_type/list", { params });
  },

  create: function (body: PropsCreateProductType) {
    return axios.post("/product_type/create", body);
  },

  update: function (body: PropsUpdateProductType) {
    return axios.post("/product_type/update", body);
  },

  delete: function (body: PropsDeleteProductType) {
    return axios.post("/product_type/delete", body);
  },
};

export default productType;
