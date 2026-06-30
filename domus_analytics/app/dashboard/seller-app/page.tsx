import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSellerAppData } from "@/app/lib/services/seller-app";
import { SellerAppClient } from "@/app/componentes/dashboard/SellerAppClient";
import { isAdmin, extractRoles } from "@/app/lib/auth/roles";

export const dynamic = "force-dynamic";

export const metadata = { title: "Seller App · Analytics" };

export default async function SellerAppPage() {
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/sign-in");

  const roles = extractRoles(sessionClaims);
  if (!isAdmin(roles)) redirect("/no-role");

  const data = await getSellerAppData();

  return <SellerAppClient data={JSON.parse(JSON.stringify(data))} />;
}
