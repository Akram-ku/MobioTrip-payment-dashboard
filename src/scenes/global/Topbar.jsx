import React, { useState, createContext, useContext } from "react";
import {
  Box,
  IconButton,
  useTheme,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  InputBase,
} from "@mui/material";
import { Link } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WalletIcon from "@mui/icons-material/Wallet";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { tokens } from "../../Theme";
import { ColorModeContext } from "../../Theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const logoSrc =
    theme.palette.mode === "dark"
      ? "../../../public/Logo_mobile_app(withoutBackground )_white.svg"
      : "../../../public/Logo_mobile_app(withoutBackground )_black.svg";

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      {/* Left Section */}
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            maxWidth: { xs: "150px", sm: "150px", md: "200px" },
            height: "auto",
            marginRight: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logoSrc}
            alt="Logo"
            style={{ width: "30%", height: "auto" }}
          />
        </Box>
      </Box>

      {/* Right Section */}
      <Box display="flex">
        {/* Settings and Color Mode Toggle */}
        <Box display="flex" alignItems="center" marginRight={2}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton component={Link} to="/wallets">
            <WalletIcon />
          </IconButton>
          <IconButton component={Link} to="/transactions">
            <ReceiptLongOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
