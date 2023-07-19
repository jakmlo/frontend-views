import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { SetStateAction, useEffect, useState } from "react";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../features/page/pageSlice";

import {
  openAddFormModal,
  closeAddFormModal,
  openEditFormModal,
  closeEditFormModal,
} from "../features/modals/modalsSlice";
import {
  removeUser,
  editUser,
  addUser,
  toggleUserSelection,
  setRowsPerPage,
  setPage,
  deleteSelectedRows,
  selectSelectedRows,
  User,
} from "../features/users/usersSlice";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import personSchema from "../schemas/UserSchema";
import { v4 as uuidv4 } from "uuid";
import UsersTable from "../components/UsersTable";

type FormValues = z.infer<typeof personSchema>;

const Main = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [editedUser, setEditedUser] = useState("");
  const userData = useSelector((state: RootState) => state.users);
  const selectedUsers = useSelector(
    (state: RootState) => state.users.selectedRows
  );
  const { showAddFormModal, showEditFormModal } = useSelector(
    (state: RootState) => state.modals
  );

  const { formState, handleSubmit, register, control, reset } =
    useForm<FormValues>({
      resolver: zodResolver(personSchema),
      defaultValues: {
        name: "",
        age: 0,
        birthDate: new Date(),
        bio: "",
      },
      mode: "onTouched",
    });

  const { errors, isSubmitSuccessful } = formState;

  const dispatch = useDispatch();

  useEffect(() => {
    const newStartIndex = page * rowsPerPage;
    const newEndIndex = newStartIndex + rowsPerPage;
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      handleCloseAddFormModal();
      handleCloseEditFormModal();
    }
  }, [isSubmitSuccessful]);

  const handleChangePage = (_e: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: { target: { value: string } }) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    dispatch(removeUser(id));
  };

  const handleToggleUser = (userId: string) => {
    dispatch(toggleUserSelection(userId));
  };

  const handleOpenAddFormModal = () => {
    dispatch(openAddFormModal());
  };

  const handleCloseAddFormModal = () => {
    dispatch(closeAddFormModal());
    reset();
  };

  const handleCloseEditFormModal = () => {
    dispatch(closeEditFormModal());
  };

  const onSubmit = (data: FormValues) => {
    const id = uuidv4();
    dispatch(addUser({ id, ...data }));
  };

  return (
    <>
      <DevTool control={control} />
      {userData && (
        <>
          <Button onClick={handleOpenAddFormModal} variant="contained">
            Dodaj osobę
          </Button>

          <Dialog open={showAddFormModal} onClose={handleCloseAddFormModal}>
            <DialogTitle>Dodaj osobę</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Imię"
                  {...register("name")}
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  label="Wiek"
                  {...register("age", { valueAsNumber: true })}
                  fullWidth
                  margin="normal"
                  type="number"
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Data urodzenia"
                        maxDate={new Date()}
                        {...field}
                      />
                    </LocalizationProvider>
                  )}
                />
                <TextField
                  label="Życiorys"
                  {...register("bio")}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  error={!!errors.bio}
                  helperText={errors.bio?.message}
                />
                <DialogActions>
                  <Button onClick={handleCloseAddFormModal}>Anuluj</Button>
                  <Button onClick={handleSubmit(onSubmit)} variant="contained">
                    Dodaj
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
      <UsersTable />
    </>
  );
};

export default Main;
