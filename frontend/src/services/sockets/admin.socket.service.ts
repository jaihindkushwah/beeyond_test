import { SocketService } from "./socket.service";

export class AdminSocketService extends SocketService {
  constructor() {
    super();
  }
}
export const adminSocketService = new AdminSocketService();
