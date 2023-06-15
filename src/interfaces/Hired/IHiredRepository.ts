import { Hired } from "@prisma/client";
import { HiredDTO } from "../../dtos/HiredDTO";

export interface IHiredRepository {
    getAll(): Promise<Hired[]>;
    getById(hiredId: string): Promise<Hired | null>;
    create(hired: HiredDTO): Promise<Hired | null>;
    update(hiredId: string, hired: HiredDTO): Promise<Hired | null>;
}