export class ProposeDTO {
    id: number
    idProject: number;
    idHired: string;
    description: string;
    value: number;
    deadline: Date;

    constructor(id: number, description: string, value: number, deadline: Date, idProject: number, idHired: string) {
        this.id = id;
        this.idProject = idProject;
        this.idHired = idHired;
        this.description = description;
        this.value = value;
        this.deadline = deadline;
    }
}