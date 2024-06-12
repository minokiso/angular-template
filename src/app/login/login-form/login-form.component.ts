import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize, map, tap } from 'rxjs/operators';
import { fnCheckForm } from '../../utils/tools';
import { LoginService } from '../../services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isPasswordPass } from '../../utils/validate/validate';
import { ShareModule } from '../../shared/modules/share.module';
import { EnvironmentService } from '../../services/environment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [ShareModule],
})
export class LoginFormComponent implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router);
  public env = inject(EnvironmentService);
  private msg = inject(NzMessageService);
  private jwtService = new JwtHelperService();
  private fb = inject(FormBuilder);
  captcha$!: Observable<any>;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isVisible = false;
  destroyRef = inject(DestroyRef);

  getCaptcha() {
    return this.loginService.getCaptcha().pipe(
      tap((res: any) => {
        this.loginForm.patchValue({ captchaKey: res.key });
      }),
      map((res) => `${this.env.environment.serverUrl}${res.url}`)
    );
  }

  login(): void {
    if (!fnCheckForm(this.loginForm)) {
      return;
    }

    const param = this.loginForm.getRawValue();
    this.loginService
      .login({ ...param, role: 'A' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((userToken) => {
        try {
          let tokenInfo = this.jwtService.decodeToken(userToken.access);
          console.log(tokenInfo);
          this.loginService.saveToken(userToken);
          this.loginService.setTokenInfo(tokenInfo);
          this.router.navigateByUrl('/shell');
        } catch (err) {
          this.msg.error('Token 解析失败，请重新登录');
        }
      });
    this.captcha$ = this.getCaptcha();
  }

  ngOnInit(): void {
    this.captcha$ = this.getCaptcha();
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      captchaKey: [null, [Validators.required]],
    });
  }

  // passwordValidator(control: AbstractControl): ValidationErrors | null {
  //   const password = control.value;
  //   const valid = isPasswordPass(password);
  //   return valid ? null : { password: true, error: true };
  // }
  // autoTips = {
  //   default: {
  //     password: '密码需6~20位的数字和非数字组成',
  //     required: '此项是必填项',
  //   },
  // };
}
