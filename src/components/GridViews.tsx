import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { User } from "../features/users/usersSlice";

const GridViews = () => {
  const users = useSelector((state: RootState) => state.users.users);
  return (
    <Grid container spacing={3}>
      {users.map((user: User) => (
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {user?.name}
              </Typography>
              <Typography variant="h5" component="div">
                {user?.age}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
              <Typography variant="body2">{user?.bio}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridViews;
