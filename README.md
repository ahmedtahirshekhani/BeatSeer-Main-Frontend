Project Setup and Running Guide

Overview

This project consists of two parts:
1. Next.js Frontend: A React-based frontend application built with Next.js.
2. Python Backend: A Python-based backend script that handles API requests and business logic.

This README will guide you through the process of setting up and running both parts of the project.

---------
Prerequisites

Before you start, ensure you have the following installed on your machine:

- Node.js (v16.x or higher) for the frontend (Next.js)
- npm (package managers)
- Python 3.x for the backend
- pip (Python package manager)

---------

1. Frontend (Next.js)

Step 1: Extract and Navigate to the Frontend Folder

    1. Extract the Next.js project rar file to your preferred directory.
    2. Open the project folder in VS-CODE or any code editor.

Step 2: Install Dependencies

    Open terminal and Run the following command to install the required dependencies:
    npm install

Step 3: Start the Development Server

    Run the following command to start the Next.js development server:

        npm run dev


By default, the application will be available at [http://localhost:3000](http://localhost:3000).

------------
------------

2. Backend (Python Script)

    Step 1: Extract and Navigate to the Backend Folder

    1. Extract the Python backend zip file to your preferred directory.
    2. Open the project folder in VS-CODE or any code editor.

    Step 2: Create a Virtual Environment

    It is recommended to use a virtual environment for the Python project. Run the following command to create and activate a virtual environment:

    python3 -m venv venv

    Activate the virtual environment:

    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On MacOS/Linux:
        ```bash
        source venv/bin/activate
    ```

    Step 3: Install Dependencies

    Run the following command to install the required Python dependencies:

    pip install spotipy requests pandas beautifulsoup4 fastapi uvicorn anthropic


    Step 4: Run the Backend Server

    To start the Python backend, use the following command:

    uvicorn main:app --reload

    By default, the backend will be available at [http://localhost:5000](http://localhost:5000) or another specified port.

----------
----------

 4. Test the Application

- Open your browser and navigate to http://localhost:3000 to see the user frontend in action.
- Open your browser and navigate to http://localhost:3000/admin to see the admin frontend in action.

Once the frontend and backend are up and running, you should have a fully functional application. If you have any questions or issues during setup, feel free to reach out for support.
