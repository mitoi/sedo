import { User } from "./User";
import { Pictures } from "./Pictures";

export interface JobPosting {
    id: string,
    title: string,
    date: Date,
    location: string,
    description: string,
    user: User,
    category: string,
    pictures?: Pictures,
    userId: string,
}
