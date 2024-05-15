# TechTalesCMSStudio

## Description

Welcome to the TechTales CMSS tudio, a CMS-style platform built from scratch where developers can share and discuss their thoughts, experiences, and insights on technology. This blog follows the MVC paradigm, utilizing Handlebars.js for dynamic views, Sequelize as the ORM, and express-session for secure authentication.

## Features

- User Authentication (Login/Signup with secure password hashing)
- Session Management for automatic logouts after idle periods
- Create, read, update, and delete (CRUD) operations on blog posts
- Comment on posts
- Responsive design for various devices

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL
- Handlebars.js (Templating Engine)
- CSS (with responsive design considerations)
- bcrypt for password hashing
- dotenv for environment variable management
- express-session and connect-session-sequelize for session management

## Installation
To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://your-repository-url-here
cd TechTalesCMSStudio
npm install

## Usage
To run the application, you need to set up the environment variables and start the server:

Create a .env file in the root directory with the following content:
- DB_NAME='tech_blog_db'
- DB_USER='your_username'
- DB_PW='your_password'
- SESSION_SECRET='your_secret'

## Closing Thoughts

Thank you for visiting the TechTalesCMSStudio.Hope this platform serves as a valuable tool for sharing your technical knowledge and experiences. Whether you're here to find insights or contribute, your participation helps nurture a diverse and informative tech community. I look forward to seeing your contributions and encourage you to reach out with any suggestions or feedback to continually improve this community-driven project.

### Happy coding!







