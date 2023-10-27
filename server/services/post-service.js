import { getAll, get } from "../data/blog-db-access.js";

export const getAllPosts = function () {
    return getAll();
};

export const getPost = function (id) {
    return get(id);
};

