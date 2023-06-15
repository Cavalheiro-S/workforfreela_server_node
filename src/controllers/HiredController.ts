import { Hired } from "@prisma/client";
import { Request, Response, Router } from "express";
import { IControllerResponse } from "../interfaces/IControllerResponse";
import { asyncErrorHandler } from "../midllewares/AsyncErrorHandler";
import { HiredService } from "../services/hired/HiredService";

const routerHired = Router()

const service = new HiredService()

// GET /api/hired
routerHired.get("/", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Hired>>) => {
    const { statusCode, ...clientResponse } = await service.getAll()
    res.status(statusCode).json({ ...clientResponse })
}))

// GET /api/hired/1
routerHired.get("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Hired>>) => {
    const { statusCode, ...clientResponse } = await service.getById(req.params.id)
    res.status(statusCode).json({ ...clientResponse })
}))

// POST /api/hired
routerHired.post("/", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Hired>>) => {
    const { statusCode, ...clientResponse } = await service.create(req.body)
    res.status(statusCode).json({ ...clientResponse })
}))

// PATCH /api/hired/1
routerHired.patch("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Hired>>) => {
    const { statusCode, ...clientResponse } = await service.update(req.params.id, req.body)
    res.status(statusCode).json({ ...clientResponse })
}))

// DELETE /api/hired/1
routerHired.delete("/:id", asyncErrorHandler(async (req: Request, res: Response<IControllerResponse<Hired>>) => {
    const { statusCode, ...clientResponse } = await service.delete(req.params.id)
    res.status(statusCode).json({ ...clientResponse })
}))

export { routerHired };
