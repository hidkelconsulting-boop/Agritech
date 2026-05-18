export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(100%_100%_at_20%_0%,#f6f0df_0%,#e7eadf_45%,#dbe5dc_100%)] px-5 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#21352a] text-3xl font-black text-[#d7e675]">
          🌾
        </div>
        <h1 className="text-3xl font-black text-[#1f3125]">Agritech</h1>
        <p className="mt-2 text-[#506352]">
          Pilotage agricole · pisciculture · élevage · vergers · BSF · aromatiques
        </p>
      </div>

      <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#607362]">
        Choisis ton profil pour entrer dans la démo
      </p>

      <div className="grid w-full max-w-4xl gap-5 sm:grid-cols-3">
        {/* Ouvrier */}
        <a
          href="/login?role=ouvrier"
          className="group flex flex-col items-center gap-4 rounded-3xl border-2 border-transparent bg-white p-6 text-center shadow transition hover:border-[#2f6a44] hover:shadow-lg"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef7f1] text-4xl">
            🌾
          </span>
          <div className="flex-1">
            <p className="text-lg font-black text-[#1f3125]">Ouvrier terrain</p>
            <p className="mt-1 text-sm text-[#5a6e5d]">
              Mes tâches du jour, problèmes, photos. Interface ultra simple pour le terrain.
            </p>
          </div>
          <span className="w-full rounded-xl bg-[#f0f7f1] py-2.5 text-sm font-bold text-[#2f6a44] transition group-hover:bg-[#2f6a44] group-hover:text-white">
            Entrer →
          </span>
        </a>

        {/* Responsable */}
        <a
          href="/login?role=responsable"
          className="group flex flex-col items-center gap-4 rounded-3xl border-2 border-transparent bg-white p-6 text-center shadow transition hover:border-[#1d4ed8] hover:shadow-lg"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eff6ff] text-4xl">
            🧭
          </span>
          <div className="flex-1">
            <p className="text-lg font-black text-[#1f2937]">Responsable d&apos;exploitation</p>
            <p className="mt-1 text-sm text-[#5a6e5d]">
              Fil de décision du jour, photos à valider, équipes en retard, escalade.
            </p>
          </div>
          <span className="w-full rounded-xl bg-[#eff6ff] py-2.5 text-sm font-bold text-[#1d4ed8] transition group-hover:bg-[#1d4ed8] group-hover:text-white">
            Entrer →
          </span>
        </a>

        {/* Exploitant / Propriétaire */}
        <a
          href="/login?role=exploitant"
          className="group flex flex-col items-center gap-4 rounded-3xl border-2 border-transparent bg-[#21352a] p-6 text-center shadow transition hover:border-[#d7e675] hover:shadow-lg"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
            👨‍🌾
          </span>
          <div className="flex-1">
            <p className="text-lg font-black text-[#d7e675]">Exploitant / Patron</p>
            <p className="mt-1 text-sm text-[#9ab89e]">
              Comité technique virtuel, validation des protocoles, vue d&apos;ensemble cash &
              production.
            </p>
          </div>
          <span className="w-full rounded-xl bg-[#d7e675] py-2.5 text-sm font-bold text-[#1f3125] transition group-hover:bg-white">
            Entrer →
          </span>
        </a>
      </div>

      <div className="mt-8 max-w-2xl rounded-2xl bg-white/70 p-4 text-center text-xs text-[#5a6e5d] shadow-sm">
        <p>
          <strong>Trois profils, trois expériences</strong> — un ouvrier guidé pas à pas sur le
          terrain, un responsable qui pilote l&apos;exécution, un propriétaire qui valide les
          consignes officielles. Mots de passe pré-remplis pour la démo.
        </p>
      </div>

      <p className="mt-6 text-xs text-[#8aab8e]">Agritech © 2026 · Aperçu démonstration</p>
    </main>
  );
}
