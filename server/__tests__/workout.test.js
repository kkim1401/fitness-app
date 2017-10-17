import app from "../app";
import setUpTestDb from "../util/setUpTestDb";
import {assertObjects} from "../util/testHelper";
import request from "supertest";

let workout, user;

beforeAll(() => {
    return setUpTestDb()
        .then(({testWorkout, testUser}) => {
            workout = testWorkout;
            user = testUser;
        })
        .catch(() => console.log("Test db failed to initialize!"));
});

describe("GET /users/userID/workouts", () => {
    it("should return array of resources on success", done => {
        request(app)
            .get(`/api/users/${user._id}/workouts`)
            .expect(200)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            assertObjects(res.body[0], workout);
            done();
            });
    });
});

describe("GET /workouts/workoutID", () => {
    it("should return resource on success", done => {
        request(app)
            .get(`/api/workouts/${workout._id}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                assertObjects(res.body, workout);
                done();
            });
    });
});