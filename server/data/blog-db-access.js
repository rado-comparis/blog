import { blog } from "./blog-db.js";

export const getAll = function () {
    return blog.posts;
};

export const get = function (id) {
    return getAll().find(x => x.id === id);
}

export const update = function (newPost) {
     const index = blog.posts.indexOf(newPost);
     blog.posts[index] = { ...newPost };
};

