
import { LoggingService } from '../shared/logging.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AccountService{

    constructor(private loggingService : LoggingService){}
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

      statusUpdated = new EventEmitter<string>();

      addAccount(name: string, status: string){
        this.accounts.push({ name : name, status : status});
        this.loggingService.logAccountStatus(status);
      }

      updateStatus(id: number, newStatus: string){
          this.accounts[id].status = newStatus;
          this.loggingService.logAccountStatus(status);
      }
}