# Requirements Analysis

Purpose: An app that shows details from different internet/data providers, and simulating the data flow, form submission and feedback triggers.

## Functional Requirements

1. **Data Provider Integration**: The app must integrate with multiple data providers to fetch and display information, fetching data from a mock API endpoint.
2. **User Interface**: The app should follow the design guidelines provided from the figma file, ensuring a consistent and user-friendly interface.
3. **Form Submission**: The app should allow users to submit forms with different fields and data types.
4. **Feedback Mechanism**: The app should trigger a feedback modal upon form submission, displaying the results of the submission and any errors encountered.

## Non-Functional Requirements

1. **Performance**: The app should load data quickly and efficiently.
2. **Scalability**: The app must be able to handle an increasing number of users and data sources.
3. **State-Management**: The app should maintain the state of the data and user interactions effectively, ensuring a smooth user experience.
4. **Usability**: The app should be easy to use and accessible to a wide range of users.


### Assumptions
- The app will be built using React and TypeScript.
- The app must be responsive and work on various screen sizes, including mobile devices.
- The mock API endpoint will return data in a consistent format.
- The design will be provided in a Figma file, which will be used as a reference for the user interface.
- The app will be tested on modern web browsers.
- The state management will be handled using a library called Redux.
- Should show modularity in the codebase, allowing for easy updates and maintenance.
- Should show code reusability, especially in components that handle form submissions and feedback modals.

### Constraints
- The app must be developed within a specified timeframe.
- The app must adhere to the design specifications provided in the Figma file.
- No API provided, so a mock API will be used for data fetching and submission.

## Functionalities

- Should show a table in the dashboard with data fetched from the mock API.
- The table should be scrollable
- Upon clicking Get Started, a modal should appear with a form.
- The forms should have various fields, should have validation, and should be able to submit data to a mock API.
- The forms should be dynamic, allowing for different data types and fields based on the selected data provider.
- After form submission, a feedback modal should appear showing the results of the submission.

## Tech Stack

- Vite
- React
- TypeScript
- Redux
- Tailwind CSS

### Libraries and Tools

- RTK Query for data fetching and state management.
- React Hook Form for form handling and validation.
- Yup for schema validation.