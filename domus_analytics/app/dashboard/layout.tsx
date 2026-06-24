"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const tabs = [
  { label: "BuyerApp", href: "/dashboard/buyer-app" },
  { label: "SellerApp", href: "/dashboard/seller-app" },
  { label: "PaymentsApp", href: "/dashboard/payments-app" },
  { label: "SchedulingApp", href: "/dashboard/scheduling-app" },
  { label: "FeedbackApp", href: "/dashboard/feedback-app" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-domus-bg p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-5xl font-bold text-domus-primary">
                Dashboard Analytics
              </h1>
            </Link>
            <p className="text-domus-textSoft mt-1">
              Visualizacion de metricas centralizada del ecosistema Domus.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-domus-textSoft">
              {user?.fullName ?? user?.emailAddresses[0]?.emailAddress ?? ""}
            </span>
            <UserButton />
          </div>
        </header>

        <div className="bg-domus-card border border-domus-secondary rounded-3xl p-2 flex gap-2 mb-8 shadow-sm flex-wrap">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-6 py-3 rounded-2xl font-semibold capitalize transition-all ${
                  isActive
                    ? "bg-domus-primary text-white shadow"
                    : "text-domus-text hover:bg-domus-secondary"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        <section className="bg-domus-card border border-domus-secondary rounded-3xl p-8 shadow-sm min-h-[600px]">
          {children}
        </section>
      </div>
    </main>
  );
}
