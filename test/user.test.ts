import {afterAll, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import request from "supertest";
import {app} from "../src";

describe("User login and singUp test", () => {

    beforeEach(async () => {
        try {
            const response = await request(app)
                .post("/api/user")
                .send({
                    firstName: "Malaka",
                    lastName: "jayakodi",
                    username: "jayakodi",
                    email: "jayakodi@gmail.com",
                    address: "colombo",
                    password: "123456",
                    phoneNumber: "07771234123",
                })
                .set("Accept", "application/json")
                .expect(200);
            console.log(response.body);
        } catch (e) {
            console.log(e.message)
            expect(e).toBeFalsy();
        }
    });

    it("user login", function (done) {
        request(app)
            .post("/api/user/login")
            .send({username: "rootx", password: "123456"})
            .set("Accept", "application/json")
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                console.log(res.headers["set-cookie"]);
                return done();
            });
    });

    afterAll(async () => {
        try {
            const response = await request(app)
                .delete("/api/user/aruna@gmail.com")
                .set("Accept", "application/json")
                .expect(200);
            console.log(response.body);
        } catch (e) {
            expect(e).toBeFalsy();
        }
    });

});

describe("User API Testing", () => {

    let cookie: any;

    beforeAll(async () => {
        try {
            const response = await request(app)
                .post("/api/user/login")
                .send({username: "rootx", password: "123456"})
                .set("Accept", "application/json")
                .expect(200);
            cookie = response.headers["set-cookie"];
        } catch (e) {
            expect(e).toBeFalsy();
        }
    });

    it("Get user by id API test", (done) => {
        const id = "63d7e3e65dfb150d5b552aa2";

        request(app)
            .get(`/api/user/${id}`)
            .set("cookie", cookie)
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                console.log(res.body);
                return done();
            });
    });
});
