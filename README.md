# MyPsW

MyPsW is a simple password manager built with React and Vite. It lets users save website credentials, view them securely, copy them quickly, and edit or delete entries when needed.

## Features

- Save a URL, username, and password
- Show or hide passwords in the form and password table
- Copy username or password with one click
- Edit existing saved credentials
- Delete saved credentials
- Store data locally in the browser using localStorage
- Responsive interface with a clean modern design

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Hook Form
- React Toastify
- UUID

## Project Structure

- src/App.jsx: main application logic and UI
- src/components/Navbar.jsx: top navigation bar
- src/components/Footer.jsx: footer component
- public/: static assets and images

## Notes

Saved passwords are stored in the browser's localStorage, so they will remain available until browser data is cleared.
