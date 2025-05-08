
import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <Head>
        <title>chemGPT – Your AI Chemistry Companion</title>
        <meta name="description" content="Visualize molecules, predict reactions, and learn chemistry with AI." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Your AI Chemistry Companion</h1>
        <p className="text-xl md:text-2xl mb-8">Visualize molecules, predict reactions, and learn chemistry with AI.</p>
        <div className="flex justify-center gap-4">
          <a href="#features" className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition">Try chemGPT</a>
          <a href="#viewer" className="border border-white py-3 px-6 rounded-full hover:bg-white hover:text-blue-800 transition">View Molecules</a>
        </div>
      </section>

      {/* Other sections here... */}
    </div>
  );
}
