import { Component, inject } from '@angular/core';
import { LogService } from '../../services/log.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzCardModule,
    NzInputModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent {
  logService = inject(LogService);
  initLoading = false;
  logs: any = [];
  name?: string;
  page_index: number = 1;
  logCount = 0;
  ngOnInit() {
    this.getLogs();
  }
  getLogs() {
    this.initLoading = true;
    this.logService
      .getLogs({ page: this.page_index, name: this.name })
      .pipe(finalize(() => (this.initLoading = false)))
      .subscribe((res: any) => {
        this.logs = res.results;
        this.logCount = res.count;
      });
  }
}
