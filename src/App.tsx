import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { enUS, plPL } from "@mui/material/locale";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme(plPL);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
