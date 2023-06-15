import { Propose } from "@prisma/client";
import { ProposeDTO } from "../../dtos/ProposeDTO";

export interface IProposeRepository {
    getAll(): Promise<Propose[]>;
    getById(proposeId: number): Promise<Propose | null>;
    create(propose: ProposeDTO): Promise<Propose | null>;
    update(proposeId: number, propose: ProposeDTO): Promise<Propose | null>;
}