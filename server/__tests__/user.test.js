import request from "supertest";
import app from "../app";
import setUpTestDb from "../util/setUpTestDb";
import {assertObjects} from "../util/testHelper";
import merge from "merge";

let user;

beforeAll(() => {
    return setUpTestDb()
        .then(({testUser}) => {user = testUser})
        .catch(() => console.log("Test db failed to initialize!"));
});


describe("POST /users", () => {
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
            .expect("Location", /^\/api\/users\//)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                assertObjects(res.body, newUser);
                done();
            });
    });

    it("returns 400 error if name is exempt from user", done => {
        delete newUser.name;

        request(app)
            .post("/api/users")
            .send(newUser)
            .expect(400, done)
    });
});

describe("GET /users/userID", () => {
    it("returns populated resource from database on success", done => {
        request(app)
            .get(`/api/users/${user._id}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                assertObjects(res.body, user);
                done();
            });
    });
});

describe("PATCH /users/userID", () => {
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
            .expect("Location", /^\/api\/users\//)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                assertObjects(res.body, updatedUser);
                done();
            });
    });
});

describe("DELETE /users/userID", () => {
    it("returns 204 status when resource is successfully deleted", done => {
        request(app)
            .delete(`/api/users/${user._id}`)
            .expect(204, done);
    });
});