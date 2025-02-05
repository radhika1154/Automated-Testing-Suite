import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();  // Load .env variables

export class DynamicLoadingPage {
    private page: Page;
    private startButton: string = 'div[id="start"] button'; // Selector for Start button
    private helloWorldMessage: string = 'div[id="finish"] h4'; // Selector for "Hello World!" message

    constructor(page: Page) {
        this.page = page;
    }

    public async navigate() {
        await this.page.goto(process.env.BASE_URL! + '/dynamic_loading/1');
    }

    // Method to click the start button
    public async startDynamicLoading() {
        await this.page.locator(this.startButton).click();
    }

    // Method to wait for the "Hello World!" message to appear
    public async waitForHelloWorldMessage() {
        await this.page.waitForSelector(this.helloWorldMessage, { state: 'visible' });
    }

    // Method to get the message text
    public async getHelloWorldMessage(): Promise<string> {
        const message = await this.page.locator(this.helloWorldMessage).textContent();
        if (message === null) {
            throw new Error('Hello World message not found');
        }
        return message;
    }
}
