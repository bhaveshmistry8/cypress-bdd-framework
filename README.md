# Cypress BDD Test Automation Framework

A test automation framework demonstrating E2E and API testing using Cypress with Cucumber BDD.

## 🚀 Features

- **BDD with Cucumber**: Gherkin syntax for readable test scenarios
- **E2E Testing**: Complete user journey testing
- **API Testing**: RESTful API validation
- **Page Object Model**: Maintainable test structure
- **Custom Commands**: Reusable test utilities
- **Multiple Reporters**: Mochawesome for beautiful HTML reports
- **CI/CD Ready**: GitHub Actions configuration included
- **Cross-browser Testing**: Chrome, Firefox, Edge support

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd cypress-bdd-framework

# Install dependencies
npm install
```

## 🎯 Running Tests
```bash
# Open Cypress Test Runner (Interactive Mode)
npm run cy:open

# Run all tests headlessly
npm test

# Run E2E tests only
npm run test:e2e

# Run API tests only
npm run test:api

# Run tests in specific browser
npm run test:chrome
npm run test:firefox

# Run with browser visible
npm run test:headed
```

## 📊 View Reports

After running tests:
```bash
npm run report
```

Reports are generated in `cypress/reports/html/index.html`

## 📁 Project Structure
cypress-bdd-framework/
├── cypress/
│   ├── e2e/
│   │   ├── features/          # Cucumber feature files
│   │   │   ├── e2e/           # E2E test scenarios
│   │   │   └── api/           # API test scenarios
│   │   └── step_definitions/  # Step implementations
│   ├── pages/                 # Page Object Models
│   ├── fixtures/              # Test data
│   └── support/               # Custom commands & setup
├── .github/workflows/         # CI/CD configuration
├── cypress.config.js          # Cypress configuration
└── package.json               #Dependencies & scripts

## 🧪 Test Coverage

### E2E Tests
- User authentication (login/logout)
- Shopping cart functionality
- Complete checkout process
- Data-driven testing

### API Tests
- CRUD operations (GET, POST, PUT, PATCH, DELETE)
- Response validation
- Error handling
- Schema validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📧 Contact

Your Name - your.email@example.com
GitHub: @yourusername

---
⭐ If this project helped you, please give it a star!# cypress-bdd-framework
