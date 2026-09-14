import { getCurrentUserData } from '@/modules/auth/actions'
import { SubmissionHistory } from '@/modules/problems/components/problem-page-specific-utility/submission-history'
import PlaylistsSection from '@/modules/profile/components/playlist-section'
import ProfileStats from '@/modules/profile/components/profile-stats'
import SolvedProblems from '@/modules/profile/components/solved-problems'
import UserInfoCard from '@/modules/profile/components/user-info-card'
import type { UserData } from '@/modules/types/problem'

const ProfilePage = async () => {
  const profileData = await getCurrentUserData() as UserData | undefined;

  if (!profileData) {
    return (
      <div className="min-h-screen py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-muted-foreground">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-32'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <UserInfoCard userData={profileData} />

        <ProfileStats
          submissions={profileData.submissions}
          solvedCount={profileData.solvedProblems.length}
          playlistCount={profileData.playlists.length}
        />

        <SubmissionHistory submissions={profileData.submissions} />

        <div className='grid gap-8'>
          <SolvedProblems solvedProblems={profileData.solvedProblems} />
          <PlaylistsSection playlists={profileData.playlists} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
