import app from "../app";
import setUpTestDb from "../util/setUpTestDb";
import {assertObjects} from "../util/testHelper";
import request from "supertest";

let workout, user, exercises;

beforeAll(() => {
    return setUpTestDb()
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
    it("should return created resource on success", done => {
        const newWorkout = {
            name: "New Workout",
            description: "New Description",
            schedule: [
                {
                    day: 1,
                    exerciseList: [{
                        exercise: exercises[0]._id,
                        order: 1,
                        setNumber: 3,
                        reps: 5,
                        weight: 315
                    }, {
                        exercise: exercises[1]._id,
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
                        exercise: exercises[0]._id,
                        order: 1,
                        setNumber: 3,
                        reps: 5,
                        weight: 195
                    }]
                }
            ]
        };

        request(app)
            .post(`/api/users/${user._id}/workouts`)
            .send(newWorkout)
            .expect(201)
            .expect("Location", /^\/api\/workouts\//, done)
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