import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pageObjects/loginPage';
import { DynamicLoadingPage } from '../pageObjects/dynamicLoadingPage';
import { FileUploadPage } from '../pageObjects/fileUploadPage';

// Load environment variables
dotenv.config();

//Part 1: Web UI Testing-The Internet Website (Login, Dynamic Loading and File Upload Functionality)
test.describe('Web Application Tests for The Internet website', () => {
    let loginPage: LoginPage;
    let dynamicLoadingPage: DynamicLoadingPage;
    let fileUploadPage: FileUploadPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dynamicLoadingPage = new DynamicLoadingPage(page);
        fileUploadPage = new FileUploadPage(page);
    });

    // This will run after each test
    test.afterEach(async ({ page }, testInfo) => {
        // Take a screenshot after each test
        const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
        await page.screenshot({ path: screenshotPath });
        console.log(`Screenshot taken: ${screenshotPath}`);
    });

//Task 1 : Login Functionality Web UI Testing
    test.describe('[@login] Validating Login Tests functionality', () => {

    //Task 1.1 : Validate successful login using the provided valid credentials (username: tomsmith, password: SuperSecretPassword!).
        test('[@loginValid] Validate successful login with valid credentials', async () => {

            const validUsername = process.env.USERNAME!; 
            const validPassword = process.env.PASSWORD!; 
            console.log(validUsername , validPassword);
            // Navigate to login page and login with valid credentials
            await loginPage.navigate();
            await loginPage.login(validUsername,validPassword);

            // Validate successful login by checking the flash message
            const flashMessage = await loginPage.getFlashMessage();
            expect(flashMessage).toContain('You logged into a secure area!');
        });

    //Task 1.2 : Validate that incorrect credentials produce an appropriate error message.
        test('[@loginInvalid] Validate error message with invalid credentials', async () => {
            // Override .env credentials for invalid login
            process.env.USERNAME = 'invalidUsername';
            process.env.PASSWORD = 'invalidPassword';

            // Navigate to login page and attempt login with invalid credentials
            await loginPage.navigate();
            await loginPage.login();

            // Validate that the flash message contains the expected error
            const flashMessage = await loginPage.getFlashMessage();
            expect(flashMessage).toContain('Your username is invalid!');
        });

    });

//Task 2 : Dynamic Loading Web UI Testing Automate the process of starting the dynamic loading
    test('[@dynamicLoading] Validate dynamic loading functionality', async () => {
        // Navigate to the dynamic loading page
        await dynamicLoadingPage.navigate();

        // Click the start button to trigger dynamic loading
        await dynamicLoadingPage.startDynamicLoading();

        //Wait for the dynamically loaded element to appear
        // Wait for the "Hello World!" message to appear
        await dynamicLoadingPage.waitForHelloWorldMessage();

        //Verify that the final message (“Hello World!”) is displayed
        // Get and validate the message
        const message = await dynamicLoadingPage.getHelloWorldMessage();
        expect(message).toBe('Hello World!');
    });

//Task 3 : File Upload Web UI Testing Automate the file upload process
    test('[@fileUpload] Validate file upload functionality', async () => {
        // Navigate to the file upload page
        await fileUploadPage.navigate();

        // Upload a file
        const filePath = 'fileupload.txt';  // Update with an actual file path
        await fileUploadPage.uploadFile(filePath);

        // Verify that the file is uploaded successfully and confirmation is shown
        const uploadedFileName = await fileUploadPage.verifyFileUploaded();
        expect(uploadedFileName).toContain('fileupload.txt');
    });
});
