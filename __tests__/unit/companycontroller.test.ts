import 'jest';
import supertest from "supertest"
import {connectDB,disconnectDB} from '../../src/database/connectdb';
import expressApp from '../../src/start/expressApp';



describe("company contoller test suite", () => {
  let app;

  beforeAll(async () => {
    app = await expressApp()
    await connectDB()

  })
  afterAll(async () => {
    await disconnectDB()
  })

  it("terms and condition update success", async () => {
    const payload = {
        user: {
            new_password1: "new-password"
        }
    }
    const response = await supertest(app)
      .put("/api/v1/companies/:id/terms-and-condition")
      .send(payload)
      .expect(200)

    expect(response.body).toMatchObject(
        {"message": "terms and condition updated successfully"}
    )
  })

})