import { Project } from "@prisma/client";
import { ProjectDTO } from "../../dtos/ProjectDTO";

export interface IProjectRepository {
    getAll(): Promise<Project[]>;
    getById(projectId: number): Promise<Project | null>;
    create(project: ProjectDTO): Promise<Project | null>;
    update(projectId: number, project: ProjectDTO): Promise<Project | null>;
}