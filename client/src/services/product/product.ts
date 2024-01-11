import axios from "axios";
interface Image {
  name: string;
  img: string;
}

interface productDetail {
  product_size_id: number;
  price_purchase: number;
  price_sell: number;
  quantity: number;
}

export interface PropsCreateProduct {
  shop_id: number;
  name: string;
  describe: string;
  notes: string;
  product_type_id: number;
  gender_id: number;
  image: Image[];
  product_detail: productDetail[];
}

const productType = {
  create: function (body: PropsCreateProduct) {
    return axios.post("/product/create", body);
  },
};

export default productType;
