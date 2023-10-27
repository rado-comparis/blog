import request from "supertest";
import { app } from "../app.js";
import * as commentservice from "../services/comment-service.js";                                 
import { httpCode } from "../endpoints/response-codes.js";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });           

describe("app", () => {
    describe("GET /posts/:id", () => {
        test("With valid input It should return post and 200", done => {
            // arrange
            const getPostMock = jest.spyOn(commentservice, "getPost")
                .mockReturnValue({});

            // act
            request(app)
            .get("/posts/1")
            .then(response => {
                // assert
                expect(response.statusCode).toBe(httpCode.OK);
                expect(getPostMock).toHaveBeenCalledTimes(1);
                done();
            });

        });

        test("With invalid input It should return 400 bad request", done => {
            // arrange
            const getPostMock = jest.spyOn(commentservice, "getPost")
                .mockReturnValue(null);

            // act
            request(app)
              .get("/posts/bla")
              .then(response => {
                // assert 
                expect(response.statusCode).toBe(httpCode.BadRequest);
                expect(getPostMock).toHaveBeenCalledTimes(0);
                done();
              });
          });

          test("With non existent id It should return 404 not found", done => {
            // arrange
            const getPostMock = jest.spyOn(commentservice, "getPost")
                .mockReturnValue(null);
            // act
            request(app)
              .get("/posts/0")
              .then(response => {
                // assert
                expect(response.statusCode).toBe(httpCode.NotFound);
                expect(getPostMock).toHaveBeenCalledTimes(1);
                done();
              });
          });
      });
});
