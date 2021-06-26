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
    addUser: "/app/user/add"
}
