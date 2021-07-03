import Routes from "app/constants/Routes";

export function getEditUserRoute(userId: number = null): string
{
    return Routes.editUser.replace('/:userId', userId ? `/${userId}` : '');
}
export function getEditElectionCandidateTypeRoute(electionCandidateTypeId: number = null): string
{
    return Routes.editElectionCandidateType.replace('/:electionCandidateTypeId', electionCandidateTypeId ? `/${electionCandidateTypeId}` : '');
}
export function getEditElectionRoute(electionId: number = null): string
{
    return Routes.editElection.replace('/:electionId', electionId ? `/${electionId}` : '');
}
export function getPresentElectionRoute(electionId: number = null): string
{
    return Routes.presentUser.replace('/:electionId', electionId ? `/${electionId}` : '');
}
export function getAddCandidateElectionRoute(electionId: number = null, electionCandidateTypeId: number = null): string
{
    return Routes.addCandidateElection.replace('/:electionId', electionId ? `/${electionId}` : '')
        .replace('/:electionCandidateTypeId', electionCandidateTypeId ? `/${electionCandidateTypeId}` : '');
}
export function getElectionProcessRoute(electionId: number = null): string
{
    return Routes.electionProcess.replace('/:electionId', electionId ? `/${electionId}` : '');
}
