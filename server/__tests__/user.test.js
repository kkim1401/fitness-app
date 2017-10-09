import request from "supertest";
import app from "../app";
import setUpTestDb from "../setUpTestDb";
import merge from "merge";

let user;

function assertUsers(createdUser, expectedUser) {
    expect(createdUser.name).toBe(expectedUser.name);
    expect(createdUser.gender).toBe(expectedUser.gender);
    expect(createdUser.age).toBe(expectedUser.age);
    expect(createdUser.maxes.squat).toBe(expectedUser.maxes.squat);
    expect(createdUser.maxes.bench).toBe(expectedUser.maxes.bench);
    expect(createdUser.maxes.deadlift).toBe(expectedUser.maxes.deadlift);

    //For patch and get requests
    if (expectedUser.workouts) {
        //Map function returns id for each workout if it doesn't already return id.
        const createdWorkoutsById = createdUser.workouts.map(workout => workout._id || workout);
        //Need to convert ObjectIds into strings.
        const expectedWorkoutsById = expectedUser.workouts.map(id => id.toString());

        expect(createdWorkoutsById).toEqual(expectedWorkoutsById);
    }

    if (expectedUser.exercises) {
        const createdExercisesById = createdUser.exercises.map(exercise => exercise._id || exercise);
        const expectedWorkoutsById = expectedUser.exercises.map(id => id.toString());

        expect(createdExercisesById).toEqual(expectedWorkoutsById);
    }
}

beforeAll(() => {
    return setUpTestDb()
        .then(({testUser}) => {user = testUser})
        .catch(() => console.log("Test db failed to initialize!"));
});


describe("POST /user", () => {
    const newUser = {
        name: "Kevin",
        gender: "male",
        age: 25,
        maxes: {
            squat: 365,
            bench: 255,
            deadlift: 505
        }
    };

    it("returns created resource as json on success", done => {
        request(app)
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            assertUsers(res.body, newUser);
            done();
            });
    });

    it("returns 400 error if name is exempt from user", done => {
        delete newUser.name;

        request(app)
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .end(err => {
            if (err) {
                return done(err);
            }
            done();
            });
    });
});

describe("GET /user", () => {
   it("returns populated resource from database on success", done => {
       request(app)
           .get(`/api/users/${user._id}`)
           .expect(200)
           .end((err, res) => {
           if (err) {
               return done(err);
           }
           assertUsers(res.body, user);
           done();
           });
   });
});

describe("PATCH /user", () => {
    it("returns updated resource from database on success", done => {
        const traits = {
            squat: 600,
            age: 27
        };

        const updatedUser = merge.recursive(true, user, {age: traits.age, maxes: {squat: traits.squat}});

        request(app)
            .patch(`/api/users/${user._id}`)
            .send(traits)
            .expect(200)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            assertUsers(res.body, updatedUser);
            done();
            });
    });
});

describe("DELETE /user", () => {
    it("returns 204 status when resource is successfully deleted", done => {
        request(app)
            .delete(`/api/users/${user._id}`)
            .expect(204, done);
    });
});