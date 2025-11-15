import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('locale-loading');
  private translate = inject(TranslateService);
  private readonly COOKIE_NAME = 'lang';

  constructor() {
    this.translate.addLangs(['vi', 'en']);
    this.translate.setFallbackLang('en');
    const lang = this.getCookie() || this.translate.getBrowserLang() || 'en';
    this.setCookie(lang);
    this.translate.use(lang);
  }

  changeLang(lang: 'en' | 'vi'): void {
    this.setCookie(lang);
    this.translate.use(lang);
  }

  getCookie(): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + this.COOKIE_NAME + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  setCookie(value: string) {
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;
    const expires = new Date(Date.now() + oneYearMs).toUTCString();
    document.cookie = `${this.COOKIE_NAME}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }
}
