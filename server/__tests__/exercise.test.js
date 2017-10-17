import app from "../app";
import setUpTestDb from "../util/setUpTestDb";
import {assertObjects} from "../util/testHelper";
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
            expect(res.body).toEqual(exercises);
            done();
        });
    });
});

describe("POST /users/userID/exercises", () => {
    const newExercise = {name: "deadlift", description: "leg, back exercise"};

    it("should return created resource on success", done => {
        request(app)
            .post(`/api/users/${user._id}/exercises`)
            .send(newExercise)
            .expect(201)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            assertObjects(res.body, newExercise);
            done();
            });
    });

    it("should return 400 error if name is not provided", done => {
        delete newExercise.name;

        request(app)
            .post(`/api/users/${user._id}/exercises`)
            .send(newExercise)
            .expect(400, done)
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

describe("DELETE /exercises/exerciseID", () => {
    it("should return 204 status when resource is successfully deleted", done => {
        request(app)
            .delete(`/api/exercises/${exercises[1]._id}`)
            .expect(204, done)
    });
});