# TrainLink Rwanda - Backend API

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9fcbeba46daa49a9b9bfd09f5897dd29)](https://app.codacy.com/gh/flamancadeau/trainlink-rwanda-backend?utm_source=github.com&utm_medium=referral&utm_content=flamancadeau/trainlink-rwanda-backend&utm_campaign=Badge_Grade)
[![CircleCI](https://img.shields.io/circleci/build/github/flamancadeau/trainlink-rwanda-backend/main?style=flat-square)](https://circleci.com/gh/flaman/trainlink-rwanda-backend)
[![Coverage](https://img.shields.io/badge/coverage-check%20circleci-blue?style=flat-square)](https://circleci.com/gh/flamancadeau/trainlink-rwanda-backend)

This is the backend service for the **TrainLink Rwanda** application, which connects trainees with internship opportunities. This API is built with **Node.js**, **TypeScript**, **Express**, **PostgreSQL**, and uses **Cloudinary** for image uploads and **Nodemailer** for email notifications.

## 📋 Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Contributing](#contributing)

---

## 🚀 Installation

To get the project up and running on your local machine, follow the steps below:

### Prerequisites

- **Node.js** (v18.x or higher) - [Download Node.js](https://nodejs.org/en/download/)
- **PostgreSQL** (Local or cloud instance)
- **Cloudinary Account** (For image uploads)
- **Gmail Account** (For sending emails)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/trainlink-rwanda-backend.git
cd trainlink-rwanda-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Then edit the `.env` file with your configurations:
```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trainlink_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 4. Run database migrations
```bash
npx sequelize-cli db:migrate
```

### 5. (Optional) Seed the database
```bash
npx sequelize-cli db:seed:all
```

---

## ⚙️ Configuration

All configuration files are located in the `src/config/` directory:

- `database.config.js` - Database connection settings
- `cloudinary.config.ts` - Cloudinary configuration
- `environment.ts` - Environment variables
- `swagger.ts` - API documentation setup

---

## 🎯 Usage

### Development Mode
```bash
npm run dev
```

The server will start on `http://localhost:3000` with auto-reload enabled.

### Production Mode
```bash
npm start
```

### API Documentation

Once the server is running, visit:
```
http://localhost:3000/api-docs
```

---

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run tests in watch mode (for development)
```bash
npm run test:watch
```

## 📚 API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Trainees
- `GET /api/trainees` - Get all trainees
- `GET /api/trainees/:id` - Get trainee by ID
- `POST /api/trainees` - Create trainee profile
- `PUT /api/trainees/:id` - Update trainee
- `DELETE /api/trainees/:id` - Delete trainee

### Internships
- `GET /api/internships` - Get all internships
- `GET /api/internships/:id` - Get internship by ID
- `POST /api/internships` - Create internship
- `PUT /api/internships/:id` - Update internship
- `DELETE /api/internships/:id` - Delete internship

### Applications
- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get application by ID
- `POST /api/applications` - Submit application
- `PUT /api/applications/:id` - Update application status
- `DELETE /api/applications/:id` - Delete application

For complete API documentation with request/response examples, visit `/api-docs` when the server is running.

---

## 🏗️ Project Structure
```
trainlink-rwanda-backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── cloudinary.config.ts
│   │   ├── database.config.js
│   │   ├── database.ts
│   │   ├── environment.ts
│   │   └── swagger.ts
│   ├── controllers/         # Route controllers
│   │   ├── application.controller.ts
│   │   ├── company.controller.ts
│   │   ├── internship.controller.ts
│   │   ├── trainee.controller.ts
│   │   └── user.controller.ts
│   ├── database/            # Database layer
│   │   ├── migrations/      # Database migrations
│   │   ├── models/          # Sequelize models
│   │   └── seeders/         # Database seeders
│   ├── middlewares/         # Custom middlewares
│   │   ├── auth.middleware.ts
│   │   └── errorHandler.ts
│   ├── routes/              # API routes
│   │   ├── application.routes.ts
│   │   ├── company.routes.ts
│   │   ├── internship.routes.ts
│   │   ├── trainee.routes.ts
│   │   └── user.routes.ts
│   ├── services/            # Business logic
│   │   ├── application.service.ts
│   │   ├── company.service.ts
│   │   ├── internship.service.ts
│   │   ├── trainee.service.ts
│   │   └── user.service.ts
│   ├── utils/               # Utility functions
│   │   ├── apiResponse.ts
│   │   ├── AppError.ts
│   │   ├── index.ts
│   │   └── jwt.util.ts
│   ├── validators/          # Input validation
│   │   ├── application.validation.ts
│   │   ├── company.validation.ts
│   │   ├── internship.validation.ts
│   │   ├── trainee.validation.ts
│   │   └── user.validation.ts
│   ├── __tests__/           # Test files
│   │   ├── unit/
│   │   │   ├── utils/
│   │   │   ├── services/
│   │   │   └── validators/
│   │   └── integration/
│   └── serve.ts             # Application entry point
├── coverage/                # Test coverage reports
│   └── badges/              # Coverage badges
├── docs/                    # API documentation
├── .env                     # Environment variables (not in git)
├── .env.example             # Example environment file
├── .gitignore              # Git ignore rules
├── jest.config.js          # Jest configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

---

## 🛠️ Technologies

### Core
- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework

### Database
- **PostgreSQL** - Relational database
- **Sequelize** - ORM for database operations

### Authentication & Security
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing
- **express-rate-limit** - API rate limiting

### File Upload
- **Cloudinary** - Image storage and management
- **Multer** - File upload handling

### Email
- **Nodemailer** - Email sending

### Validation
- **Joi** - Schema validation

### Testing
- **Jest** - Testing framework
- **ts-jest** - TypeScript support for Jest
- **jest-coverage-badges** - Coverage badge generation

### Development
- **nodemon** - Auto-restart on file changes
- **ts-node** - TypeScript execution
- **swagger-ui-express** - API documentation

### Utilities
- **winston** - Logging
- **morgan** - HTTP request logging
- **dotenv** - Environment variable management
- **uuid** - Unique ID generation

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**

4. **Write/update tests**
```bash
npm test
```

5. **Commit your changes**
```bash
git commit -m 'Add some amazing feature'
```

6. **Push to the branch**
```bash
git push origin feature/amazing-feature
```

7. **Open a Pull Request**

### Coding Standards
- Write TypeScript with strict types
- Follow existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before PR

---

## 📝 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with auto-reload |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:badges` | Generate coverage badges |

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **Your Name** - *Initial work* - [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- TrainLink Rwanda Team
- All contributors who helped with this project
- Open source community

---

## 📞 Support

For support, email support@trainlink.rw or open an issue in the repository.

---

**Made with ❤️ in Rwanda**