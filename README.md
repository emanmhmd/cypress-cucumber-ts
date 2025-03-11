# Cypress Cucumber TypeScript Framework

A robust testing framework built with Cypress, Cucumber, and TypeScript, providing a BDD approach to end-to-end testing for the [SauceDemo](https://www.saucedemo.com) e-commerce website with strong typing support.

## 📋 Features

- ✅ **BDD Testing** - Use Gherkin syntax for human-readable tests
- ✅ **TypeScript Integration** - Strong typing for better code quality and developer experience
- ✅ **Page Object Model** - Organized, maintainable test structure
- ✅ **MochaAwesome Reports** - Detailed HTML reports for test results

## 🔧 Prerequisites

- Node.js (v18.x or higher)
- npm (v8.x or higher)
- Git

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/emanmhmd/cypress-cucumber-ts.git
cd cypress-cucumber-ts
```

### Install Dependencies

```bash
yarn install
```

## 🏃‍♂️ Running Tests

### Run All Tests

```bash
yarn test
```

### Run Tests Step by Step

```bash
# 1. Install dependencies
yarn install

# 2. Run Cypress tests
npx cypress run

# 3. Verify reports exist
ls cypress/reports/mocha/*.json

# 4. Generate merged report
npx ts-node generateMochaReport.ts
```

### Run Specific Feature

```bash
yarn test:feature --spec "cypress/e2e/features/auth.feature"
```

### Run Tests in a Specific Browser

```bash
yarn test:chrome
yarn test:firefox
yarn test:edge
```

### Open Cypress Test Runner

```bash
yarn cypress:open
```

## 📁 Project Structure

```
cypress-cucumber-ts/
├── cypress/
│   ├── cucumber.json
│   ├── e2e/
│   │   ├── features/           # Cucumber feature files
│   │   └── step_definitions/   # Step definitions for Cucumber
│   ├── fixtures/
│   │   └── users.json          # Test data
│   ├── reports/
│   │   ├── features/
│   │   ├── html/
│   │   └── mocha/              # MochaAwesome reports 
│   ├── support/
│   │   ├── pages/              # Page Objects
│   │   ├── commands.ts         # Custom Cypress commands
│   │   └── e2e.ts              # Support file loaded before test files
│   └── videos/                 # Test execution videos
├── node_modules/
├── reports/
├── .gitignore
├── cypress.config.ts           # Cypress configuration
├── generateMochaReport.ts      # Report generation script
├── package-lock.json
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── yarn.lock
```



## 📊 Reporting

This project uses MochaAwesome for generating test reports.

### Reports Structure


```
cypress/
├── reports/
│   ├── mocha/             # Individual test run JSON reports
│   └── mochareports/      # Generated HTML reports
│       └── report.html    # Final merged HTML report

```

### Generating Reports

Reports are automatically generated after test runs. To manually generate reports:

```bash
# Verify reports exist
ls cypress/reports/mocha/*.json

# Generate merged report
npx ts-node generateMochaReport.ts

# Open the generated report
open cypress/reports/mochareports/report.html
```

## 🧪 Test Cases

This framework includes the following test scenarios:

### Login and Logout
- Verify that users can successfully log in with valid credentials
- Verify that the system displays an error message with invalid credentials
- Verify that locked out users cannot access the system
- Verify that user redirected to products page after successful login
- Verify that user with no permission can't add items to the cart
- Verify that user can log out successfully
- Verify that user can't access any page without login

### Shopping Cart and Checkout Process
#### Shopping cart and Checkout functionality
- Verify that user can add items to the cart
- Verify that user can remove items from the cart
- Verify that user can checkout successfully
- Verify that user can't checkout without adding items to the cart
- Verify that user can't checkout without login

#### Edge Cases
- Verify that checkout form requires first name
- Verify that checkout form requires last name
- Verify that checkout form requires zip code

### State Management
#### Cart State Management
- Verify that cart remembers items when refreshing the page
- Verify cart empties after order completes

## 📹 Test Videos

Cypress automatically captures videos of test runs, which can be found in the `cypress/videos` directory after test execution.

### Viewing Test Videos

```bash
# After running tests, videos will be available in the cypress/videos directory
open cypress/videos
```

### Video Configuration

Video recording settings can be configured in the `cypress.config.ts` file:

```typescript
// cypress.config.ts
export default defineConfig({
  e2e: {
    video: true,            // Enable/disable video recording
    videoCompression: 32,   // Compression quality (0-100)
    videosFolder: 'cypress/videos', // Videos output directory
  },
});
```

## 🙏 Acknowledgements

- [Cypress Documentation](https://docs.cypress.io/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
