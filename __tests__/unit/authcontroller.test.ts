import 'jest';
import supertest from 'supertest';
import { app } from '../../src/utils/setupTestEnvironment';
import CompanyModel from '../../src/models/company/Company.model';
import { CompanyUserModel } from '../../src/models/company/CompanyUser.model';
import generateToken from '../../src/utils/generateToken';
import { faker } from '@faker-js/faker';

describe('auth contoller test suite - set new password', () => {
  it('set password success', async () => {
    let token = null;
    const company = new CompanyModel({
      name: 'dhilip',
      website: 'dhilip.example.com',
      status: 'pending',
      is_tc_agreed: false,
    });
    await company.save().then(async (company) => {
      const companyUser = new CompanyUserModel({
        first_name: 'john',
        last_name: 'doe',
        email: 'user@example.com',
        password: '123',
        company_id: company._id,
      });
      await companyUser.save();
      const token_payload = {
        user_email: companyUser.email,
        user_id: companyUser?._id,
        company_id: company?.id,
        role: 'user',
      };
      token = generateToken(token_payload);
    });

    const payload = {
      user: {
        new_password: '12345',
      },
    };
    const response = await supertest(app)
      .put('/api/v1/auth/set-password')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.body).toMatchObject({
      message: 'Password assigned successfully',
    });
    expect(response.statusCode).toBe(200);
  });
});

describe('auth contoller test suite - Login User', () => {
  it('should successfully login with valid email and password', async () => {
    const fakeName = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();

    const company = {
      name: faker.internet.displayName(),
      fakeName,
      fakeEmail,
      is_tc_agreed: false,
    };

    const newCompany = await CompanyModel.create(company);

    const companyUser = {
      first_name: fakeName,
      last_name: fakeName,
      email: fakeEmail,
      company_id: newCompany._id,
      password: fakePassword,
    };

    const newCompanyUser = await CompanyUserModel.create(companyUser);

    const payload = {
      login: {
        email: fakeEmail,
        password: fakePassword,
      },
    };

    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.statusCode).toBe(200);

    expect(response.body).toMatchObject({
      user: {
        user_id: newCompanyUser._id.toString(),
        first_name: fakeName,
        last_name: fakeName,
        email: fakeEmail,
        company_id: newCompany._id.toString(),
        terms_and_condition: company.is_tc_agreed,
      },
      token: {
        token: response.body.token.token,
      },
    });
  });

  it('should fail login with invalid email and password', async () => {
    const fakeName = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();

    const company = {
      name: faker.internet.displayName(),
      fakeName,
      fakeEmail,
      is_tc_agreed: false,
    };

    const newCompany = await CompanyModel.create(company);

    const companyUser = {
      first_name: fakeName,
      last_name: fakeName,
      email: fakeEmail,
      company_id: newCompany._id,
      password: fakePassword,
    };

    const newCompanyUser = await CompanyUserModel.create(companyUser);

    const payload = {
      login: {
        email: fakeEmail,
        password: faker.internet.password(),
      },
    };

    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.statusCode).toBe(401);

    expect(response.body).toMatchObject({
      message: 'Invalid Credentials',
    });
  });
});
