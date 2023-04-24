interface Props {
    email: string;
    name?: string;
    password: string;
    birth?: string;
    nickname?: string;
}
export declare class CreateUserDTO {
    email: string;
    password: string;
    name?: string;
    birth?: string;
    nickname?: string;
    constructor(props?: Props);
    hashPassword(salt: number): Promise<string>;
}
export {};
