import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzResizableModule } from 'ng-zorro-antd/resizable';

const NG_ZORRO_MODULES = [
  NzCardModule,
  NzSelectModule,
  NzSwitchModule,
  NzSpaceModule,
  NzGridModule,
  NzFlexModule,
  NzFormModule,
  NzInputModule,
  NzTableModule,
  NzDescriptionsModule,
  NzNotificationModule,
  NzWaveModule,
  NzInputNumberModule,
  NzButtonModule,
  NzTagModule,
  NzTabsModule,
  NzIconModule,
  NzTimePickerModule,
  NzLayoutModule,
  NzMenuModule,
  NzEmptyModule,
  NzAvatarModule,
  NzDividerModule,
  NzModalModule,
  NzCarouselModule,
  NzUploadModule,
  NzImageModule,
  NzPaginationModule,
  NzPopconfirmModule,
  NzCollapseModule,
  NzCheckboxModule,
  NzSpinModule,
  NzDatePickerModule,
  NzResizableModule,
];

@NgModule({
  declarations: [],
  imports: NG_ZORRO_MODULES,
  exports: NG_ZORRO_MODULES,
})
export class NgZorroModule {}
