import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../shared/services/admin.service";

@Component({
  selector: 'app-tables-watcher',
  templateUrl: './tables-watcher.component.html',
  styleUrls: ['./tables-watcher.component.less']
})
export class TablesWatcherComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

}
