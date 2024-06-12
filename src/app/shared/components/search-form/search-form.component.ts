import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ShareModule } from '../../modules/share.module';

export interface SearchFormOption {
  label: string;
  value: number | string | any;
}

export interface SearchFormConfig {
  title: string;
  fields: FieldConfig[];
}

export interface FieldConfig {
  name: string;
  controlName: string;
  placeholder?: string;
  type: 'input' | 'select' | 'date' | 'rangeDate';
  optionList?: SearchFormOption[];
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ShareModule],
})
export class SearchFormComponent {
  private fb = inject(FormBuilder);
  @Input() formConfig!: SearchFormConfig;
  @Input() initialCount: number = 6;
  @Output() onReset = new EventEmitter<FormGroup>();
  @Output() onSubmit = new EventEmitter<FormGroup>();
  searchForm!: FormGroup;
  isCollapse = true; // 搜索框折叠

  initForm(): void {
    let form: NzSafeAny = {};
    for (const i of this.formConfig.fields) {
      form[i.controlName] = [null, []];
    }
    this.searchForm = this.fb.group(form);
  }

  search() {
    this.onSubmit.emit(this.searchForm);
  }

  reset() {
    this.searchForm.reset();
    this.onReset.emit(this.searchForm);
  }

  ngOnInit() {
    this.initForm();
  }
}
