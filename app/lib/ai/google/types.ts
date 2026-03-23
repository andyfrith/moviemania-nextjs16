export interface MovieWatchAnalysisResponse {
  analysis: {
    title: string;
    year: string;
    summary: string;
    futureMood: string;
    futureActivity: string;
    movieGenres: string[];
    movieThemes: string[];
    moveTones: string[];
    reasoning: string[];
    recommendation: string;
    confidence: number;
  };
}

export interface MovieAnalysisResponse {
  analysis: {
    title: string;
    year: string;
    summary: string;
    movieGenres: string[];
    movieThemes: string[];
    moveTones: string[];
    confidence: number;
  };
}
