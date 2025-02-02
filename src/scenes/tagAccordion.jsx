import { Box, useTheme, Button, Chip } from "@mui/material";
import Header from "../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { tokens } from "../Theme";

const tagAccordion = ({ title, tags, content }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={colors.greenAccent[500]} variant="h6">
          {title}
        </Typography>
        <Box ml={1}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} />
          ))}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default tagAccordion;
