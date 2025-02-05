import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();  // Load .env variables

export class LoginPage {
    private page: Page;
    private usernameInput: string = '//input[@id="username"]';
    private passwordInput: string = '//input[@id="password"]';
    private loginButton: string = '.fa.fa-2x.fa-sign-in';
    private flashMessage: string = '#flash';

    constructor(page: Page) {
        this.page = page;

    }


    // Navigate to the login page
    public async navigate() {
        await this.page.goto(process.env.BASE_URL! + '/login');
    }

    // Login method with username, password, and login button actions
    public async login(username: string = process.env.USERNAME || 'tomsmith', password: string = process.env.PASSWORD || 'SuperSecretPassword!') {
        await this.page.locator(this.usernameInput).fill(username);  // Enter username
        await this.page.locator(this.passwordInput).fill(password);  // Enter password
        await this.page.locator(this.loginButton).click();  // Click the login button
    }

    // Get flash message after login attempt
    public async getFlashMessage() {
        return this.page.locator(this.flashMessage).textContent();
    }
}
