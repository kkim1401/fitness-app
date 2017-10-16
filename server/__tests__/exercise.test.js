import app from "../app";
import setUpTestDb from "../setUpTestDb";
import request from "supertest";

let user, exercises;

beforeAll(() => {
    return setUpTestDb()
        .then(({testExercises, testUser}) => {
        exercises = testExercises;
        user = testUser;
    })
        .catch(() => console.log("Test db failed to initialize!"));
});

describe("GET /users/userID/exercises", () => {
    it("should return array of resources on success", done => {
        request(app)
            .get(`/api/users/${user._id}/exercises`)
            .expect(200)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            done();
        });
    });
});

describe("GET /exercises/exerciseID", () => {
    it("should return resource on success", done => {
        request(app)
            .get(`/api/exercises/${exercises[0]._id}`)
            .expect(200)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body).toEqual(exercises[0]);
            done();
            });
    });
});