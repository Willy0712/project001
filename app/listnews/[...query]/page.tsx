import PublicNewsCard from "@/app/_components/PublicNewsCard";
import { searchNews } from "@/app/_lib/actions";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default async function Page({ params }: { params: Params }) {
  const news = await searchNews(params.query);

  return (
    <div>
      {news.length > 0 ? (
        news.map((n) => <PublicNewsCard key={n.newsId} news={n} />)
      ) : (
        <p>Now news found with the searched query</p>
      )}
    </div>
  );
}
