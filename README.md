```md
# Playwright Test Suite

## Overview
This repository contains automated tests using Playwright and TypeScript for both UI and API testing.

## Project Structure
```
playwright-test-suite/
│── .github/             # GitHub workflows (if using CI/CD)
│── html-report/         # Playwright HTML reports (ignored in git)
│── node_modules/        # Dependencies (ignored in git)
│── pageObjects/         # Page Object Model (POM) files
│   ├── dynamicLoadingPage.ts
│   ├── fileUploadPage.ts
│   ├── loginPage.ts
│── playwright-report/   # Playwright test reports (ignored in git)
│── screenshots/         # UI screenshots
│── test-results/        # Playwright test results 
│── tests/               # Spec files for API and UI tests
│   ├── api-tests.spec.ts
│   ├── ui-tests.spec.ts
│── .env                 # Environment variables 
│── .gitignore           # Git ignore file
│── fileupload.txt       # Sample file for upload testing
│── package.json         # Dependencies and scripts
│── package-lock.json    # Dependency lock file
│── playwright.config.ts # Playwright configuration
│── tsconfig.json        # TypeScript configuration


## Prerequisites

Before running the tests, ensure you have the following is installed (Windows):

```
### ** 1. Install Node.js and npm**
- **Required Version:**  
  - Node.js **v22.11.0**
  - npm **v11.0.0**
- **Check your installed versions:**
  ```sh
  node -v
  npm -v
```
## Installation

1. Clone the repository:
```sh
git clone https://github.com/your-username playwright-test-suite.git
cd playwright-test-suite
  
2. Command For Installing Playwright (TypeScript)
    npm init playwright@latest

3. Command For Installing dotenv  
    npm install dotenv@16.4.7

4. Command For Installing @types/node version 22.13.1
    npm install -D @types/node@22.13.1

After above installation Check the following dependencies to added in your package.json:

```sh
"devDependencies": {
    "@playwright/test": "^1.50.1",
    "@types/node": "^22.13.1",
    "typescript": "^5.7.3"
},
"dependencies": {
    "dotenv": "^16.4.7"
}

## Running Tests

1. To run UI & API tests :
```sh
npx playwright test  (Run in Headless mode)
npx playwright test --headed --project=chromium (Run in Headed mode)
```

2. To run UI tests only :
```sh
npx playwright test tests/ui-tests.spec.ts (Run in Headless mode)

npx playwright test tests/ui-tests.spec.ts --headed --project=chromium (Run in Headless mode)

npx playwright test tests/ui-tests.spec.ts --headed --project=chromium --grep "@login" (Run Login Test only)
You can change the tag name to run specific test
```

3. To run API tests:
```sh
npx playwright test tests/api-tests.spec.ts (Run in Headless mode)

npx playwright test tests/api-tests.spec.ts --headed --project=chromium (Run in Headless mode)

npx playwright test tests/api-tests.spec.ts --headed --project=chromium --grep "@GETall" (Run GET All Post Test only)
You can change the tag name to run specific test
```

## Generating Reports

To generate and open HTML reports:
```sh
npx playwright test --reporter=html
npx playwright show-report

## Test Architecture

1. **Page Object Model (POM)** is used for better test maintainability.
2. **Playwright Test Runner** is configured with **`playwright.config.ts`**.
3. Tests include **UI interactions** and **API validations**.

## Challenges Faced
1. **Mock API Limitation** – JSONPlaceholder does not persist deletions, so GET requests still return 200 OK instead of 404 Not Found.

2. **Request Interception Issue** – page.request.get() bypassed page.route(), leading to failed assertions. Used page.evaluate() to ensure the GET request runs within the browser context.

3. **Race Conditions** – The DELETE and GET requests sometimes executed too quickly, causing inconsistent results. Fixed by ensuring interception setup before API calls and properly handling async operations.

## ** Test Cases Covered **

| Feature            | Scenario                                                            |
|--------------------|---------------------------------------------------------------------|
| **Login**          | ✅ Validate successful login wit `tomsmith` / `SuperSecretPassword!`|
|                    | ✅ Validate incorrect credentials display an error message          |
|**Dynamic Loading** | ✅ Automate the process of starting dynamic loading                 |
|                    | ✅ Wait for the dynamically loaded element to appear                |
|                    | ✅ Verify that "Hello World!" message is displayed                  |
| **File Upload**    | ✅ Automate file upload process                                     |
|                    | ✅ Verify successful upload confirmation                            |

---









