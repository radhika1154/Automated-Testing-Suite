import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();  // Load .env variables

export class FileUploadPage {
    private page: Page;
    private chooseFile: string = '#file-upload';  // Selector for the file input field
    private uploadButton: string = '#file-submit';  // Selector for the upload button
    private uploadedFileName: string = '#uploaded-files';  // Selector for the uploaded file name displayed on the page

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to the File Upload page
    public async navigate() {
        await this.page.goto(process.env.BASE_URL! + '/upload');
    }

    // Method to upload a file
    public async uploadFile(filePath: string) {
        if (!filePath) {
            throw new Error('No file selected to upload');
        }

        await this.page.locator(this.chooseFile).setInputFiles(filePath);  // Select the file
        await this.page.locator(this.uploadButton).click();  // Click the upload button
    }

    // Method to verify that the file is uploaded
    public async verifyFileUploaded(): Promise<string> {
        const fileName = await this.page.locator(this.uploadedFileName).textContent();

        // Check if the uploaded file name is null or empty
        if (fileName === null || fileName.trim() === '') {
            throw new Error('Uploaded file name not found or file upload failed');
        }

        return fileName;  // Return the file name if found
    }

}

