import * as dbAccess from "../../data/blog-db-access.js";
import { createComment } from "../comment-service.js";

describe("comment-service", () => {
    describe("createComment", () => {
        test("With valid input post the post should have added comment", () => {
            // arrange
            const postToUpdate = { comments: [] };
            const getMock = jest.spyOn(dbAccess, "get")
                .mockReturnValue(postToUpdate);
            const updateMock = jest.spyOn(dbAccess, "update")
                .mockReturnValue(null);
            
            const post = {
                id: "id"
            };

            // act
            const result = createComment(post);

            // assert
            expect(result).toEqual(postToUpdate);
            expect(getMock).toHaveBeenCalledTimes(1);
            expect(updateMock).toHaveBeenCalledTimes(1);
        });

        test("With invalid input post not found should not comment and null is returned", () => {
            // arrange
            const postToUpdate = { comments: [] };
            const getMock = jest.spyOn(dbAccess, "get")
                .mockReturnValue(null);
            const updateMock = jest.spyOn(dbAccess, "update")
                .mockReturnValue(null);
            
            const post = {
                id: "id"
            };

            // act
            const result = createComment(post);

            // assert
            expect(result).toEqual(null);
            expect(getMock).toHaveBeenCalledTimes(1);
            expect(updateMock).toHaveBeenCalledTimes(0);
        });
    });
});