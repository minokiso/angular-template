import { Component, EventEmitter, Input, Output, Pipe } from '@angular/core';
import { ShareModule } from '../../modules/share.module';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzButtonType } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export interface HeadConfig {
  heads: Head[];
  resizable?: boolean;
}

export interface Head {
  title: string;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  keys: Array<string | number>;
  pipe?: Pipe;
  right?: boolean;
  left?: boolean;
  // ellipsis?: boolean;
  // show?: boolean;
  // thClass?: string;
  // tdClass?: string;
}

export type PaginationConfig =
  | {
      pageIndex?: number;
      pageSize?: number;
      count?: number;
      needPaginations?: boolean;
    }
  | false;

type _OperationConfig = {
  label: string;
  type?: NzButtonType;
  danger?: boolean;
  onClick?: (data: any) => NzSafeAny | Promise<NzSafeAny>;
  disabled?: boolean;
};

export type OperationConfig = ((data: any) => _OperationConfig[]) | false;
@Component({
  selector: 'table-plus',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './table-plus.component.html',
  styleUrl: './table-plus.component.scss',
})
export class TablePlusComponent {
  @Output() onUpdate = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onOperate = new EventEmitter();
  @Output() onCheck = new EventEmitter();
  @Output() onPageIndexChange = new EventEmitter();
  @Output() onPageSizeChange = new EventEmitter();
  @Input() dataList: any[] = [];
  @Input() headConfig: HeadConfig = {
    heads: [],
    resizable: true,
  };
  @Input() operationConfig: OperationConfig = (data: any) => [
    {
      label: '修改',
      type: 'primary',
      onClick: (data) => this.onUpdate.emit(data),
    },
    {
      label: '删除',
      type: 'primary',
      danger: true,
      onClick: (data) => this.onDelete.emit(data),
    },
  ];

  // @Input() paginationConfig: PaginationConfig = false;

  @Input() scroll: {
    x?: string | null;
    y?: string | null;
  } = {};

  @Input() set loading(l: boolean) {
    this._loading = l;
  }

  get loading(): boolean {
    return this._loading;
  }

  @Input() checkableFn?: (date: any) => boolean = undefined;

  _loading = false;
  allChecked = false;
  indeterminate = false;
  checkedData = new Set<any>();

  getData(data: any, keys: Array<string | number>) {
    let target = data;
    keys.forEach((key) => {
      target = target?.[key];
    });
    return target;
  }

  onAllChecked(checked: boolean): void {
    const checkableData = this.checkableFn
      ? this.dataList.filter(this.checkableFn)
      : this.dataList;
    checkableData.forEach((data: any) => this.updateCheckedSet(data, checked));
    this.refreshCheckedStatus();
    this.onCheck.emit(this.checkedData);
  }

  refreshCheckedStatus(): void {
    const checkableData = this.checkableFn
      ? this.dataList.filter(this.checkableFn)
      : this.dataList;
    this.allChecked = checkableData.every((data: any) =>
      this.checkedData.has(data)
    );
    this.indeterminate =
      checkableData.some((data: any) => this.checkedData.has(data)) &&
      !this.allChecked;
  }

  onItemChecked(data: any, checked: boolean): void {
    this.updateCheckedSet(data, checked);
    this.refreshCheckedStatus();
    this.onCheck.emit(this.checkedData);
  }

  updateCheckedSet(data: any, checked: boolean): void {
    if (checked) {
      this.checkedData.add(data);
    } else {
      this.checkedData.delete(data);
    }
  }
  onResize({ width }: NzResizeEvent, col: string): void {
    this.headConfig.heads = this.headConfig.heads.map((head) =>
      head.title === col ? { ...head, width: `${width}px` } : head
    );
  }

  ngOnInit() {
    this.headConfig.heads.forEach((head) => {
      head.width = `${head.title.length}rem` || head.width;
    });
  }
  // getDisabled(
  //   data: any,
  //   disabled?: boolean | ((data: any) => boolean)
  // ): boolean {
  //   return typeof disabled === 'function' ? disabled(data) : !!disabled;
  // }
  // getOperationConfig(data:any, ): OperationConfig {
  //   return {
  //     label: string;
  //     type?: NzButtonType;
  //     danger?: boolean;
  //     onClick: (data: any) => NzSafeAny | Promise<NzSafeAny>;
  //     disabled?: (data: any) => boolean | boolean;
  //   }
  // }
}
