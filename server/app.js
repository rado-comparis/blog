import express from "express";
import { getAllPosts, getPost } from "./services/post-service.js";
import { createComment, getComments, updateComment } from "./services/comment-service.js";
import { notFound, badRequest, internalServerError } from "./endpoints/responses.js";
import { httpCode } from "./endpoints/response-codes.js";

export const app = express();
app.use(express.json());
/** 
 * Global exception handler middleware
 */
app.use((err, req, res, next) => {
  if (! err) {
      return next();
  }

  console.log(err);

  internalServerError(res);
});

/**
 * Returns all posts
 */
app.get("/posts", (req, res) => {
  res.json({ data: getAllPosts() });
});

/**
* Returns a post by id
*/
app.get("/posts/:id", (req, res) => {
  if (!req.params.id || isNaN(req.params.id)) {
    badRequest(res, "Invalid id")
  }
  const post = getPost(req.params.id);

  if (!post) {
    notFound(res);
  }

  res.json({ data: post });
});

/**
 * Returns comments for a given post by its id
 */
app.get("/comments/:id", (req, res) => {
  if (!req.params.id || isNaN(req.params.id)) {
    badRequest(res, "Invalid id")
  }

  const comments = getComments(req.params.id);

  if (!comments) {
    notFound(res);
  }

  res.json({ data: comments });
});

/**
 * Creates a new comment for a post
 */
app.post("/comments", (req, res) => {
  // properties would be better checked by a middleware or checked against a schema
  if (!(req && req.body)) {
      badRequest(res, "please provide the whole post object")
  }
  else {
    const postUpdated = createComment(req.body);
    
    if (postUpdated) {
      notFound(res)
    }

    res.json({ message: postUpdated });
  }
});

/**
 * Update existing comment
 */
app.patch("/comments", (req, res) => {
  // properties would be better checked by a middleware or checked against a schema
  if (!(req && req.body && req.body.text && req.body.postId && req.body.id)) {
    badRequest(res, "invalid imput")
  }

  const postUpdated =  updateComment(req.body);

  if (postUpdated) {
    notFound(res);
  }
  else {
    res.json({ message: postUpdated });
  }
});