import { getStartupsByAuthor } from "@/lib/queries";
import StartupCard from "./StartupCard";

const UserStartups = async ({ id }: { id: number }) => {
    const startups = await getStartupsByAuthor(id);
    return (
        <>
            {startups.length > 0 ? (
                startups.map((startup) => (
                    <StartupCard key={startup.id} post={startup} />
                ))
            ) : (
                <p className="no-result">No posts yet</p>
            )}
        </>
    );
};

export default UserStartups;
