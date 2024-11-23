import axios from 'axios';

const API_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = "bb194539"; // Store the key in .env file

export const fetchMovies = async (searchTerm:string, page:number) => {
  const response = await axios.get(API_BASE_URL, {
    params: {
      s: searchTerm,
      page,
      apikey: API_KEY,
    },
  });

  if (response.data.Error) {
    throw new Error(response.data.Error);
  }
  return response.data.Search;
};
