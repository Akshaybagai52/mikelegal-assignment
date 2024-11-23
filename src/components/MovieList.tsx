import React, { useState } from "react";
import { TextField, Box, Typography, CircularProgress } from "@mui/material";
import useFetchMovies from "../hooks/useFetchMovies";
import debounce from "../utils/debounce";
import MovieItem from "./MovieItem";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("Batman");
  const { movies, loading, error, hasMore, loadMore } =
    useFetchMovies(searchTerm);

  const handleScroll = (e: any) => {
    if (loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = e.target.scrollingElement;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      loadMore();
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 300);

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
      <TextField
        fullWidth
        label="Search movies..."
        variant="outlined"
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {movies.map((movie: any) => (
          <MovieItem key={movie?.imdbID} movie={movie} />
        ))}
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default MovieList;
