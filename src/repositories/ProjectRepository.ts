import { prisma } from '../../prisma';
import { ProjectDTO } from '../dtos/ProjectDTO';
import { IProjectRepository } from '../interfaces/Project/IProjectRepository';

export class ProjectRepository implements IProjectRepository {

    async getAll() {
        const projects = await prisma.project.findMany()
        return projects
    }

    async getById(id: number) {
        const project = await prisma.project.findUnique({
            where: { id: Number(id) }
        })
        return project
    }

    async create(project: ProjectDTO) {
        const newProject = await prisma.project.create({
            data: {
                name: project.name,
                description: project.description,
                value: project.value,
                deadline: new Date(project.deadline),
                category: Number(project.category),
                contractorId: project.idContractor,
            }
        })
        return newProject
    }

    async update(id: number, project: ProjectDTO) {
        const updatedProject = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                name: project.name,
                description: project.description,
                value: project.value,
                deadline: new Date(project.deadline),
                category: Number(project.category),
                contractorId: project.idContractor,
                hiredId: project.idHired,
            }
        })
        return updatedProject
    }

    async delete(id: number) {
        const deletedProject = await prisma.project.delete({
            where: { id: Number(id) }
        })
        return deletedProject
    }

}