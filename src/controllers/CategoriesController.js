import httpClient from "./httpClient";

const END_POINT = "/api/categories";

const getAll = () => httpClient.get(END_POINT);

const getById = (_id) => httpClient.get(END_POINT+"/"+_id);

const createCategory = (product) => httpClient.post(END_POINT, product);

const updateCategory = (_id, product) => httpClient.put(END_POINT+"/"+_id, product);

const deleteCategory = (_id) => httpClient.delete(END_POINT+"/"+_id);

export{
    getAll,
    getById,
    createCategory,
    updateCategory,
    deleteCategory
}

