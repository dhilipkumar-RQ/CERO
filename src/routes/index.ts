import { Application } from 'express';
import authRoutes from '../routes/auth/auth.routes';
import companyRoutes from '../routes/company.routes';

const routes = (app: Application) => {
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/companies', companyRoutes)
}
export default routes