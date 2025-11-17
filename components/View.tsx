import Ping from "@/components/Ping";
import { after } from "next/server";
import { getStartupViews } from "@/lib/queries";
import { incrementViews } from "@/lib/queries";

const View = async ({ id }: { id: number }) => {
  const data = await getStartupViews(id);
  const totalViews = data?.views ?? 0;

  // Update views after the response is returned
  after(async () => {
    await incrementViews(id);
  });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
