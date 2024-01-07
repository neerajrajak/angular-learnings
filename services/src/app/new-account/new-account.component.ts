import { Component } from "@angular/core";
//import { LoggingService } from "../shared/logging.service";
import { AccountService } from "../account/account.service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html"
 // styleUrls: ["./new-account.component.css"]
 // providers: [LoggingService]
})
export class NewAccountComponent {
  constructor(
    //private logStatusService: LoggingService,
    private accountService: AccountService
  ) {
    this.accountService.statusUpdated.subscribe(
      (status : string) => alert('New Status : '+status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
   // this.logStatusService.logAccountStatus(accountStatus);
  }
}
