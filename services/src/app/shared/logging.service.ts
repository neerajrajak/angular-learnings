export class LoggingService {
  logAccountStatus(status: string) {
    console.log("A server status changed, new status => " + status);
  }
}
