# Backend Task

## 📌 Overview
This is a **backend** that enables users to **view job listings** and **apply for jobs**. It integrates **PostgreSQL** for managing job postings, **MongoDB** for storing job applications, and **GraphQL** for efficient API queries. The frontend is built with **HTML, CSS, and JavaScript**, providing a seamless user experience.

## 🚀 Features
- **Job Listings**: Fetch job postings from PostgreSQL.
- **Job Applications**: Submit applications, stored in MongoDB.
- **GraphQL API**: Efficient querying of jobs and applications.
- **REST API**: Additional backend functionalities.
- **Responsive Frontend**: Modern UI built with HTML, CSS, and JavaScript.
- **Security**: Uses CORS and Helmet for security enhancements.

## 🛠 Backend Setup
### 1️⃣ Install Dependencies
Navigate to the backend directory and install dependencies:
```sh
cd backend
npm install
```
### 2️⃣ Configure Environment Variables
Create a `.env` file inside `backend/` and configure the following:
```
PORT=5000
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=job_board
DB_PASSWORD=your_postgres_password
DB_PORT=5432
MONGO_URI=your_mongouri
```
### 3️⃣ Set Up Databases
#### **PostgreSQL (Jobs Table)**
```sql
CREATE DATABASE job-task;

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```
#### **MongoDB (Applications Collection)**
```sh
mongosh
use job-task
```

### 4️⃣ Start the Backend Server
```sh
node server.js
```
✅ The backend should now be running at `http://localhost:5000`

---

## 🎨 Frontend Setup
### 1️⃣ Open `index.html` in a Browser
- **Option 1:** Open `index.html` manually in a browser.
- **Option 2:** Start a local server:
```sh
npx serve .
```

✅ Now you can **view jobs** and **submit applications**.

---

## 🔗 API Endpoints & Postman Testing
### **GraphQL API (`http://localhost:5000/graphql`)**
#### **➤ Get All Jobs** (POST request in Postman)
```json
{
  "query": "query { jobs { id title company location } }"
}
```
#### **➤ Get a Specific Job**
```json
{
  "query": "query { job(id: 1) { title description company location } }"
}
```
#### **➤ Apply for a Job**
```json
{
  "query": "mutation { applyForJob(job_id: "1", applicant_name: "Naveen", applicant_email: "naveen@example.com", cover_letter: """I'm interested in this job!""") { id applicant_name applicant_email } }"
}
```

## 🚀 Deployment Guide
### **Backend Deployment**
1. **Deploy PostgreSQL & MongoDB on a cloud provider**
2. **Use a Node.js hosting platform (e.g., Heroku, AWS, Vercel)**
3. **Set up `.env` variables on the hosting platform**
4. **Run the server**
```sh
node server.js
```

### **Frontend Deployment**
1. **Use Netlify, Vercel, or GitHub Pages**
2. **Deploy the frontend directory**

---

## 🛡 Security Measures
- **CORS enabled** for cross-origin requests.
- **Helmet** to secure HTTP headers.
- **Environment variables** used for sensitive information.

---

## 📜 License
This project is open-source and available for modification and use under the MIT License.

---

## 📌 Conclusion
This backend is a fully functional, hybrid database solution using **PostgreSQL for job listings** and **MongoDB for job applications**, integrated via **GraphQL** for efficient data querying. 🚀🔥

For any improvements or contributions, feel free to open a pull request! 😊

