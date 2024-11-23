import { useState, useEffect } from "react";
import { fetchMovies } from "../api/omdbApi";

const useFetchMovies = (searchTerm: string) => {
  const [movies, setMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [searchTerm]);

  useEffect(() => {
    if (!hasMore) return;

    const fetchMoreMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(searchTerm, page);
        setMovies((prev:any) => [...prev, ...data]);
        setHasMore(data.length > 0);
      } catch (err:any) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreMovies();
    if(movies.length > 0) setError("")
  }, [page, searchTerm, hasMore]);

  const loadMore = () => setPage((prev) => prev + 1);

  return { movies, loading, error, hasMore, loadMore };
};

export default useFetchMovies;
