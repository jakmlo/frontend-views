# A web application for entering and visualizing data

## Routing:
  - Two pages (/main, /views).
  - page navigation (menu-header), which does not require reloading.

Additionally, the invalid URL should return a 404 page.

## Table with:
  - pagination
  - a checkbox in each row for group deletion of elements and a delete button under the table
  - table columns: name, age, date of birth, bio, action (delete and edit button)

## A form for entering/editing data in which you can complete the following data:
  - First name (string, required)
  - Age (integer, required)
  - Date of birth - date picker (date, required)
  - Bio (string, max. 250 characters, optional)

The data entered into the form should be validated using the zod library. In addition, the entered data should be in the table and should be saved in the Redux store.

## On the other page

  - component that would display data retrieved from the Redux store using a grid layout (4 cards in a row).

## Used technology

  - React 18+
  - Material UI
  - React Router
  - React Hook Form
  - Redux Toolkit
  - Zod
  - SCSS
  - TypeScript
