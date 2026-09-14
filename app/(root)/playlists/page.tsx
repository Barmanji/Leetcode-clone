import { getCurrentUserData } from "@/modules/auth/actions";
import { PlaylistList } from "@/modules/playlists/components/playlist-list";
import type { UserData } from "@/modules/types/problem";

const PlaylistsPage = async () => {
  const userData = (await getCurrentUserData()) as UserData | undefined;

  if (!userData) {
    return (
      <div className="min-h-screen py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-muted-foreground">
            Please sign in to view your playlists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <PlaylistList playlists={userData.playlists} />
      </div>
    </div>
  );
};

export default PlaylistsPage;
