import { NgModule } from '@angular/core';
import { NgZorroModule } from './ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

const SHARE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgZorroModule,
  RouterModule,
  RouterOutlet,
];

@NgModule({
  declarations: [],
  imports: SHARE_MODULES,
  exports: SHARE_MODULES,
})
export class ShareModule {}
