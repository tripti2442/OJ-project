# OJ-Project

## Online Judge Platform

The Online Judge platform allows users to solve coding problems, run their solutions against various test cases, and receive verdicts. Additionally, it provides administrative functionalities for managing the platform. Protected routes ensure that only authorized users can access certain features.

## User Features

### Problem Solving

- **Browse Problems**: Users can view a list of available coding problems.
- **Submit Solutions**: Users can submit their solutions for problems.
- **Run Against Test Cases**: Submitted solutions are executed against predefined test cases.
- **Receive Verdicts**: Users receive feedback on whether their solution passed or failed the test cases.
- **Custom Input Execution**: Users can run their solutions against custom inputs and receive outputs.

## Admin Features (Protected Routes)

### Manage Problems

- **Add Questions**: Admins can add new coding problems to the platform.
- **Update Questions**: Admins can update existing problems.
- **Delete Questions**: Admins can remove problems from the platform.

### Manage Test Cases

- **Add and View Test Cases**: Admins can add test cases for coding problems.


## Implementation Details

### Protected Routes

- **Authentication**: Users and admins must authenticate to access the platform. Authentication tokens (e.g., JWT) can be used to secure routes.
- **Authorization**: Only users with admin roles can access routes related to managing problems and test cases. Middleware can be implemented to check user roles before allowing access to these routes.


## Setup Instructions

### Prerequisites

- Node.js installed
- npm (Node Package Manager) installed

### Frontend

1. Navigate to the `frontend` directory:

    ```sh
    cd frontend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Start the frontend development server:

    ```sh
    npm start
    ```

    This will start the frontend server, typically accessible at `http://localhost:3000`.

### Backend

1. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Start the backend server:

    ```sh
    node index.js
    ```

    This will start the backend server, typically accessible at `http://localhost:3001` (or another port you have configured).

## Running the Application

After starting both the frontend and backend servers, you can access the Online Judge platform by navigating to the frontend URL in your web browser (e.g., `http://localhost:3000`).
