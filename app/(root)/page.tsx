import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { getStartups } from "@/lib/queries";

type StartupTypeCard = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  views: number | null;
  pitch: string | null;
  image: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    username: string;
    image: string | null;
    bio: string | null;
  } | null;
};

async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await getStartups(query);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Vertual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?.id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}

export default HomePage;
