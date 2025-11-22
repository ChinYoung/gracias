import { RootMenus } from "./RootMenus";
import { fetchMenus } from "@/requests/getMenus";

export default async function GlobalMenu() {
  const jsonData = await fetchMenus();
  return (
    <>
      <div className="h-8"></div>
      <RootMenus menus={jsonData.data} />
      <div className="h-8"></div>
    </>
  );
}
