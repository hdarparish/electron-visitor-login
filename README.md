# electron-visitor-login

The questions for the COVID questionnaire is available on https://covid-19.ontario.ca/self-assessment/symptoms

## Description

The  application wll take the data entered and store it into MSSQL database. The application will also send an email to the addresses provided.

## Libraries used

- mssql
- nodemailer
- sass

## Prerequisites

- MSSQL server
- node

## Instructions

Open the terminal and enter `npm install` to install all the dependencies

Create a .env file and add the following:
```
DB_USER=value
DB_PASSWORD=value
DB_HOST=value
DB_NAME=value
EMAIL_HOST=value
EMAIL_PORT=value
EMAIL_SECURE=value
EMAIL_USERNAME=value
EMAIL_PASSWORD=value
EMAIL_ACCOUNT=value
EMAIL_DISTRIBUTION=value
```

To start the project, open the terminal and enter either `npm start` or `npm run dev` for development mode

## Roadmap

- Dynamically add/remove COVID questions/questionnaire 

