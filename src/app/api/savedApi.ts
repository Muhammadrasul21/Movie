export const getSavedMovies = async () => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("savedMovies");
  const result = saved ? JSON.parse(saved) : [];
  console.log('Getting saved movies:', result);
  return result;
};

export const addSavedMovie = async (movie: any) => {
  if (typeof window === "undefined") return [];
  
  console.log('Adding movie to saved:', movie);
  
  const saved = localStorage.getItem("savedMovies");
  const parsed = saved ? JSON.parse(saved) : [];
  const exists = parsed.find((m: any) => m.id === movie.id);
  
  if (!exists) {
    const updated = [...parsed, movie];
    localStorage.setItem("savedMovies", JSON.stringify(updated));
    console.log('Movie added to localStorage:', updated);
    return updated;
  }
  
  console.log('Movie already exists in saved list');
  return parsed;
};

export const removeSavedMovie = async (id: number) => {
  if (typeof window === "undefined") return [];
  
  console.log('Removing movie from saved:', id);
  
  const saved = localStorage.getItem("savedMovies");
  const parsed = saved ? JSON.parse(saved) : [];
  const updated = parsed.filter((m: any) => m.id !== id);
  localStorage.setItem("savedMovies", JSON.stringify(updated));
  
  console.log('Movie removed from localStorage:', updated);
  return updated;
};
