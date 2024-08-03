# Blogs

## Overview

"Blogs" is a simple web application built using Node.js, Express, and PostgreSQL. The application allows users to create, read, update, and delete (CRUD) blog posts and comments.

## Features

- **Create Blog Posts**: Users can create new blog posts with a title and content.
- **View Blog Posts**: Users can view a list of all blog posts and individual posts.
- **Update Blog Posts**: Users can edit existing blog posts.
- **Delete Blog Posts**: Users can delete blog posts.
- **Comment on Blog Posts**: Users can add comments to individual blog posts.

## Technology Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd blogs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup the database:**

   - Create a PostgreSQL database and update the database configuration in `config.js` or `.env`.

4. **Run the application:**

   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:3005`.

## API Endpoints

### Blog Posts

- **GET** `/api/posts` - Get all blog posts
- **GET** `/api/posts/:id` - Get a single blog post by ID
- **POST** `/api/posts` - Create a new blog post
- **PUT** `/api/posts/:id` - Update an existing blog post by ID
- **DELETE** `/api/posts/:id` - Delete a blog post by ID

### Comments

- **GET** `/api/posts/:postId/comments` - Get all comments for a blog post
- **POST** `/api/posts/:postId/comments` - Add a comment to a blog post
- **DELETE** `/api/comments/:commentId` - Delete a comment by ID

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please contact [Your Name] at [Your Email].
