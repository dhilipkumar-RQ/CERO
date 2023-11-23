import 'jest';
import supertest from "supertest"
import {connectDB,disconnectDB} from '../../src/database/connectdb';
import {app} from '../../src/utils/setupTestEnvironment' 
import CompanyModel from '../../src/models/company/Company.model';
import {CompanyUserModel}  from '../../src/models/company/CompanyUser.model';
import generateToken from '../../src/utils/generateToken';

describe("auth contoller test suite", () => {

  it("set password success", async () => {
        
    let token = null
    const company = new CompanyModel({name: "dhilip",website: "dhilip.example.com",status: "pending",is_tc_agreed: false})
    await company.save()
        .then(async (company) => {
            const companyUser = new CompanyUserModel({
                first_name: "john",
                last_name: "doe",
                email: "user@example.com",
                password: "123",
                company_id: company._id
            })
            await companyUser.save()
            const token_payload = {
                user_email: companyUser.email,
                user_id: companyUser?._id,
                company_id: company?.id,
                role: 'user',
            };
            token = generateToken(token_payload)
        })

    const payload = {
        "user": {
            "new_password": "12345"
        }
    }
    const response = await supertest(app)
      .put("/api/v1/auth/set-password")
      .set('Authorization', token)
      .set('Content-Type', 'application/json') 
      .send(payload)

    expect(response.body).toMatchObject(
        { message: 'Password assigned successfully' }
    )
    expect(response.statusCode).toBe(200)

  })

})