import { Hired } from "@prisma/client";
import { IServiceResponse } from "../IServiceResponse";

export interface IHiredService {
    getAll(): Promise<IServiceResponse<Hired>>
    getById(hiredId: string): Promise<IServiceResponse<Hired>>
    create(hired: any): Promise<IServiceResponse<Hired>>
    update(hiredId: string, hired: any): Promise<IServiceResponse<Hired>>
    delete(hiredId: string): Promise<IServiceResponse<Hired>>
}