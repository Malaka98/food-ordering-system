import request from "supertest"
import {describe, it} from "@jest/globals"
import {app} from "../src";

describe('POST /user', () => {
    it('user login', function (done) {
        request(app)
            .post('/api/user')
            .send({username: 'root', password: "123"})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});
