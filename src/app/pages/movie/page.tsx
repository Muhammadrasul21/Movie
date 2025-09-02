"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMovies, getGenres } from "@/app/api/moviesApi";
import Movies from "@/app/components/Movies";
import { Pagination, Empty } from "antd";

const MoviesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  let with_genres = searchParams.get("genres") || "";

  const { data, isLoading } = useQuery({
    queryKey: ["movies", page, with_genres],
    queryFn: () =>
      getMovies({
        page,
        with_genres: with_genres.split("-").join(","),
      }),
  });

  const { data: genredata } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const handleChangePage = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", p.toString());
    router.push(`?${params.toString()}`);
  };

  const handleChangeGenre = (id: number) => {
    let array = with_genres ? with_genres.split("-") : [];

    if (array.includes(id.toString())) {
      array = array.filter((i) => i !== id.toString());
    } else {
      array.push(id.toString());
    }

    const params = new URLSearchParams(searchParams);
    if (array.length === 0) {
      params.delete("genres");
      params.delete("page");
    } else {
      params.set("genres", array.join("-"));
      params.set("page", "1");
    }
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
  }, [page]);

  return (
    <div className="container">
      <div className="flex category gap-2 mb-4 overflow-auto pb-2 scrollbar-hide">
        {genredata?.genres?.map((genre: any) => (
          <div
            key={genre.id}
            onClick={() => handleChangeGenre(genre.id)}
            className={`whitespace-nowrap px-4 py-1 rounded select-none cursor-pointer ${
              with_genres.includes(genre.id.toString())
                ? "bg-primary text-white dark:text-primary border dark:border-primary dark:bg-[#111111] transition duration-300 ease-in-out"
                : "dark:bg-[#111111] dark:text-white border dark:border-gray-800 transition duration-300 ease-in-out"
            }`}
          >
            {genre.name}
          </div>
        ))}
      </div>

      {!data?.total_results && !isLoading && <Empty />}
       <Movies data={data} isLoading={isLoading} /> 

      {!!data?.total_results && (
        <div className="flex my-5 justify-center">
          <Pagination
            showSizeChanger={false}
            defaultCurrent={1}
            defaultPageSize={20}
            total={Math.min(data?.total_results || 0, 10000)}
            current={page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
