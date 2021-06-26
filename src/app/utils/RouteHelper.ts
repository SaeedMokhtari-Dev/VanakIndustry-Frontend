import Routes from "app/constants/Routes";

export function getEditUserRoute(userId: number = null): string
{
    return Routes.editUser.replace('/:userId', userId ? `/${userId}` : '');
}
export function getEditElectionCandidateTypeRoute(electionCandidateTypeId: number = null): string
{
    return Routes.editElectionCandidateType.replace('/:electionCandidateTypeId', electionCandidateTypeId ? `/${electionCandidateTypeId}` : '');
}
