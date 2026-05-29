import Link from "next/link";

type SimplePageProps = {
  title: string;
  description: string;
};

export default function SimplePage({ title, description }: SimplePageProps) {
  return (
    <main className="min-h-screen bg-white px-6 py-8 text-[#2b2b2b] md:px-12">
      <Link href="/" className="font-bold underline">
        ← Back home
      </Link>

      <section className="mt-20 max-w-4xl">
        <h1 className="text-5xl font-black">{title}</h1>

        <p className="mt-6 text-xl leading-8 text-gray-600">
          {description}
        </p>
      </section>
    </main>
  );
}