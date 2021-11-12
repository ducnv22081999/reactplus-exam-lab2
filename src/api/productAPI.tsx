import { IProductItem } from "../components/interface";
import { axiosClient } from "./axiosClient";
// import { IProductItem } from "./../components/interface";

const ProductAPI = {
    getAll() {
        const url = `/products`;
        return axiosClient.get(url);
    },
    addProduct(itemProduct: IProductItem) {
        const url = `/products`;
        axiosClient.post(url, itemProduct)
    },
    deleteProduct(id: string) {
        const url = `/products/${id}`;
        axiosClient.delete(url)
    },
    updateProduct(id: string, itemProduct: IProductItem) {
        const url = `/products/${id}`;
        axiosClient.put(url, itemProduct)
    },
}
export default ProductAPI;