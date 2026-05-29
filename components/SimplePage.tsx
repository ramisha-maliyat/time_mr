type SimplePageProps = {
  title: string;
  description: string;
};

export default function SimplePage({ title, description }: SimplePageProps) {
  return (
    <main className="page-shell px-4 py-8">
      <section className="container-modern">
        <div className="card-modern overflow-hidden">
          <div className="bg-[#361B10] px-6 py-10 text-[#EBE4CD] md:px-10 md:py-14">
            <p className="text-sm font-black uppercase tracking-[0.3em] opacity-75">
              TIME.MR
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              {title}
            </h1>
          </div>

          <div className="p-6 md:p-10">
            <p className="max-w-4xl text-lg leading-8 text-[#7A604E] md:text-2xl md:leading-10">
              {description}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h2 className="text-xl font-black text-[#361B10]">
                  Simple
                </h2>
                <p className="mt-2 text-[#7A604E]">
                  Clean layout with easy reading and clear information.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h2 className="text-xl font-black text-[#361B10]">
                  Responsive
                </h2>
                <p className="mt-2 text-[#7A604E]">
                  Looks good on desktop, tablet, and mobile screens.
                </p>
              </div>

              <div className="rounded-3xl border border-[#361B10]/10 bg-[#FFF9E8]/80 p-5">
                <h2 className="text-xl font-black text-[#361B10]">
                  TIME.MR
                </h2>
                <p className="mt-2 text-[#7A604E]">
                  Designed with the warm brown and cream brand style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}