import { ProjectCategoryEnum } from "../enums/ProjectCategoryEnum";

export class ProjectDTO {
    id: number
    idContractor: string;
    idHired?: string;
    name: string;
    description: string;
    value: number;
    deadline: Date;
    category: ProjectCategoryEnum;

    constructor(id: number, idContractor: string, name: string, description: string, value: number, deadline: Date, category: ProjectCategoryEnum) {
        this.id = id;
        this.idContractor = idContractor;
        this.name = name;
        this.description = description;
        this.value = value;
        this.deadline = deadline;
        this.category = category;
    }
}