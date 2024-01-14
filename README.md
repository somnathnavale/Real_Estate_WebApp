# Project Title: NextGen Estate (Real Estate WebSite)

## Description
NextGen Estate, a full-stack web application, empowers users to actively search, add, and manage properties across diverse categories and features. Employing a modern tech stack, it combines React with Redux-Toolkit for state management, Tailwind CSS for styling components, and Node.js with Express for the backend. MongoDB stores user profiles and properties, Firebase handles property images, and Nodemailer facilitates email notifications. Logging is efficiently managed through Winston. Location based Searching is achieved using Location IQ and GeoSpatial Searching using MongoDB, Integrated with GEMINI AI for automatic Property Description Generation Based on Filled Data. 

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies Used](#technologies-used)
4. [Folder Structure](#folder-structure)
5. [Features](#features)
6. [Troubleshooting](#troubleshooting)
7. [Contact Information](#contact-information)
8. [Acknowledgments](#acknowledgments)

## Installation
1. Clone the repository: `git https://github.com/somnathnavale/Real_Estate_WebApp.git`
2. Navigate to the project folder: `cd Real_Estate_WebApp`
3. Install dependencies:
   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`
4. Set up environment variables:
   - Create a `.env` file in the `client` directory with the necessary variables (see `.env.example` for reference)
   - Create a `.env` file in the `server` directory with the necessary variables (see `.env.example` for reference).
   - From Client `.env` file, for firebase refer [firebase project setup](https://firebase.google.com/docs/web/setup).
   - From Server `.env` file, for mongodb refer [mongodb database setup ](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/).
   - Server `.env` file, for email and password - add your email address and to create password -> go to google account -> select security option -> select 2-Step verification -> scroll down and select app password option -> create app and password will be auto generated, use that password
   - Server `.env` file, for GeoCode Key - sign up on location Iq, select Geocoding and create token
   - Server `.env` file, for GEMINI Key - sign In to on gemini ai, refer [gemini ai docs](https://ai.google.dev/tutorials/node_quickstart) 

## Usage
1. Start the backend server: `cd server && npm start`
3. In a separate terminal, start the frontend: `cd client && npm run dev`
4. Open your browser and navigate to `http://127.0.0.1:5173/` to use the application.

## Technologies Used
- Frontend: React, Redux-Toolkit, TalwindCSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Image Storage - Firbase
- GeoSpatial Location - Location IQ
- Email Notifications - Node Mailer
- Logger - Wiston 
- Description Generation - Gemini AI

## Folder Structure
- `/client`: Frontend codebase
- `/server`: Backend codebase

## Features
1. User authentication and authorization
2. Create, edit, and delete Properties
3. Filter and Search Properties
4. User profile management
5. Email Notifications
6. Geolocation Based Searching using mongoDB and Location IQ 
7. AI Based Description generator

## Troubleshooting
- If you encounter issues with authentication, ensure that your environment variables are correctly set.

## Contact Information
For questions or feedback, connect with me on [Linkedin](https://www.linkedin.com/in/somnathnavale/)

## Acknowledgments
### NPM Package Used 

1. Front-End
    - @reduxjs/toolkit
    - axios
    - firebase,
    - react,
    - react-dom,
    - react-icons,
    - react-image-file-resizer
    - react-redux
    - react-router-dom
    - markdown-to-jsx

2. Back-End 
    - bcryptjs
    - cookie-parser
    - cors
    - dotenv
    - express
    - jsonwebtoken
    - mongoose
    - nodemailer
    - winston
    - @google/generative-ai
