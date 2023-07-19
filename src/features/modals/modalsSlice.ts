import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  showAddFormModal: boolean;
  showEditFormModal: boolean;
}

const initialState: ModalState = {
  showAddFormModal: false,
  showEditFormModal: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openAddFormModal: (state) => {
      state.showAddFormModal = true;
    },
    closeAddFormModal: (state) => {
      state.showAddFormModal = false;
    },
    openEditFormModal: (state) => {
      state.showEditFormModal = true;
    },
    closeEditFormModal: (state) => {
      state.showEditFormModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openAddFormModal,
  closeAddFormModal,
  openEditFormModal,
  closeEditFormModal,
} = modalSlice.actions;

export default modalSlice.reducer;
