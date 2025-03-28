# Blog Website Development

## Project Overview

Welcome to the Blog Website Development project! This repository includes the client and server-side code for creating a dynamic and user-friendly blog platform using modern technologies like React, Firebase, and MongoDB.

## Purpose

The purpose of this project is to build a fully responsive blog website that offers users the ability to browse, create, update, and interact with blogs. The platform emphasizes a seamless user experience, robust authentication, and performance optimization.

## Live URL

https://echo-blogs.netlify.app/

---

## Key Features

### General Features

- **Fully Responsive Design**: Compatible with mobile, tablet, and desktop devices.
- **Secure Environment Configuration**: Firebase and MongoDB credentials are securely stored using environment variables.
- **Modern Design**: Clean and recruiter-friendly UI with appropriate alignment, spacing, and color contrast.

### Core Pages

- **Home Page**:
  - Hero section, recent blog posts, newsletter signup, and additional creative sections.
  - Includes six recent blogs with options to add to wishlist or view details.
  - Interactive newsletter signup with toast messages.
- **All Blogs Page**:
  - Displays all blogs with filtering and search functionality.
  - Includes category filtering and MongoDB text search.
- **Blog Details Page**:
  - Displays complete blog details with a comment section.
  - Logged-in users can comment (except on their blogs) and edit their blogs.
- **Add Blog Page**:
  - Form to create blogs with fields for title, image URL, category, descriptions, etc.
- **Update Blog Page**:
  - Pre-filled form for blog updates, accessible only to blog owners.
- **Featured Blogs Page**:
  - Table displaying top 10 blogs by word count using sortable columns.
- **Wishlist Page**:
  - Shows wishlisted blogs with options to view details or remove from the wishlist.

### Authentication

- Email/password-based authentication with error handling.
- Social login using Google.
- JWT authentication for securing private routes.

### Additional Features

- **Loading Skeletons**: Improves UX during data fetching.
- **Photo View**: Full-screen image preview on blog images.
- **Framer Motion**: Animations on the homepage.
- **Intersection Observer**: Animations triggered by user viewport.
- **Data Table**: Sortable columns using Tanstack Table.

---

## Technologies Used

### Front-End

- **React**: UI development
- **React Router**: Navigation
- **Tanstack Table**: Advanced table features
- **Chakra-UI**: Component library
- **Framer Motion**: Animations
- **React-Photo-View**: Image previews

### Back-End

- **Node.js**: Server-side logic
- **Express.js**: Web framework
- **MongoDB**: Database

### Authentication & Deployment

- **Firebase**: Authentication and hosting
- **JWT**: Token-based authentication
- **Environment Variables**: Securing sensitive information

---

## Deployment Guidelines

1. Ensure both client and server are deployed.
2. Use Netlify, Surge, or other services for the client.
3. Add your domain for Firebase authorization.
4. Ensure no errors (CORS/404/504) in production.

---

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- Firebase project setup

### Installation

1. Clone the repositories:
   ```bash
   git clone <client-repo-url>
   git clone <server-repo-url>
   ```
2. Navigate to each directory and install dependencies:
   ```bash
   npm install
   ```
3. Set up `.env` files:

   - **Client**: Firebase config keys.
   - **Server**: MongoDB URI and JWT secret.

4. Start the development servers:
   ```bash
   npm start
   ```

---


## Author

[Name] (Sahabul Islam Sifat)

## License

This project is licensed under the MIT License.
