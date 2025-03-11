import { RouteObject } from "react-router";
import { UserRole } from "../common/enums/user-role.enum";
import { ApplicantProfile } from "../components/ApplicantProfile";
import { CompanyPostings } from "../components/CompanyPostings";
import { CompanyProfile } from "../components/CompanyProfile/CompanyProfile";
import { Home } from "../components/Home";
import { JobPosting } from "../components/JobPosting";
import { JobPostings } from "../components/JobPostings";
import { Login } from "../components/Login";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { Register } from "../components/Register";
import { JobApplicants } from "../components/JobApplicants";
import JobApplications from "../components/JobApplications";
import ApplicantHome from "../components/ApplicantDashboard/ApplicantHome";
import CompanyHome from "../components/CompanyHome";

export const routes: RouteObject[] = [
	{
		path: "",
		element: <ProtectedRoutes allowedRoles={["guest"]} element={<Home />} />,
	},
	{
		path: "register",
		element: (
			<ProtectedRoutes allowedRoles={["guest"]} element={<Register />} />
		),
	},
	{
		path: "login",
		element: <ProtectedRoutes allowedRoles={["guest"]} element={<Login />} />,
	},
	{
		path: "profile/applicant",
		element: (
			<ProtectedRoutes
				allowedRoles={[UserRole.APPLICANT]}
				element={<ApplicantProfile />}
			/>
		),
	},
	{
		path: "profile/company",
		element: (
			<ProtectedRoutes
				allowedRoles={[UserRole.COMPANY]}
				element={<CompanyProfile />}
			/>
		),
	},
	{
		path: "job-posting",
		element: (
			<ProtectedRoutes
				allowedRoles={[UserRole.COMPANY]}
				element={<JobPosting />}
			/>
		),
	},
	{
		path: "browse",
		element: <JobPostings />,
	},
	{
		path: "job-posting/company",
		element: (
			<ProtectedRoutes
				allowedRoles={[UserRole.COMPANY]}
				element={<CompanyPostings />}
			/>
		),
	},
	{
		path: "job-applicants",
		element: (
			<ProtectedRoutes
				allowedRoles={[UserRole.COMPANY]}
				element={<JobApplicants />}
			/>
		),
	},
	{
		path: "profile/applications",
		element: (
			<ProtectedRoutes
				allowedRoles={[UserRole.APPLICANT]}
				element={<JobApplications />}
			/>
		),
	},
	{
		path: "home/applicant",
		element: (
			<ProtectedRoutes
				allowedRoles={[UserRole.APPLICANT]}
				element={<ApplicantHome />}
			/>
		),
	},
	{
		path: "home/company",
		element: (
			<ProtectedRoutes
				allowedRoles={[UserRole.COMPANY]}
				element={<CompanyHome />}
			/>
		),
	},
];
