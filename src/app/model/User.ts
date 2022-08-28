export interface User {
    id: string;
    type: string,
    firstName: string,
    lastName: string,
    email: string,
    rating?: number,
    profilePic?: string,
    token?: string,
}
