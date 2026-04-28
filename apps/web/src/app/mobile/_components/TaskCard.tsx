import Link from "next/link";

const categoryIcons: Record<string, string> = {
  verger: "🌳",
  elevage: "🐐",
  aquaculture: "🐟",
  distillation: "⚗️",
  volaille: "🐔",
  bsf: "🪰",
  aromatiques: "🌿",
};

const statusColors: Record<string, string> = {
  "En retard": "#dc2626", // red
  "En cours": "#2563eb",  // blue
  "Planifiee": "#6b7280", // gray
  "A planifier": "#6b7280", // gray
};

interface TaskCardProps {
  task: {
    intervention: string;
    farm: string;
    parcel: string;
    team: string;
    hour: string;
    status: string;
    categorie?: string;
    icone?: string;
    site?: string;
  };
}

export function TaskCard({ task }: TaskCardProps) {
  const icon = task.icone || categoryIcons[task.categorie || ""] || "📋";
  const site = task.site || "Site";

  return (
    <Link
      href={`/mobile/cloturer?task=${encodeURIComponent(task.intervention)}`}
      className="flex min-h-[90px] items-center gap-4 rounded-xl bg-white p-4 shadow-sm"
    >
      {/* Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center text-2xl">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-lg font-bold text-gray-900">{task.intervention}</p>
        <p className="text-sm text-gray-500">{site}</p>
      </div>

      {/* Status bar */}
      <div
        className="h-full w-2 rounded-full"
        style={{ backgroundColor: statusColors[task.status] || "#6b7280" }}
      />
    </Link>
  );
}