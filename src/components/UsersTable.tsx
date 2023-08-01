import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  removeUser,
  editUser,
  addUser,
  toggleUserSelection,
  setRowsPerPage,
  setPage,
  selectRow,
  deleteSelectedRows,
  selectSelectedRows,
  User,
} from "../features/users/usersSlice";
import {
  openAddFormModal,
  closeAddFormModal,
  openEditFormModal,
  closeEditFormModal,
} from "../features/modals/modalsSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import EditFormDialog from "./EditFormDialog";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const UsersTable = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.users);

  const selectedRows = useSelector(
    (state: RootState) => state.users.selectedRows
  );
  const selectedRow = useSelector(
    (state: RootState) => state.users.selectedRow
  );

  const user = useSelector((state: RootState) => {
    const user = state.users.users.find((user) => user.id === selectedRow);
    return user;
  });

  const page = useSelector((state: RootState) => state.users.page);
  const rowsPerPage = useSelector(
    (state: RootState) => state.users.rowsPerPage
  );
  const editDialogOpen = useSelector(
    (state: RootState) => state.modals.showEditFormModal
  );

  const handleRowSelect = (userId: string) => {
    dispatch(toggleUserSelection(userId));
  };

  const handleDeleteRows = () => {
    dispatch(deleteSelectedRows());
  };

  const handleDeleteRow = (userId: string) => {
    dispatch(removeUser(userId));
  };

  const handleSelectRow = (userId: string) => {
    dispatch(selectRow(userId));
  };

  const handleEditRow = () => {
    dispatch(openEditFormModal());
  };

  const handleCloseEditDialog = () => {
    dispatch(closeEditFormModal());
  };

  const handleChangePage = (
    _e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(parseInt(e.target.value, 10)));
    dispatch(setPage(0));
  };

  const paginatedRows = rows.users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Table>
        <EditFormDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          initialValues={user}
          personId={selectedRow}
        />
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedRows.length === paginatedRows.length}
                onChange={() =>
                  selectedRows.length === paginatedRows.length
                    ? dispatch(selectSelectedRows([]))
                    : dispatch(
                        selectSelectedRows(paginatedRows.map((row) => row.id))
                      )
                }
              />
            </TableCell>
            <TableCell>Imię</TableCell>
            <TableCell align="right">Wiek</TableCell>
            <TableCell align="right">Data urodzenia</TableCell>
            <TableCell align="right">Życiorys</TableCell>
            <TableCell align="right">Akcja</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((user: User) => (
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="right">
                <Checkbox
                  checked={selectedRows.includes(user.id)}
                  onClick={() => handleRowSelect(user.id)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.age}</TableCell>
              <TableCell align="right">
                {user.birthDate.toLocaleDateString("pl-PL", options)}
              </TableCell>
              <TableCell align="right">{user.bio}</TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  aria-label="edit"
                  onClick={() => {
                    handleSelectRow(user.id);
                    handleEditRow();
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="edit"
                  onClick={() => {
                    handleDeleteRow(user.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <IconButton
        onClick={() => {
          handleDeleteRows();
        }}
        aria-label="delete"
        size="large"
      >
        <DeleteIcon />
      </IconButton>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={rows.users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default UsersTable;
