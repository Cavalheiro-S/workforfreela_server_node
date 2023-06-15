export class HiredDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    description: string;
    skills: string;
    occupation: string

    constructor(id:string, name: string, email: string, password: string, description: string, skills: string, occupation: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.description = description;
        this.skills = skills;
        this.occupation = occupation;
    }
}