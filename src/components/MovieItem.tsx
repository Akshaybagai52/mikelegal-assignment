import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

type MovieItemProps = {
  Title: string;
  Type: string;
  Poster: string;
  Year: number;
};

const MovieItem = ({ movie }: { movie: MovieItemProps }) => {
  const [expanded, setExpanded] = useState(false); 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ marginBottom: 2, width: "32%", minWidth: 300 }}>
      <CardContent>
        <CardMedia
          component="img"
          height="200"
          image={movie.Poster}
          alt={movie.Title}
        />
        <Box
          sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
          onClick={handleExpandClick}
          
        >
          <Typography variant="h6" component="h3">
            {movie.Title}
          </Typography>
          <IconButton
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <ExpandMore />
          </IconButton>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              <strong>Year:</strong> {movie.Year}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <strong>Type:</strong> {movie.Type}
            </Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default MovieItem;
