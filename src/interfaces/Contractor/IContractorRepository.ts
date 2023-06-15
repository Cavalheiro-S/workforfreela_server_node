import { Contractor } from "@prisma/client";
import { ContractorDTO } from "../../dtos/ContractorDTO";

export interface IContractorRepository {
    getAll(): Promise<Contractor[]>;
    getById(contractorId: string): Promise<Contractor | null>;
    create(contractor: ContractorDTO): Promise<Contractor | null>;
    update(contractorId: string, contractor: ContractorDTO): Promise<Contractor | null>;
}