export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(100%_100%_at_20%_0%,#f6f0df_0%,#e7eadf_45%,#dbe5dc_100%)] px-5 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#21352a] text-3xl font-black text-[#d7e675]">A</div>
        <h1 className="text-3xl font-black text-[#1f3125]">Agritech</h1>
        <p className="mt-2 text-[#506352]">Plateforme de pilotage agricole</p>
      </div>

      <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#607362]">Qui êtes-vous ?</p>

      <div className="grid w-full max-w-xl gap-5 sm:grid-cols-2">
        <a
          href="/login?role=ouvrier"
          className="group flex flex-col items-center gap-4 rounded-3xl border-2 border-transparent bg-white p-8 text-center shadow transition hover:border-[#2f6a44] hover:shadow-lg"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef7f1] text-4xl">🌾</span>
          <div>
            <p className="text-xl font-black text-[#1f3125]">Je suis ouvrier</p>
            <p className="mt-1 text-sm text-[#5a6e5d]">
              Voir mes tâches du jour, signaler un problème, envoyer une photo
            </p>
          </div>
          <span className="mt-2 w-full rounded-xl bg-[#f0f7f1] py-2.5 text-sm font-bold text-[#2f6a44] transition group-hover:bg-[#2f6a44] group-hover:text-white">
            Accéder →
          </span>
        </a>

        <a
          href="/login?role=exploitant"
          className="group flex flex-col items-center gap-4 rounded-3xl border-2 border-transparent bg-[#21352a] p-8 text-center shadow transition hover:border-[#d7e675] hover:shadow-lg"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">👨‍🌾</span>
          <div>
            <p className="text-xl font-black text-[#d7e675]">Je suis exploitant</p>
            <p className="mt-1 text-sm text-[#9ab89e]">
              Piloter les fermes, suivre les équipes, gérer les problèmes
            </p>
          </div>
          <span className="mt-2 w-full rounded-xl bg-[#d7e675] py-2.5 text-sm font-bold text-[#1f3125] transition group-hover:bg-white">
            Accéder →
          </span>
        </a>
      </div>

      <p className="mt-10 text-xs text-[#8aab8e]">Connexion sécurisée · Agritech © 2026</p>
    </main>
  );
}
