import BaseController from './BaseController';
import { Device } from '../models';

export default class DeviceController extends BaseController {
  static async findDevice(api_token) {
    return Device.findOne({
      where: { api_token }
    });
  }
}
