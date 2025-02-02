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
          "https://d7fc-5-155-76-215.ngrok-free.app/wallets/",
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
          balance: user.balance,
          pin_code: user.pin_code,
          wallet_uuid: user.wallet_uuid,
          created_at: user.created_at,
          owner: user.owner,
        }));

        setRows(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://d7fc-5-155-76-215.ngrok-free.app/wallets/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            "ngrok-skip-browser-warning": "true",
            Origin: "https://d7fc-5-155-76-215.ngrok-free.app",
          },
        }
      );

      if (response.ok) {
        setRows((prev) => prev.filter((row) => row.id !== id));
      } else {
        console.error("Failed to delete driver");
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "balance", headerName: "Balance", flex: 1 },
    { field: "pin_code", headerName: "Pin Code", flex: 1 },
    { field: "wallet_uuid", headerName: "UUID", flex: 2 },
    { field: "created_at", headerName: "Created at", flex: 2 },
    { field: "owner", headerName: "Owner", flex: 1 },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Box>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(id)}>
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={() => navigate(`/wallet-owner/${id}`)}>
                <PersonIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Wallets" subtitle="Managing Wallets Info" />
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
