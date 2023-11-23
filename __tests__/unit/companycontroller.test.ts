import 'jest';
import supertest from 'supertest';
import CompanyModel from '../../src/models/company/Company.model';
import { CompanyUserModel } from '../../src/models/company/CompanyUser.model';
import generateToken from '../../src/utils/generateToken';
import { server } from '../../src/utils/setupTestEnvironment';
import { faker } from '@faker-js/faker';
import {DEFAULT_COMPANY_USER_PASSWORD} from '../../src/config'

describe('company contoller test suite', () => {
  it('terms and condition update success', async () => {
    
    let token = null;
    const company = {
        name: faker.internet.displayName(),
        website: 'cero.example.com',
        status: 'pending',
        is_tc_agreed: false,
    }
    const newCompany = await CompanyModel.create(company);
    const fakeName = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const companyUser = {
        first_name: fakeName,
        last_name: fakeName,
        email: fakeEmail,
        company_id: newCompany._id,
        password: DEFAULT_COMPANY_USER_PASSWORD,
    };
    const newCompanyUser = await CompanyUserModel.create(companyUser);
    const token_payload = {
        user_email: newCompanyUser.email,
        user_id: newCompanyUser?._id,
        company_id: newCompany?.id,
        role: 'user',
    };
    token = generateToken(token_payload);

    const payload = {
      data: {
        status: true,
      },
    };
    const response = await supertest(server)
      .put('/api/v1/companies/:id/terms-and-condition')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(payload);
    expect(response.body).toMatchObject({
      message: 'terms and condition updated successfully',
    });
    expect(response.statusCode).toBe(200);
  });
});
