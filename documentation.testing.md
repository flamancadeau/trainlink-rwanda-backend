# TrainLink Rwanda API Documentation

# This API allows Trainees and Companies to interact with the TrainLink platform for managing user profiles, internships, and applications.

1. User Creation
1.1 Create User (POST)

Endpoint: http://localhost:5000/api/v1/user

Description: Creates a new user (Trainee or Company).

Example Request (Trainee Role):
{
  "username": "john_trainee",
  "email": "john@example.com",
  "password": "password123",
  "role": "Trainee",
  "phoneNumber": 250788123456,
  "address": "Kigali, Rwanda"
}

Example Request (Company Role):
{
  "username": "tech_company",
  "email": "hr@techcompany.com",
  "password": "company123",
  "role": "Company",
  "phoneNumber": 250788987654,
  "address": "Kigali, Rwanda"
}

1.2 Login User (POST)

Endpoint: http://localhost:5000/api/v1/user/login

Description: Logs in a user and returns an authentication token.

2. User Profile Management
2.1 Get User Profile (GET)

Endpoint: http://localhost:5000/api/user/profile

Description: Retrieves the profile of the logged-in user.

Authorization: Bearer YOUR_TOKEN_HERE

2.2 Update Trainee Profile (PUT)

Endpoint: http://localhost:5000/api/v1/trainee/TRAINEE_ID

Description: Updates the profile details of a trainee.

Authorization: Bearer YOUR_TOKEN_HERE

Content-Type: application/json

Example Request:
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2000-01-01",
  "gender": "Male",
  "location": "Kigali, Rwanda",
  "educationLevel": "Bachelor",
  "skills": ["JavaScript", "React", "Node.js"],
  "interests": ["Coding", "Reading", "Music"]
}

2.3 Upload Resume (POST)

Endpoint: http://localhost:5000/api/v1/trainee/TRAINEE_ID/resume

Description: Uploads a resume for a trainee.

Authorization: Bearer YOUR_TOKEN_HERE

Content-Type: multipart/form-data

3. Company Management
3.1 Create Company (POST)

Endpoint: http://localhost:5000/api/v1/company

Description: Creates a new company profile.

Authorization: Bearer YOUR_COMPANY_TOKEN

Content-Type: application/json

Example Request:
{
  "companyName": "Tech Innovators Ltd",
  "companyDescription": "Leading technology company",
  "industryType": "Tech",
  "companyWebsiteUrl": "https://techinnovators.rw",
  "companyLocation": "Kigali, Rwanda",
  "contactEmail": "contact@techinnovators.rw"
}

3.2 Get All Companies (GET)

Endpoint: http://localhost:5000/api/v1/company

Description: Retrieves a list of all companies.

Authorization: Bearer YOUR_COMPANY_TOKEN

4. Internship Management
4.1 Create Internship (POST)

Endpoint: http://localhost:5000/api/v1/intership

Description: Creates an internship listing.

Authorization: Bearer YOUR_COMPANY_TOKEN

Content-Type: application/json

Example Request:
{
  "companyId": "COMPANY_UUID",
  "title": "Full Stack Developer Intern",
  "description": "Join our team to build amazing applications",
  "location": "Kigali, Rwanda",
  "startDate": "2026-03-01",
  "endDate": "2026-08-31",
  "applicationDeadline": "2026-02-15",
  "skillsRequired": ["JavaScript", "React", "Node.js"]
}

4.2 Get All Internships (GET)

Endpoint: http://localhost:5000/api/v1/intership

Description: Retrieves a list of all internships.

Authorization: Bearer YOUR_COMPANY_TOKEN

5. Application Management
5.1 Apply for Internship (POST)

Endpoint: http://localhost:5000/api/v1/application

Description: A trainee applies for an internship.

Authorization: Bearer YOUR_TRAINEE_TOKEN

Content-Type: application/json

Example Request:
{
  "traineeId": "TRAINEE_UUID",
  "internshipId": "INTERNSHIP_UUID"
}

5.2 Get Applications by Trainee (GET)

Endpoint: http://localhost:5000/api/application/trainee/TRAINEE_UUID

Description: Retrieves all applications made by a specific trainee.

Authorization: Bearer YOUR_TOKEN

5.3 Update Application Status (PUT)

Endpoint: http://localhost:5000/api/v1/application/APPLICATION_ID/status

Description: Updates the status of a trainee's application.

Authorization: Bearer YOUR_COMPANY_TOKEN

Content-Type: application/json

Example Request:
{
  "status": "Accepted"
}