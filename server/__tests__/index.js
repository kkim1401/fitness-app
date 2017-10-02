import request from "supertest";
import mongoose from "mongoose";
import {Mockgoose} from "mockgoose";
import app from "../app";
import User from "../models/user";

const mockgoose = new Mockgoose(mongoose);
jest.setTimeout(12000); //Timeout needs to be increased for API requests.

function assertUsers(createdUser, expectedUser) {
    expect(createdUser.name).toBe(expectedUser.name);
    expect(createdUser.gender).toBe(expectedUser.gender);
    expect(createdUser.maxes.squat).toBe(expectedUser.maxes.squat);
    expect(createdUser.maxes.bench).toBe(expectedUser.maxes.bench);
    expect(createdUser.maxes.deadlift).toBe(expectedUser.maxes.deadlift);
}

beforeAll(() => {
    return mockgoose.prepareStorage().then(() => {
        mongoose.connection.on("connected", () => {
            console.log("test db connection is open");
        });

        return mongoose.connect("mongodb://localhost/test");
    });
});

describe("POST /user", () => {
    const user = {
        name: "Kevin",
        gender: "male",
        age: 25,
        maxes: {
            squat: 365,
            bench: 255,
            deadlift: 505
        },
    };

    it("returns created resource as json on success", done => {
        request(app)
            .post("/api/users")
            .send(user)
            .expect(201)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            assertUsers(res.body, user);
            done();
            });
    });

    it("returns 400 error if name is exempt from user", done => {
        delete user.name;

        request(app)
            .post("/api/users")
            .send(user)
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
   it("returns resource from database on success", async done => {
       let id;

       const user = new User({
           name: "Nick",
           gender: "male",
           age: 25,
           maxes: {
               squat: 500,
               bench: 265,
               deadlift: 545
           },
           workouts: [],
           exercises: []
       });
       await user.save((err, savedUser) => {
           if (err) {
               return err;
           }
           id = savedUser._id;
       });

       request(app)
           .get(`/api/users/${id}`)
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