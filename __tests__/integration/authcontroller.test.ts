import 'jest';
import supertest from 'supertest';
import { server } from '../../src/utils/setupTestEnvironment';
import CompanyModel from '../../src/models/company/Company.model';
import { CompanyUserModel } from '../../src/models/company/CompanyUser.model';
import generateToken from '../../src/utils/generateToken';
import { faker } from '@faker-js/faker';
import { DEFAULT_COMPANY_USER_PASSWORD } from '../../src/config';

describe('auth contoller test suite - set new password', () => {
  it('should set new password successfully', async () => {
    let token = null;
    const company = {
      name: faker.internet.displayName(),
      website: 'cero.example.com',
      status: 'pending',
      is_tc_agreed: false,
    };
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
      user: {
        new_password: 'Password@12345',
      },
    };
    const response = await supertest(server)
      .put('/api/v1/auth/set-password')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.body).toMatchObject({
      message: 'new password has been successfully set',
    });
    expect(response.statusCode).toBe(200);
  });

  it('should respond that password has been already set password', async () => {
    let token = null;
    const company = {
      name: faker.internet.displayName(),
      website: 'cero.example.com',
      status: 'pending',
      is_tc_agreed: false,
    };
    const newCompany = await CompanyModel.create(company);
    const fakeName = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const companyUser = {
      first_name: fakeName,
      last_name: fakeName,
      email: fakeEmail,
      company_id: newCompany._id,
      password: 'Password@123temp',
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
      user: {
        new_password: 'Password@123New',
      },
    };
    const response = await supertest(server)
      .put('/api/v1/auth/set-password')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.body).toMatchObject({
      message: 'password has already been set',
    });
    expect(response.statusCode).toBe(422);
  });

  it('should respond with UnAuthorized user for invalid token', async () => {
    const company = {
      name: faker.internet.displayName(),
      website: 'cero.example.com',
      status: 'pending',
      is_tc_agreed: false,
    };
    const newCompany = await CompanyModel.create(company);
    const fakeName = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const companyUser = {
      first_name: fakeName,
      last_name: fakeName,
      email: fakeEmail,
      company_id: newCompany._id,
      password: 'Password@123',
    };
    const newCompanyUser = await CompanyUserModel.create(companyUser);
    const payload = {
      user: {
        new_password: 'Password@123',
      },
    };
    const response = await supertest(server)
      .put('/api/v1/auth/set-password')
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.body).toMatchObject({
      message: 'UnAuthorized user',
    });
    expect(response.statusCode).toBe(401);
  });

  it('it should send error response for invalid password combination', async () => {
    const company = {
      name: faker.internet.displayName(),
      website: 'cero.example.com',
      status: 'pending',
      is_tc_agreed: false,
    };
    const newCompany = await CompanyModel.create(company);
    const fakeName = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const companyUser = {
      first_name: fakeName,
      last_name: fakeName,
      email: fakeEmail,
      company_id: newCompany._id,
      password: 'Password@123',
    };
    const newCompanyUser = await CompanyUserModel.create(companyUser);
    const token_payload = {
      user_email: newCompanyUser.email,
      user_id: newCompanyUser?._id,
      company_id: newCompany?.id,
      role: 'user',
    };
    const token = generateToken(token_payload);
    const payload = {
      user: {
        new_password: 'Password',
      },
    };
    const response = await supertest(server)
      .put('/api/v1/auth/set-password')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.body).toMatchObject({
      message:
        'Password must be a combination of minimum 8 characters, including 1 special character and 1 uppercase letter.',
    });
    expect(response.statusCode).toBe(422);
  });
});

describe('auth contoller test suite - Login User', () => {
  it('should successfully login with valid email and password', async () => {
    const fakeName = faker.internet.userName();
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();

    const company = {
      name: faker.internet.displayName(),
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

    const response = await supertest(server)
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

    const response = await supertest(server)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.statusCode).toBe(401);

    expect(response.body).toMatchObject({
      message: 'Incorrect Email or Password',
    });
  });
});
