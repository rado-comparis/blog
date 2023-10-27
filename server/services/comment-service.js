import { get, update } from "../data/blog-db-access.js";

export const getComments = function (id) {
    return get(id).comments;
};

export const createComment = function (post) {
    let postToUpdate = get(post.postId);

    if (postToUpdate && postToUpdate.comments) {
         postToUpdate.comments.push({ 
            id: postToUpdate.comments.length + 1,
            text: post.text,
            username: post.username 
        });

        update(postToUpdate);
    }

    return postToUpdate;
};

export const updateComment = function (comment) {
    let postToUpdate = get(comment.postId);

    if (postToUpdate && comment && comment.text) {
        const index = postToUpdate.comments.indexOf(comment.id);
         postToUpdate.comments[index] = {
            id: comment.id,
            text: comment.text,
            username: comment.username 
        };

        update(postToUpdate);
    }

    return postToUpdate;
};