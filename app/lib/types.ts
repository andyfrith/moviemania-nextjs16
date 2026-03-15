export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
}

export interface MovieDetailed extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export interface MovieByIdRequest {
  i?: string; // A valid IMDb ID (e.g. tt1285016). Default value: <empty>
  t?: string; // Movie title to search for. Default value: <empty>
  type?: "movie" | "series" | "episode"; // Type of result to return. Default value: <empty>
  y?: string; // Year of release. Default value: <empty>
  plot?: "short" | "full"; // Return short or full plot. Default value: "short"
  r?: "json" | "xml"; // The data type to return. Default value: "json"
  callback?: string; // JSONP callback name. Default value: <empty>
  v?: string; // API version (reserved for future use). Default value: "1"
}

export interface MovieByIdResponse extends MovieDetailed {
  Response: "False" | "True";
  Error?: string; // iee. "Incorrect IMDb ID."
}

export interface MoviesSearchRequest {
  s: string; // Movie title to search for. Default value: <empty>
  type?: "movie" | "series" | "episode"; // Type of result to return. Default value: <empty>
  y?: string; // Year of release. Default value: <empty>
  r?: "json" | "xml"; // The data type to return. Default value: "json"
  page?: string; // Page number to return.  Default value: "1"
  callback?: string; // JSONP callback name. Default value: <empty>
  v?: string; // API version (reserved for future use). Default value: "1"
}

export interface MoviesSearchResponse {
  Response: "False" | "True";
  Search?: Array<Movie>;
  totalResults?: string;
  Error?: string; // iee. "Movie not found!"
}
