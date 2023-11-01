import axios from "axios";

export interface PropsGetProductType {
  shop_id?: number;
}

export interface PropsPostProductType {
  shop_id: number;
  name: string;
  code?: string;
  describe: string;
  notes: string;
}

const productType = {
  getList: function (params: PropsGetProductType) {
    return axios.get("/product_type/list", { params });
  },

  create: function (body: PropsPostProductType) {
    return axios.post("/product_type/create", body);
  },
};

export default productType;
