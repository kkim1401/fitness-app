import request from "supertest";
import app from "../app";
import setUpTestDb from "../setUpTestDb";
import merge from "merge";

let user;

function assertUsers(createdUser, expectedUser) {
    for (const trait in expectedUser) {
        if (expectedUser.hasOwnProperty(trait)) {
            switch (true) {
                case Array.isArray(expectedUser[trait]):
                    /* Map function returns id for each workout/exercise if it doesn't already return id.
                    Used for populate method in GET. */
                    const arrayById = createdUser[trait].map(elem => elem._id || elem);
                    expect(arrayById).toEqual(expectedUser[trait]);
                    break;
                case typeof expectedUser[trait] === "object":
                    assertUsers(createdUser[trait], expectedUser[trait]);
                    break;
                default:
                    expect(createdUser[trait]).toBe(expectedUser[trait]);
                    break;
            }
        }
    }
}

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

describe("GET /users/userID", () => {
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
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                assertUsers(res.body, updatedUser);
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