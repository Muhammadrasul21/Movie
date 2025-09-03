"use client";

import React, { Suspense } from "react";
import Movies from "@/app/components/Movies";
import { Input, Empty } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "@/app/api/moviesApi";
import Skeleton from "@/app/components/skeleton/skeleton";

const { Search } = Input;

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearch({ query }),
    enabled: !!query,
  });

  const onSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container">
      <div className="max-w-[600px] mx-auto mb-32 text-white">
        <Search
          placeholder="Search movies..."
          onSearch={onSearch}
          enterButton
          defaultValue={query}
          autoFocus
        />
      </div>

      {isLoading && <Skeleton />}
      {isError && (
        <p className="text-red-500 text-center">Error loading movies...</p>
      )}
      {!data?.results?.length && !isLoading && <Empty />}

      {!!data?.results?.length && <Movies data={data} isLoading={isLoading} />}
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <SearchPageContent />
    </Suspense>
  );
};

export default React.memo(SearchPage);
