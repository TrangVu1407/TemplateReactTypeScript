import axios from "axios";

export interface PropsGetProductType {
  shop_id?: number;
}

const productType = {
  getList: function (params: PropsGetProductType) {
    return axios.get("/product_type/list", { params });
  },
};

export default productType;
