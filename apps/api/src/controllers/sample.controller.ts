import { Request, Response } from 'express';
import prisma from '@/prisma';

export class SampleController {
  async getSampleData(req: Request, res: Response) {
    const sampleData = await prisma.sample.findMany();

    return res.status(200).send(sampleData);
  }

  async getSampleDataById(req: Request, res: Response) {
    const { id } = req.params;

    const sample = await prisma.sample.findUnique({
      where: { id: Number(id) },
    });

    if (!sample) {
      return res.send(404);
    }

    return res.status(200).send(sample);
  }

  async createSampleData(req: Request, res: Response) {
    const { name, code } = req.body;

    const newSampleData = await prisma.sample.create({
      data: { name, code },
    });

    return res.status(201).send(newSampleData);
  }
}
