import { Propose } from "@prisma/client";
import { IServiceResponse } from "../IServiceResponse";

export interface IProposeService {
    getAll(): Promise<IServiceResponse<Propose>>
    getById(proposeId: number): Promise<IServiceResponse<Propose>>
    create(propose: any): Promise<IServiceResponse<Propose>>
    update(proposeId: number, propose: any): Promise<IServiceResponse<Propose>>
    delete(proposeId: number): Promise<IServiceResponse<Propose>>
}