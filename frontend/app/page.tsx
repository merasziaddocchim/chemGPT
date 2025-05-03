import { SearchBar } from "../components/SearchBar";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">Chemistry LLM Tutor</h1>
      <SearchBar />
    </main>
  );
}
