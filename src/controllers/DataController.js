import BaseController from './BaseController';
import { Data } from '../models';
import { Op } from 'sequelize';
import { time } from '../../lib/utils';

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

  static async getLastItem(device_id) {
    return Data.findOne({ where: { device_id }, order: [['id', 'desc']] });
  }

  static async storeData(device, { temperature, humidity }) {
    return Data.create({
      temperature: +temperature || null,
      humidity: +humidity || null,
      pressure: null,
      device_id: device,
      created_at: time(),
    });
  }
}
