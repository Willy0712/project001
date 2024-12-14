import UploadNew from "@/app/_components/UploadNew";
import { auth } from "@/app/_lib/auth";
import {
  getAppUser,
  getCategoriesWithSubcategories,
} from "@/app/_lib/services/data-service";

export default async function Page() {
  const categories = await getCategoriesWithSubcategories();
  const session = await auth();
  if (!session) {
    return null;
  }
  const user = await getAppUser(session?.user?.email as string);
  return (
    <div>
      <UploadNew categories={categories} userId={user.userId} />
    </div>
  );
}
