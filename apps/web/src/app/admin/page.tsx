import { redirect } from "next/navigation";
import { BACKEND_API_URL } from "@/lib/config";
import { getTokenFromCookie } from "@/lib/session";
import AdminPanel from "@/components/admin-panel";

export type Organization = {
  id: string;
  name: string;
  slug: string;
  farms: Array<{ id: string; name: string }>;
  subscriptions: Array<{
    id: string;
    tier: "FREE" | "PRO" | "ENTERPRISE";
    status: "TRIAL" | "ACTIVE" | "PAST_DUE" | "CANCELED";
    renewsAt: string | null;
  }>;
};

async function getOrganizations(token: string): Promise<Organization[]> {
  const response = await fetch(`${BACKEND_API_URL}/admin/organizations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function AdminPage() {
  const token = await getTokenFromCookie();
  if (!token) {
    redirect("/login");
  }

  const organizations = await getOrganizations(token);
  return <AdminPanel initialOrganizations={organizations} />;
}
