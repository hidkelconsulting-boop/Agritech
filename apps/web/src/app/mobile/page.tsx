"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { interventionsToday, teams } from "@/mock/agri";
import { TaskCard } from "./_components/TaskCard";

const statusPriority: Record<string, number> = {
  "En retard": 1,
  "En cours": 2,
  "Planifiee": 3,
  "A planifier": 4,
};

export default function MobileTachesPage() {
  const searchParams = useSearchParams();
  const userSlug = searchParams.get("user");

  // Find worker by slug or default to first team lead
  const worker = teams.find((t) => {
    const slug = t.lead.toLowerCase().replace(/\s+/g, "-");
    return slug === userSlug;
  }) || teams[0];

  // Filter tasks for this worker's team
  const myTasks = interventionsToday
    .filter((task) => task.team === worker.name)
    .filter((task) => ["En cours", "Planifiee", "En retard", "A planifier"].includes(task.status))
    .sort((a, b) => (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99));

  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const firstName = worker.lead.split(" ")[0];
  const initials = worker.lead.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-4 py-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f6a44] text-lg font-bold text-white">
          {initials}
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">Bonjour {firstName}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </header>

      {/* Task List */}
      <main className="flex-1 overflow-y-auto px-4 pb-24">
        {myTasks.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-lg text-gray-500">Pas de tâche pour aujourd'hui 👍</p>
          </div>
        ) : (
          <div className="space-y-3 py-4">
            {myTasks.map((task, index) => (
              <TaskCard key={`${task.intervention}-${index}`} task={task} />
            ))}
          </div>
        )}
      </main>

      {/* Report Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <Link
          href="/mobile/incidents"
          className="flex h-16 w-full items-center justify-center rounded-xl bg-[#dc2626] text-lg font-bold text-white shadow-sm"
        >
          ⚠️ Signaler un problème
        </Link>
      </div>
    </div>
  );
}
