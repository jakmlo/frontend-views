import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const names = [
  "Jan",
  "Anna",
  "Adam",
  "Katarzyna",
  "Piotr",
  "Magdalena",
  "Tomasz",
  "Ewa",
  "Michał",
  "Monika",
  "Marcin",
  "Aleksandra",
  "Robert",
  "Dominika",
  "Kamil",
  "Weronika",
  "Grzegorz",
  "Karolina",
  "Maciej",
  "Natalia",
  "Patryk",
  "Martyna",
  "Bartosz",
  "Marta",
  "Rafał",
  "Julia",
  "Sebastian",
  "Oliwia",
  "Dawid",
  "Justyna",
];

function createData(
  id: string,
  name: string,
  age: number,
  birthDate: Date,
  bio: string
) {
  return { id, name, age, birthDate, bio };
}

const rowsData = names.slice(0, 30).map((name, index) => {
  const age = Math.floor(Math.random() * 50) + 20;
  const birthDate = new Date("2000-01-01");
  const bio = `To jest użytkownik ${index + 1}.`;
  const id = uuidv4();
  return createData(id, name, age, birthDate, bio);
});

export interface User {
  id: string;
  name: string;
  age: number;
  birthDate: Date;
  bio: string;
}

export interface UserState {
  users: User[];
  selectedRows: string[];
  selectedRow: string;
  page: number;
  rowsPerPage: number;
}

const initialState: UserState = {
  users: [...rowsData],
  selectedRows: [],
  selectedRow: "",
  page: 0,
  rowsPerPage: 10,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    editUser: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          ...action.payload,
        };
      }
    },
    selectRow: (state, action: PayloadAction<string>) => {
      state.selectedRow = action.payload;
    },
    toggleUserSelection: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const isSelected = state.selectedRows.includes(userId);

      if (isSelected) {
        state.selectedRows = state.selectedRows.filter((id) => id !== userId);
      } else {
        state.selectedRows.push(userId);
      }
    },
    selectSelectedRows: (state, action: PayloadAction<string[]>) => {
      state.selectedRows = action.payload;
    },
    deleteSelectedRows: (state) => {
      state.users = state.users.filter(
        (row) => !state.selectedRows.includes(row.id)
      );
      state.selectedRows = [];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  removeUser,
  editUser,
  addUser,
  toggleUserSelection,
  selectRow,
  setRowsPerPage,
  setPage,
  deleteSelectedRows,
  selectSelectedRows,
} = usersSlice.actions;

export default usersSlice.reducer;
