import app from "../app";
import setUpTestDb, {initializeTestResources} from "../util/setUpTestDb";
import {assertObjects} from "../util/testHelper";
import request from "supertest";
import mongoose from "mongoose";

let workout, user, exercises;

beforeAll(() => {
    return setUpTestDb()
        .then(initializeTestResources)
        .then(({testWorkout, testUser, testExercises}) => {
            exercises = testExercises;
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

describe("POST /users/userID/workouts", () => {
    //Doesn't really matter what exercise is put into the list.
    const id = mongoose.Types.ObjectId;

    const newWorkout = {
        name: "New Workout",
        description: "New Description",
        schedule: [
            {
                day: 1,
                exerciseList: [{
                    exercise: new id,
                    order: 1,
                    setNumber: 3,
                    reps: 5,
                    weight: 315
                }, {
                    exercise: new id,
                    order: 2,
                    setNumber: 3,
                    reps: 5,
                    weight: 185
                }
                ]
            },
            {
                day: 2,
                exerciseList: [{
                    exercise: new id,
                    order: 1,
                    setNumber: 3,
                    reps: 5,
                    weight: 195
                }]
            }
        ]
    };

    it("should return created resource on success", done => {
        request(app)
            .post(`/api/users/${user._id}/workouts`)
            .send(newWorkout)
            .expect(201)
            .expect("Location", /^\/api\/workouts\//, done)
    });

    it("should return 400 error if name is not provided", done => {
        delete newWorkout.name;

        request(app)
            .post(`/api/users/${user._id}/workouts`)
            .send(newWorkout)
            .expect(400, done)
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

describe("DELETE /workouts/workoutID", () => {
    it("should return 204 status when resource is successfully deleted", done => {
        request(app)
            .delete(`/api/workouts/${workout._id}`)
            .expect(204, done);
    })
});