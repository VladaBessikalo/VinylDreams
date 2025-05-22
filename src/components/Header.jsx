import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext.jsx";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import SearchBar from "./SearchBar.jsx";
import vinylIcon from "../assets/romantic-vinyl-svgrepo-com.svg";
import "../styles/Header.scss";
import { useState } from "react";
import AlertDialog from "./AlertDialog.jsx";
import { AppButton } from "./AppButton.jsx";

export default function Header() {
  const { user, logOut } = useAuth();
  const { pathname } = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static" color="secondary" sx={{ paddingY: 1 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            className="vinyl-logo"
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={vinylIcon}
                alt="Vinyl Icon"
                style={{ width: 40, height: 40, marginRight: 8 }}
                className="vinyl-logo__vinyl-icon"
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontStyle: "italic" }}
                className="vinyl-logo__text"
              >
                Vinyl Dreams
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 3 }}>
            <SearchBar />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {pathname === "/wishlist" ? (
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  startIcon={<HomeIcon />}
                  variant="contained"
                  color="primary"
                >
                  Choose new Vinyl Dreams
                </Button>
              </Link>
            ) : (
              <Button
                startIcon={<FavoriteIcon color="secondary" />}
                variant="contained"
                color="primary"
                onClick={() => {
                  if (user) {
                    navigate("/wishlist");
                  } else {
                    handleDialogOpen();
                  }
                }}
              >
                My Vinyl Dreams
              </Button>
            )}

            {user ? (
              <Button
                startIcon={<LogoutIcon />}
                onClick={logOut}
                variant="outlined"
                color="inherit"
              >
                Log out
              </Button>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  startIcon={<LoginIcon />}
                  variant="outlined"
                  color="inherit"
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", m: 2 }}>
        <Typography
          variant="subtitle1"
          color="secondary"
          fontStyle="italic"
          fontWeight="700"
        >
          Vinyl Dreams, Tailored by You! Create your LPs Wish list here!
        </Typography>
      </Box>
      <AlertDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        title={"Login Required"}
        description="You must be logged in to modify your wishlist. Please log in or create an account to continue."
        actions={
          <>
            <AppButton onClick={handleDialogClose}>Cancel</AppButton>
            <Link to="/login">
              <AppButton>Go to Login</AppButton>
            </Link>
          </>
        }
      />
    </Box>
  );
}
