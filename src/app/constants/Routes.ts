export default
{
    auth: "/auth",
    register: "/auth/register",

    resetPassword: "/auth/password/reset",
    changePassword: "/auth/password/change/:token",
    unknown: "/unknown",

    app: "/app",

    // Admin
    // User
    user: "/app/user",
    editUser: "/app/user/edit/:userId",
    addUser: "/app/user/add",
    // ElectionCandidateType
    electionCandidateType: "/app/electionCandidateType",
    editElectionCandidateType: "/app/electionCandidateType/edit/:electionCandidateTypeId",
    addElectionCandidateType: "/app/electionCandidateType/add",
    // Election
    election: "/app/election",
    editElection: "/app/election/edit/:electionId",
    addCandidateElection: "/app/election/addCandidate/:electionId/:electionCandidateTypeId",
    addElection: "/app/election/add"
}
