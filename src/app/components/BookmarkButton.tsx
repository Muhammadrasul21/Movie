"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSavedMovies, addSavedMovie, removeSavedMovie } from "@/app/api/savedApi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useState } from "react";

interface BookmarkButtonProps {
  movie: any;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BookmarkButton({ movie, size = "md", className = "" }: BookmarkButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // Add safety check for movie data
  if (!movie || !movie.id) {
    console.warn('BookmarkButton: Movie data is missing or invalid:', movie);
    return null;
  }

  const { data: savedMovies = [] } = useQuery({
    queryKey: ["savedMovies"],
    queryFn: getSavedMovies,
  });

  const isInSaved = savedMovies.some((m: any) => m.id === movie?.id);

  const saveMutation = useMutation({
    mutationFn: addSavedMovie,
    onSuccess: (data) => {
      console.log('Movie saved successfully:', data);
      queryClient.invalidateQueries({ queryKey: ["savedMovies"] });
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error saving movie:', error);
      setIsLoading(false);
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeSavedMovie,
    onSuccess: (data) => {
      console.log('Movie removed successfully:', data);
      queryClient.invalidateQueries({ queryKey: ["savedMovies"] });
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error removing movie:', error);
      setIsLoading(false);
    },
  });

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    console.log('BookmarkButton clicked:', { movieId: movie?.id, isInSaved, movie });
    
    setIsLoading(true);
    
    if (isInSaved) {
      console.log('Removing movie from saved:', movie.id);
      removeMutation.mutate(movie.id);
    } else {
      console.log('Adding movie to saved:', movie);
      saveMutation.mutate(movie);
    }
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        ${sizeClasses[size]} 
        bg-[#ffffffc4] dark:bg-[#000000c4] 
        flex items-center justify-center 
        rounded-xl text-primary cursor-pointer 
        hover:bg-opacity-80 transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      title={isInSaved ? "Remove from saved" : "Add to saved"}
    >
      {isLoading ? (
        <div className={`${iconSizes[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary`} />
      ) : isInSaved ? (
        <FaBookmark className={`${iconSizes[size]} text-red-500`} />
      ) : (
        <FaRegBookmark className={iconSizes[size]} />
      )}
    </button>
  );
}
