import axiosClient from "./axiosClient";

export const ProductApi = {
    getAllProducts: () => axiosClient.get("/products"),

    getProductsOfCategory: (category) => axiosClient.get(`/products/category/${category}`),

    addProductToCart: (data) => axiosClient.post(`/products/add`, data),

    getProductsOfCart :() => axiosClient.get(`/carts/1`)

}

