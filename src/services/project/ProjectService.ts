import { Project } from "@prisma/client";
import Joi from "joi";
import { VALIDATION_MESSAGES } from "../../consts/ValidationMessages";
import { ProjectDTO } from "../../dtos/ProjectDTO";
import { StatusCode } from "../../enums/StatusCode";
import { ValidationError } from "../../exceptions/ValidationError";
import { IProjectService } from "../../interfaces/Project/IProjectService";
import { ProjectRepository } from "../../repositories/ProjectRepository";
import { getErrorResponse, getSuccessResponse } from "../../utils/ApiResponse";
import { schemaIdNumber } from "../../utils/ValidationSchema";
import { ProjectCategoryEnum } from "../../enums/ProjectCategoryEnum";

export class ProjectService implements IProjectService {

    private repository = new ProjectRepository()

    private schemaProject = Joi.object({
        idContractor: Joi.string().required(),
        idHired: Joi.string(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
        deadline: Joi.date().required(),
        category: Joi.number().required(),
    })

    validateProject(project: Object) {
        const { error } = this.schemaProject.validate(project)
        if(error) {
            error.message = error.message.replace(/"/g, "")
            throw new ValidationError(error.message)
        }
    }

    validateId(projectId: number) {
        const { error } = schemaIdNumber.validate(projectId)
        if(error) {
            error.message = error.message.replace(/"/g, "")
            throw new ValidationError(error.message)
        }
    }

    async getAll() {
        const projects = await this.repository.getAll();
        return projects.length === 0
            ? getSuccessResponse<Project>(StatusCode.OK, projects, VALIDATION_MESSAGES.ListEmpty)
            : getSuccessResponse<Project>(StatusCode.OK, projects)
    }

    async getById(projectId: number) {
        this.validateId(projectId)
        const project = await this.repository.getById(projectId);
        return project
            ? getSuccessResponse<Project>(StatusCode.OK, project)
            : getErrorResponse(StatusCode.NOT_FOUND, [VALIDATION_MESSAGES.NotFound])
    }

    async create(project: Object) {
        this.validateProject(project)
        const projectDTO = project as ProjectDTO
        const newProject = await this.repository.create(projectDTO);
        return newProject
            ? getSuccessResponse<Project>(StatusCode.CREATED, newProject)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.CreateFailed])
    }

    async update(projectId: number, project: ProjectDTO) {
        this.validateId(projectId)
        this.validateProject(project)
        const projectDTO = project as ProjectDTO
        const updatedProject = await this.repository.update(projectId, projectDTO);
        return updatedProject
            ? getSuccessResponse<Project>(StatusCode.OK, updatedProject)
            : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.UpdateFailed])
    }

    async delete (projectId: number) {
    this.validateId(projectId)
    const deletedProject = await this.repository.delete(projectId);
    return deletedProject
        ? getSuccessResponse<Project>(StatusCode.OK, deletedProject)
        : getErrorResponse(StatusCode.BAD_REQUEST, [VALIDATION_MESSAGES.DeleteFailed])
}
}