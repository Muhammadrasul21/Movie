import { notFound } from "next/navigation";
import { getServerSideMovieData } from "@/app/api/serverApi";
import { MoviePageProps } from "@/app/types/type";
import MovieDetailClient from "./page-ssr";

// Server Component for data fetching
interface PageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = params;

  // Validate the ID
  if (!id || isNaN(Number(id))) {
    notFound();
  }

  try {
    const movieId = Number(id);
    const data = await getServerSideMovieData(movieId);

    // Pass the data as props to the client component
    const props: MoviePageProps = {
      movie: data.movie,
      credits: data.credits,
      videos: data.videos,
      similarMovies: data.similarMovies,
    };

    return <MovieDetailClient {...props} />;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    notFound();
  }
}
