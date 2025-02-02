import { Box, useTheme, Button } from "@mui/material";
import Header from "../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { tokens } from "../Theme";
import TagAccordion from "./tagAccordion";

const faq = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const accordionData = [
    {
      title: "An Important Question",
      tags: ["tag1", "tag2"],
      content:
        "lorem ipsum jfndsgjfsngjkfsngfedignfgvndsokkfgnrsiognfskldsfogkinoedfgokdfv",
    },
    {
      title: "Another Important Question",
      tags: ["tag3", "tag4"],
      content:
        "lorem ipsum jfndsgjfsngjkfsngfedignfgvndsokkfgnrsiognfskldsfogkinoedfgokdfv",
    },
    {
      title: "Your Favorite Question",
      tags: ["tag5", "tag6", "tag4", "tag1", "tag2", "tag10"],
      content:
        "lorem ipsum jfndsgjfsngjkfsngfedignfgvndsokkfgnrsiognfskldsfogkinoedfgokdfv",
    },
    {
      title: "Some Random Question",
      tags: ["tag7", "tag8"],
      content:
        "lorem ipsum jfndsgjfsngjkfsngfedignfgvndsokkfgnrsiognfskldsfogkinoedfgokdfv",
    },
    {
      title: "The Final Question",
      tags: ["tag9", "tag10"],
      content:
        "lorem ipsum jfndsgjfsngjkfsngfedignfgvndsokkfgnrsiognfskldsfogkinoedfgokdfv",
    },
  ];

  return (
    <Box m="20px">
      <Header title="News" subtitle="See our latest news" />
      <Link to="/add-news">
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[600],
            color: colors.grey[100],
            "&:hover": {
              backgroundColor: colors.blueAccent[700],
            },
          }}
        >
          Add News
        </Button>
      </Link>
      {accordionData.map((accordion, index) => (
        <TagAccordion
          key={index}
          title={accordion.title}
          tags={accordion.tags}
          content={accordion.content}
        />
      ))}
    </Box>
  );
};

export default faq;
