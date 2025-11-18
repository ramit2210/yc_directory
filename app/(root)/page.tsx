"use client";

import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { supabase } from "@/lib/supabase/client";
import type { StartupType } from "@/db/schema/startup";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<
    StartupType,
    "author" | "authorId" | "_createdAt"
> & {
    author: {
        id: number;
        name: string;
        username: string;
        image: string | null;
        bio: string | null;
    } | null;
    _createdAt: string;
};

function HomePage() {
    const searchParams = useSearchParams();
    const query = searchParams?.get("query") || undefined;
    const [posts, setPosts] = useState<StartupTypeCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadPosts = async () => {
            setLoading(true);
            const endpoint = `/api/startups${
                query ? `?query=${encodeURIComponent(query)}` : ""
            }`;
            const res = await fetch(endpoint);
            const data = await res.json();

            if (isMounted) {
                setPosts(data);
                setLoading(false);
            }
        };

        loadPosts();

        return () => {
            isMounted = false;
        };
    }, [query]);

    useEffect(() => {
        const refetchPosts = async () => {
            const endpoint = `/api/startups${
                query ? `?query=${encodeURIComponent(query)}` : ""
            }`;
            const res = await fetch(endpoint);
            const data = await res.json();
            setPosts(data);
        };

        const channel = supabase
            .channel("startup-changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "startup" },
                () => void refetchPosts()
            )
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "author" },
                () => void refetchPosts()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [query]);

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
                    {loading ? (
                        //loading...
                        Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-[350px] w-full rounded-lg bg-pink-300"
                            />
                        ))
                    ) : posts?.length > 0 ? (
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

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="h-20 w-20 rounded-full border-8 border-gray-300 border-t-blue-500 animate-spin"></div>
            }
        >
            <HomePage />
        </Suspense>
    );
}
