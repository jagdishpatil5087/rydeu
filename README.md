Installation

Clone the repository
git clone https://github.com/your-username/your-repo.git

Install dependencies
npm install

Run the app
npm run start

Open the app on your device
Use the Expo Go app to scan the QR code displayed in the terminal or browser.

Email: rydeu@email10p.org
Password: 123456





React Native Mobile App Assignment

Project Overview
This is a React Native mobile application built as part of a developer assignment. The app includes a login screen, a home screen with navigation, a custom date and time picker using Moment.js, and state management with Redux**.  

The app is developed using React Native Expo

---

Features

Login Screen
- Login screen with **username/email** and **password** input fields.
- Login button authenticates the user via the API.
- First-time users are directed to the login page.

Home Screen
- Displays user's information in the header.
- Includes a **custom date and time picker** with a 6-month calendar built using **Moment.js**.
- Users can select a date and time and see it displayed on the screen.
- Logout button logs the user out and redirects them to the login screen.

Navigation
- Proper navigation implemented between **Login Screen** and **Home Screen** using **React Navigation**.

State Management
- State is managed with **Redux** to maintain user data, authentication status, and selected date/time.

---

API Integration

The login functionality is implemented using the following API:

```bash
curl --location 'https://new-api-staging.rydeu.com/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "rydeu@email10p.org",
    "password": "123456",
    "type": "customer"
}'

