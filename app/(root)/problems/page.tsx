import { getCurrentUserData } from '@/modules/auth/actions'
import { getAllProblems } from '@/modules/problems/actions';
import ProblemsTable from '@/modules/problems/components/problem-table';
import type { UserData } from '@/modules/types/problem';

const ProblemsPage = async () => {
    const user = await getCurrentUserData() as UserData | undefined;

    const result = await getAllProblems(user?.id);

    if (!result.success) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-destructive">Error loading problems: {result.error}</p>
        </div>
      );
    }

    const problems = result.data;

  return (
    <div className='container mx-auto py-32'>
        <ProblemsTable problems={problems} user={user ?? null} />
    </div>
  )
}

export default ProblemsPage
