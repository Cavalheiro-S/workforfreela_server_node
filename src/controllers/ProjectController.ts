import { Project } from "@prisma/client";
import { Request, Response, Router } from "express";
import { IControllerResponse } from "../interfaces/IControllerResponse";
import { asyncErrorHandler } from "../midllewares/AsyncErrorHandler";
import { ProjectService } from "../services/project/ProjectService";

const routerProject = Router()

const service = new ProjectService()

// GET /api/project
routerProject.get("/", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Project>>) => {
    const { statusCode, ...clientResponse } = await service.getAll()
    res.status(statusCode).json({ ...clientResponse })
}))

// GET /api/project/1
routerProject.get("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Project>>) => {
    const { statusCode, ...clientResponse } = await service.getById(Number(req.params.id))
    res.status(statusCode).json({ ...clientResponse })
}))

// POST /api/project
routerProject.post("/", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Project>>) => {
    const { statusCode, ...clientResponse } = await service.create(req.body)
    res.status(statusCode).json({ ...clientResponse })
}))

// PATCH /api/project/1
routerProject.patch("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Project>>) => {
    const { statusCode, ...clientResponse } = await service.update(Number(req.params.id), req.body)
    res.status(statusCode).json({ ...clientResponse })
}))

// DELETE /api/project/1
routerProject.delete("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Project>>) => {
    const { statusCode, ...clientResponse } = await service.delete(Number(req.params.id))
    res.status(statusCode).json({ ...clientResponse })
}))

export { routerProject };
