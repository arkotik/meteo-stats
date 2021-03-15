import BaseController from './BaseController';
import { Data } from '../models';
import { Op } from 'sequelize';

export default class DataController extends BaseController {
  async actionGetData() {
    const { from_date, to_date } = this.data;
    const where = {
      created_at: {
        [Op.gte]: from_date,
        [Op.lte]: to_date,
      },
    };
    return Data.findAll({ where, order: [['id', 'desc']] });
  }
}
