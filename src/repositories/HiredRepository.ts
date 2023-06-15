import { prisma } from '../../prisma';
import { HiredDTO } from '../dtos/HiredDTO';
import { IHiredRepository } from '../interfaces/Hired/IHiredRepository';

export class HiredRepository implements IHiredRepository {

    async getAll() {
        const hireds = await prisma.hired.findMany()
        return hireds
    }

    async getById(id: string) {
        const hired = await prisma.hired.findUnique({
            where: { id }
        })
        return hired
    }

    async create(hired: HiredDTO) {
        const newHired = await prisma.hired.create({
            data: {
                id: hired.id,
                name: hired.name,
                email: hired.email,
                password: hired.password,
                description: hired.description,
                occupation: hired.occupation,
                skills: hired.skills,
            }
        })
        return newHired
    }

    async update(id: string, hired: HiredDTO) {
        const updatedHired = await prisma.hired.update({
            where: { id },
            data: hired
        })
        return updatedHired
    }

    async delete(id: string) {
        const deletedHired = await prisma.hired.delete({
            where: { id }
        })
        return deletedHired
    }

}