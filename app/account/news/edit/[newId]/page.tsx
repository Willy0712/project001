import EditNew from "@/app/_components/EditNew";
import {
  getCategoriesWithSubcategories,
  getNewsById,
  getPhotosForNews,
} from "@/app/_lib/services/data-service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

export default async function page({ params }: { params: Params }) {
  const { newId } = params;
  const getNewData = await getNewsById(newId);
  const categories = await getCategoriesWithSubcategories();

  return <EditNew newData={getNewData} categories={categories} />;
}
