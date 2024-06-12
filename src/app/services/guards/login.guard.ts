import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
// import { LoginInOutService } from '../common/login-in-out.service';
// import { WindowService } from '../common/window.service';
// import { TokenKey, TokenPre } from '@app/config/constant';
// import { UserInfo, UserInfoService } from '../store/common-store/userInfo.service';

export const loginGuard: CanActivateChildFn = (childRoute, state) => {
  // const loginInOut = inject(LoginInOutService);
  // const windowService = inject(WindowService);
  // const userInfoService = inject(UserInfoService);
  // const token = windowService.getSessionStorage(TokenKey);
  // 解析token ，然后获取用户信息
  // const userInfo: UserInfo = userInfoService.parsToken(TokenPre + token);
  // console.log(userInfo);

  return true;
};
