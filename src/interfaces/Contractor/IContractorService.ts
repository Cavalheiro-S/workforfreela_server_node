import { Contractor } from "@prisma/client";
import { IServiceResponse } from "../IServiceResponse";

export interface IContractorService {
    getAll(): Promise<IServiceResponse<Contractor>>
    getById(contractorId: string): Promise<IServiceResponse<Contractor>>
    create(contractor: any): Promise<IServiceResponse<Contractor>>
    update(contractorId: string, contractor: any): Promise<IServiceResponse<Contractor>>
    delete(contractorId: string): Promise<IServiceResponse<Contractor>>
}