import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { User, editUser } from "../features/users/usersSlice";
import { RootState } from "../app/store";
import personSchema from "../schemas/UserSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";

type FormValues = z.infer<typeof personSchema>;

interface EditFormDialogProps {
  open: boolean;
  onClose: () => void;
  personId: string;
  initialValues: User | undefined;
}

const EditFormDialog: React.FC<EditFormDialogProps> = ({
  open,
  onClose,
  personId,
  initialValues,
}) => {
  const dispatch = useDispatch();

  const { formState, handleSubmit, register, control, reset } =
    useForm<FormValues>({
      resolver: zodResolver(personSchema),
      defaultValues: initialValues,
      mode: "onTouched",
    });

  const { errors } = formState;

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [open, initialValues, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data: FormValues) => {
    dispatch(editUser({ id: personId, ...data }));
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edytuj osobę</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Imię"
              {...register("name")}
              defaultValue={initialValues?.name}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Wiek"
              {...register("age", { valueAsNumber: true })}
              defaultValue={initialValues?.age}
              fullWidth
              margin="normal"
              type="number"
              error={!!errors.age}
              helperText={errors.age?.message}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="birthDate"
                control={control}
                defaultValue={initialValues?.birthDate}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Data urodzenia"
                    maxDate={new Date()}
                  />
                )}
              />
            </LocalizationProvider>

            <TextField
              label="Życiorys"
              {...register("bio")}
              defaultValue={initialValues?.bio}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.bio}
              helperText={errors.bio?.message}
            />
            <DialogActions>
              <Button onClick={onClose}>Anuluj</Button>
              <Button onClick={handleSubmit(onSubmit)} variant="contained">
                Zapisz
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditFormDialog;
