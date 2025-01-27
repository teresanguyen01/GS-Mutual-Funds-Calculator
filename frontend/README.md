# **Goldman Sachs Mutual Funds Dashboard - Frontend**

## **Table of Contents**
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Pages Overview](#pages-overview)
5. [Setup and Installation](#setup-and-installation)
6. [Extra Comments](#extra-comments)

---

## **Overview**
The Goldman Sachs Mutual Funds Dashboard is a web application designed to help users calculate and track the future value of their mutual fund investments. The frontend of this application is built using Angular, leveraging its component-based architecture to ensure modularity and scalability. The application is styled using SCSS, and it interacts with the backend via HTTP requests to fetch investment data.

---

## **Technology Stack**

- **VS Code** (IDE - tried to use IntelliJ but I didn't want to pay hundreds of dollars...)
- **Angular** (Framework for building web applications)
- **TypeScript** (Superset of JavaScript to add type safety and additional features)
- **SCSS** (Preprocessor for CSS to enhance styling capabilities)
- **Node.js & npm** (Node Package Manager for dependency management)
- **HTML5** (Markup language for structuring content)
- **HTTPClient (Angular)** (For making API requests to the backend)

---

## **Architecture**

The frontend follows a **component-based architecture** to enhance code reusability, maintainability, and scalability.

### **Design and Development Process**
1. **Planning Phase:**
    - The UI was designed using [Canva (See design here)](https://www.canva.com/design/DAGcys88KN0/Ap0ZkgkAebDgqAJZbwEXgg/edit?utm_content=DAGcys88KN0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).
    - While learning Angular and Node.js, inspiration was drawn from various resources, such as this helpful [YouTube tutorial](https://www.youtube.com/watch?v=MiwEIw7tDoc) that influenced component (specifically header) design.

2. **Component Structure:**
    - Each page in the application is designed as an **Angular component**, allowing easy navigation and encapsulation of logic and styling.
    - A **Header component** was created separately to provide consistent navigation across all pages.

3. **Styling Approach:**
    - SCSS was chosen for styling due to its flexibility and features such as nesting and mixins. Also I am more comfortable with using it when making the app...
    - Each page's layout was divided into sections called **"containers"**, making it easier to manage and apply styles.

4. **Integration with Backend:**
    - Once the backend was completed, API integration was implemented in the frontend.
    - HTTP requests were made via Angular's `HttpClient` module in the `calculator` component to fetch investment data.
    - User inputs in the HTML template were bound to TypeScript variables using Angular's `[(ngModel)]` directive.

5. **Module Structure:**
    - The application's structure is defined in `app.module.ts`, which serves as the root module and registers all the necessary components and services.
    - All components except for the calculator page were declared as **standalone components** to optimize performance and streamline the application.

---

## **Pages Overview**

The application consists of the following pages:

1. **Header Component:**
    - Contains the application title and navigation buttons to switch between pages.
    - Clicking on the title redirects the user to the home page.

2. **Home Page:**
    - A simple welcome page that provides an introduction to the application.

3. **About Page:**
    - Provides an overview of the application and its purpose.

4. **Calculator Page:**
    - The core functionality of the application where users can:
      - Select a mutual fund.
      - Enter an initial investment amount.
      - Choose a time horizon.
      - Calculate the future value of their investment.
    - The calculation is performed via an API call to the backend.

5. **Spreadsheet Page:**
    - Users can save their calculated investments, including:
      - Mutual fund type.
      - Initial investment value.
      - Time horizon.
      - Future value for future reference.

---

## **Setup and Installation**

Follow these steps to run the frontend locally:

### **Prerequisites:**
- Ensure you have the following installed on your system:
  - **Node.js** (recommended version: 16.x or later)  
    [Download here](https://nodejs.org/)
  - **Angular CLI** (install via npm if not already installed)
    ```bash
    npm install -g @angular/cli
    ```

### **Installation Steps:**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/teresanguyen01/GS-Mutual-Funds-Calculator.git
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd GS-Mutual-Funds-Calculator/frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   ng serve
   ```

5. **Access the application in your browser (This should also appear in your terminal):**
   ```
   http://localhost:4200
   ```

---

## **Extra Comments**

- If you encounter any issues with missing dependencies, try running:

  ```bash
  npm install
  ```

- If the Angular CLI is not recognized, ensure it is installed globally:

  ```bash
  npm install -g @angular/cli
  ```

- The frontend is configured to communicate with the backend running on `http://localhost:8080`. Ensure the backend is running before using the calculator page.

---

## **Future Improvements**

Will edit later...

---

## **Contributors**

