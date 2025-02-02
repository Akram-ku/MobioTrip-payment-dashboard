import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../Theme";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LineChart from "./Line";
import StatBox from "./StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // State for fetched data
  const [totalIncome, setTotalIncome] = useState("0");
  const [profits, setProfits] = useState("0");
  const [totalTransactions, setTotalTransactions] = useState("0");
  const [transactionsRate, setTransactionsRate] = useState("0");
  const [totalEwallets, setTotalEwallets] = useState("0");
  const [ewalletsRate, setEwalletsRate] = useState("0");
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await fetch(
          "https://8e74-31-9-208-195.ngrok-free.app/wallets/statistics/transactions/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
              "ngrok-skip-browser-warning": "true",
              Origin: "https://8e74-31-9-208-195.ngrok-free.app",
            },
          }
        );
        const transactionsData = await transactionsResponse.json();
        console.log(transactionsData);
        setTotalTransactions(transactionsData.total_transactions);
        setTransactionsRate(transactionsData.transactions_rate);

        const walletsResponse = await fetch(
          "https://8e74-31-9-208-195.ngrok-free.app/wallets/statistics/wallets/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
              "ngrok-skip-browser-warning": "true",
              Origin: "https://8e74-31-9-208-195.ngrok-free.app",
            },
          }
        );
        const walletsData = await walletsResponse.json();
        console.log(walletsData);
        setTotalEwallets(walletsData.total_ewallets);
        setEwalletsRate(walletsData.ewallets_rate);

        const incomeResponse = await fetch(
          "https://8e74-31-9-208-195.ngrok-free.app/wallets/statistics/income/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
              "ngrok-skip-browser-warning": "true",
              Origin: "https://8e74-31-9-208-195.ngrok-free.app",
            },
          }
        );
        const incomeData = await incomeResponse.json();
        console.log(incomeData);
        setTotalIncome(incomeData.total_income);
        setProfits(incomeData.profits);

        const publicResponse = await fetch(
          "https://8e74-31-9-208-195.ngrok-free.app/wallets/statistics/trips/income/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
              "ngrok-skip-browser-warning": "true",
              Origin: "https://8e74-31-9-208-195.ngrok-free.app",
            },
          }
        );
        const TripsData = await publicResponse.json();
        setTrips(TripsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={`repeat(auto-fit, minmax(200px, 1fr))`}
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalIncome}
            subtitle="Total Income"
            progress={profits}
            increase={profits}
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalTransactions}
            subtitle="Transactions"
            progress={transactionsRate}
            increase={transactionsRate}
            // increase={transactionsRate + "%"}
            icon={
              <SyncAltOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalEwallets}
            subtitle="E-wallets"
            progress={ewalletsRate}
            increase={ewalletsRate}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* Additional Boxes for Public and Personal Trips can be added here */}
      </Box>

      <Box
        gridColumn={isSmallScreen ? "span 12" : "span 12"}
        gridRow={isSmallScreen ? "span 1" : "span 2"}
        backgroundColor={colors.primary[400]}
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        ></Box>
        <Box height={isSmallScreen ? "250px" : "200px"} m="-20px 0 0 0">
          <LineChart data={trips} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
