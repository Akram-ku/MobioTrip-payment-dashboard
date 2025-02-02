import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import Header from "../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../Theme.js";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

const Wallets = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if it's a mobile screen
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://d7fc-5-155-76-215.ngrok-free.app/wallets/transactions/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
              "ngrok-skip-browser-warning": "true",
              Origin: "https://d7fc-5-155-76-215.ngrok-free.app",
            },
          }
        );

        const data = await response.json();
        console.log(data);
        const transformedData = data.results.map((user) => ({
          id: user.id,
          amount: user.amount,
          created_at: user.created_at,
          sender_wallet_uuid: user.sender_wallet_uuid,
          receiver_wallet_uuid: user.receiver_wallet_uuid,
        }));

        setRows(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "created_at", headerName: "Created at", flex: 2 },
    { field: "sender_wallet_uuid", headerName: "Sender_Wallet_UUID", flex: 2 },
    {
      field: "receiver_wallet_uuid",
      headerName: "Receiver Wallet UUID ",
      flex: 2,
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Transactions" subtitle="Managing Transaction Info" />
      </Box>
      <Box
        m="40px 0 0 0"
        height={isMobile ? "75vh" : "65vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[600],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[600],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection={false} rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Wallets;
