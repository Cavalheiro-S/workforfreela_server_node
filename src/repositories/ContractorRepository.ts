import { prisma } from '../../prisma';
import { ContractorDTO } from '../dtos/ContractorDTO';
import { IContractorRepository } from '../interfaces/Contractor/IContractorRepository';

export class ContractorRepository implements IContractorRepository {

    async getAll() {
        const contractors = await prisma.contractor.findMany()
        return contractors
    }

    async getById(id: string) {
        const contractor = await prisma.contractor.findUnique({
            where: { id }
        })
        return contractor
    }

    async create(contractor: ContractorDTO) {
        const newContractor = await prisma.contractor.create({
            data: {
                id: contractor.id,
                name: contractor.name,
                email: contractor.email,
                password: contractor.password
            }
        })
        return newContractor
    }

    async update(id: string, contractor: ContractorDTO) {
        const updatedContractor = await prisma.contractor.update({
            where: { id },
            data: contractor
        })
        return updatedContractor
    }

    async delete(id: string) {
        const deletedContractor = await prisma.contractor.delete({
            where: { id }
        })
        return deletedContractor
    }

}