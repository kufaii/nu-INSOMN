# This is a fork of phase 2 project for public viewing
Since original repo isnt available for public, im creating this fork solely for showcasing my pas project

# Individual Project Phase 2

## API Documentation

### Authentication

#### `POST /login`

Authenticate a user.

- **URL:** `http://localhost:3000/login`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string): User's email address (e.g., `admin@admin.com`)
  - `password` (string): User's password (e.g., `admin123`)
- **Response:** 200 {data: access_token}

#### `POST /register`

Register a new user.

- **URL:** `http://localhost:3000/register`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string): User's email address (e.g., `user2@mail.com`)
  - `password` (string): User's password (e.g., `user123`)
  - `username` (string): User's username
- **Response:** 200 {data: access_token}

### Posts

#### `GET /post`

Retrieve all posts.

- **URL:** `http://localhost:3000/post`
- **Method:** `GET`
- **Authorization:** Bearer Token
- **Response:** 200 {data: {allPost}}

#### `GET /post/top5`

Retrieve top 5 posts.

- **URL:** `http://localhost:3000/post/top5`
- **Method:** `GET`
- **Authorization:** Bearer Token
- **Response:** 200 {data: {allPost}}

#### `GET /post/follow`

Retrieve posts followed by the user.

- **URL:** `http://localhost:3000/post/follow`
- **Method:** `GET`
- **Authorization:** Bearer Token
- **Response:** 200 {data: {allPost}}

#### `GET /post/:id`

Retrieve a post by ID.

- **URL:** `http://localhost:3000/post/:id`
- **Method:** `GET`
- **Authorization:** Bearer Token
- **Path Parameters:**
  - `id` (number): ID of the post
- **Response:** Post details

#### `POST /post`

Create a new post.

- **URL:** `http://localhost:3000/post`
- **Method:** `POST`
- **Authorization:** Bearer Token
- **Body Parameters:**
  - `title` (string): Title of the post
  - `CategoryId` (number): ID of the category for the post
- **Response:** Created post details

#### `DELETE /post/:id`

Delete a post by ID.

- **URL:** `http://localhost:3000/post/:id`
- **Method:** `DELETE`
- **Authorization:** Bearer Token
- **Path Parameters:**
  - `id` (number): ID of the post to delete

### Categories

#### `GET /category`

Retrieve all categories.

- **URL:** `http://localhost:3000/category`
- **Method:** `GET`
- **Authorization:** Bearer Token
- **Response:** List of categories

#### `GET /category/:id`

Retrieve posts under a specific category.

- **URL:** `http://localhost:3000/category/:id`
- **Method:** `GET`
- **Authorization:** Bearer Token
- **Path Parameters:**
  - `id` (number): ID of the category
- **Response:** Posts in the specified category

### Comments

#### `GET /comment/:id`

Retrieve comments for a post.

- **URL:** `http://localhost:3000/comment/:id`
- **Method:** `GET`
- **Authorization:** Bearer Token
- **Path Parameters:**
  - `id` (number): ID of the post
- **Response:** List of comments

#### `POST /comment/:id`

Add a new comment to a post.

- **URL:** `http://localhost:3000/comment/:id`
- **Method:** `POST`
- **Authorization:** Bearer Token
- **Path Parameters:**
  - `id` (number): ID of the post
- **Body Parameters:**
  - `content` (string): Content of the comment
  - `CommentId` (number): ID of the parent comment (if replying)

### Users

#### `GET /user`

Retrieve user details.

- **URL:** `http://localhost:3000/user`
- **Method:** `GET`
- **Authorization:** Bearer Token
- **Response:** User details

#### `PUT /user/:id`

Update user details.

- **URL:** `http://localhost:3000/user/:id`
- **Method:** `PUT`
- **Authorization:** Bearer Token
- **Path Parameters:**
  - `id` (number): ID of the user to update
- **Body Parameters:**
  - `username` (string): New username for the user

### Follows

#### `POST /category/:id/follow`

Follow a category.

- **URL:** `http://localhost:3000/category/:id/follow`
- **Method:** `POST`
- **Authorization:** Bearer Token
- **Path Parameters:**
  - `id` (number): ID of the category to follow

#### `DELETE /category/:id/follow`

Unfollow a category.

- **URL:** `http://localhost:3000/category/:id/follow`
- **Method:** `DELETE`
- **Authorization:** Bearer Token
- **Path Parameters:**
  - `id` (number): ID of the category to unfollow

### Voting

#### `PUT /post/:id/vote`

Vote on a post.

- **URL:** `http://localhost:3000/post/:id/vote`
- **Method:** `PUT`
- **Authorization:** Bearer Token
- **Path Parameters:**
  - `id` (number): ID of the post
- **Body Parameters:**
  - `vote` (number): Vote value (`1` or `-1`)

### Miscellaneous

#### `GET /images`

Retrieve images.

- **URL:** `http://localhost:3000/images`
- **Method:** `GET`
- **Authorization:** Bearer Token
