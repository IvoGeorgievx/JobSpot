import { JobPosting } from "./job-type";

export enum ApplicationStatus {
	APPLIED = "APPLIED",
	REVIEWED = "REVIEWED",
	REJECTED = "REJECTED",
}

export interface JobApplication {
	id: string;
	applicantProfileId: string;
	jobPostingId: string;
	status: ApplicationStatus;
	jobPosting: JobPosting;
}
