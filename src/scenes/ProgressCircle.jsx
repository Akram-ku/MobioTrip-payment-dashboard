import { Box, useTheme } from "@mui/material";
import { tokens } from "../Theme";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Normalize progress to a float between 0 and 1
  const percentage = parseFloat(progress) / 100; // Assuming progress is a percentage string

  // Calculate the angle for the conic-gradient
  const angle = percentage >= 0 ? percentage * 360 : (1 + percentage) * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
          conic-gradient(transparent 0deg ${angle}deg, ${colors.greenAccent[500]} ${angle}deg 360deg),
          ${colors.redAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
