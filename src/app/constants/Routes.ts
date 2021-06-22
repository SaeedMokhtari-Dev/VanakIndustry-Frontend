export default
{
    auth: "/auth",
    register: "/auth/register",

    resetPassword: "/auth/password/reset",
    changePassword: "/auth/password/change/:token",
    unknown: "/unknown",

    app: "/app",

    // Admin
    // Company
    company: "/app/company",
    editCompany: "/app/company/edit/:companyId",
    addCompany: "/app/company/add"
}
