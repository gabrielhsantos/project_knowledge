import { Plan } from '@core/infrastructure/entities/plan.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '@core/infrastructure/entities/product.entity';
import { Client } from '@core/infrastructure/entities/client.entity';
import { IPlanRepository } from '@core/domain/interfaces/plan.interface';

@Injectable()
export class PlanRepository implements IPlanRepository {
  constructor(
    @InjectModel(Plan)
    private readonly planModel: typeof Plan,
  ) {}

  async findOneByUuid(uuid: string): Promise<Plan | null> {
    return await this.planModel.findOne({
      where: { uuid },
      include: [{ model: Product }, { model: Client }],
    });
  }

  async create(planData: any): Promise<Plan> {
    return await this.planModel.create(planData);
  }
}
