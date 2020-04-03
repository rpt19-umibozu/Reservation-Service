const request = require('supertest')
const app = require('../../server/index.js');
import 'babel-polyfill';

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app)
      .get("/listingInfo")
      .query({listingId: '10001'})
      // .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)

      // expect(response).toBe([{"id":1,"listingId":10001,"pricePerNight":169,"weekend":0,"weekendPrice":1.1,"maxGuests":3,"tax":1.12}])
      expect(response.statusCode).toBe(200)
      expect(response.text).toBe('[{"id":1,"listingId":10001,"listingName":"Super_Cute_Retro_Airstream","pricePerNight":129,"weekend":1,"weekendPrice":1.1,"maxGuests":4,"tax":1.12}]')
       })

      // afterAll((done) => {
        // .end(function(err, res) {
        //   if (err) return done(err);
        //   expect(202)
        //   expect(res.end).to.equal('{ "id": 500 }')
        //  done()
        // })
  // });
})
