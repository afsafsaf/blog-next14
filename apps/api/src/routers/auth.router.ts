
import { AuthController } from '@/controllers/auth.controller';
import { Router } from 'express';

export class AuthRouter {
    private router: Router;
    private authController: AuthController;

    constructor() {
        this.authController = new AuthController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/login', this.authController.loginController);
        this.router.post('/register', this.authController.registerController);
        // this.router.get('/:id', this.authController.getSampleDataById);
        // this.router.post('/', this.authController.createSampleData);
    }

    getRouter(): Router {
        return this.router;
    }
}
