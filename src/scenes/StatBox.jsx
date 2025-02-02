import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../Theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, progress, increase, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Calculate the percentage for the ProgressCircle component
  const percentage = parseFloat(progress);
  const isPositive = percentage >= 0;

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={percentage} size={40} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{
            color: isPositive ? colors.greenAccent[500] : colors.redAccent[500],
            ml: "10px",
          }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
