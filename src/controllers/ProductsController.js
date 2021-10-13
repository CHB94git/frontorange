import httpClient from "./httpClient";

const END_POINT = "/api/products";

const getAllProducts = () => httpClient.get(END_POINT);

const getById = (_id) => httpClient.get(END_POINT+"/"+_id);

const createProduct = (product) => httpClient.post(END_POINT, product);

const updateProduct = (_id, product) => httpClient.put(END_POINT+"/"+_id, product);

const deleteProduct = (_id) => httpClient.delete(END_POINT+"/"+_id);

export{
    getAllProducts,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}

