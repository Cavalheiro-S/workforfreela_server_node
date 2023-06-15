import { prisma } from '../../prisma';
import { ProposeDTO } from '../dtos/ProposeDTO';
import { IProposeRepository } from '../interfaces/Propose/IProposeRepository';

export class ProposeRepository implements IProposeRepository {

    async getAll() {
        const proposes = await prisma.propose.findMany()
        return proposes
    }

    async getById(id: number) {
        const propose = await prisma.propose.findUnique({
            where: { id: Number(id) }
        })
        return propose
    }

    async getByHiredId(id: string) {

        const propose = await prisma.propose.findMany({
            where: { hiredId: id },
           include: {
                project: true
           } 
        })
        return propose
    }

    async create(propose: ProposeDTO) {
        const newPropose = await prisma.propose.create({
            data: {
                projectId: Number(propose.idProject),
                hiredId: propose.idHired,
                description: propose.description,
                value: propose.value,
                deadline: new Date(propose.deadline),
            }
        })
        return newPropose
    }

    async update(id: number, propose: ProposeDTO) {
        const updatedPropose = await prisma.propose.update({
            where: { id: Number(id) },
            data: {
                projectId: Number(propose.idProject),
                hiredId: propose.idHired,
                description: propose.description,
                value: propose.value,
                deadline: new Date(propose.deadline),
            }
        })
        return updatedPropose
    }

    async delete(id: number) {
        const deletedPropose = await prisma.propose.delete({
            where: { id: Number(id) }
        })
        return deletedPropose
    }

}