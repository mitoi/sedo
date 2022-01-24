import { User } from "./User";

export interface JobPosting {
    title: string,
    date: Date,
    location: string,
    description: string,
    user: User,
    category: string
};
