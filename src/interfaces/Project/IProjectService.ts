import { Project } from "@prisma/client";
import { IServiceResponse } from "../IServiceResponse";

export interface IProjectService {
    getAll(): Promise<IServiceResponse<Project>>
    getById(projectId: number): Promise<IServiceResponse<Project>>
    create(project: any): Promise<IServiceResponse<Project>>
    update(projectId: number, project: any): Promise<IServiceResponse<Project>>
    delete(projectId: number): Promise<IServiceResponse<Project>>
}