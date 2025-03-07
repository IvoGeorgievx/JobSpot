export enum JobType {
	FULL_TIME = "FULL_TIME",
	PART_TIME = "PART_TIME",
	CONTRACT = "CONTRACT",
	TEMPORARY = "TEMPORARY",
	INTERN = "INTERN",
	FREELANCE = "FREELANCE",
}

export interface JobPosting {
	id: string;
	title: string;
	description: string;
	field: string;
	jobType: JobType;
	requirements: string;
	responsibilities: string;
	salaryMin?: number;
	salaryMax?: number;
}

export const jobTypeMap: { [key in JobType]: string } = {
	[JobType.FULL_TIME]: "Full time",
	[JobType.CONTRACT]: "Contract",
	[JobType.FREELANCE]: "Freelance",
	[JobType.INTERN]: "Intern",
	[JobType.PART_TIME]: "Part time",
	[JobType.TEMPORARY]: "Temporary",
} as const;
