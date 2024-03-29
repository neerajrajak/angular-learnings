import { Component, Input } from "@angular/core";
//import { LoggingService } from "../shared/logging.service";
import { AccountService } from "./account.service";
import { from } from "rxjs";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
  //providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  constructor(
    //private logStatusService: LoggingService,
    private accountService: AccountService
  ) {}

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    //this.logStatusService.logAccountStatus(status);
    this.accountService.statusUpdated.emit(status);
  }
}
