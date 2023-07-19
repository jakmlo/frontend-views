import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import LogoDevSharpIcon from "@mui/icons-material/LogoDevSharp";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const MuiNavbar = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("Polski");

  const handleChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value as string);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={() => navigate("/main")}
        >
          <LogoDevSharpIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Data App
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Język</InputLabel>
            <Select
              labelId="select-label"
              id="demo-simple-select"
              aria-label="select-language"
              value={language}
              label="Język"
              onChange={handleChange}
            >
              <MenuItem value={"Polski"}>Polski 🇵🇱</MenuItem>
              <MenuItem value={"Angielski"}>Angielski 🇬🇧</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <NavLink to="/views" className="navbar__link">
          Views
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default MuiNavbar;
