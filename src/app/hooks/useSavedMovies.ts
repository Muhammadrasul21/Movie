import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSavedMovies, addSavedMovie, removeSavedMovie } from "../api/savedApi";

export const useSavedMovies = () => {
  const queryClient = useQueryClient();

  const { data: savedMovies = [], isLoading } = useQuery({
    queryKey: ["savedMovies"],
    queryFn: getSavedMovies,
  });

  const addMutation = useMutation({
    mutationFn: addSavedMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedMovies"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeSavedMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedMovies"] });
    },
  });

  return {
    savedMovies,
    isLoading,
    addMovie: addMutation.mutate,
    removeMovie: removeMutation.mutate,
  };
};
