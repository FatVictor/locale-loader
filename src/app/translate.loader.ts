import {TranslateLoader} from '@ngx-translate/core';
import {from, map, Observable} from 'rxjs';

export class TsDynamicLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`./i18n/${lang}.ts`)).pipe(
      map(module => module.default || module[lang])
    );
  }
}

// import { TranslateLoader } from '@ngx-translate/core';
// import { from, forkJoin, Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// export class TsDynamicLoader implements TranslateLoader {
//   getTranslation(lang: string): Observable<any> {
//     // Require context-like dynamic import using Vite/Angular builder
//     const modules: Record<string, () => Promise<any>> = import.meta.glob(
//       `../assets/i18n/${lang}/**/*.ts`,
//       { eager: false }
//     );
//
//     const loaders = Object.values(modules).map(load => from(load()));
//
//     if (loaders.length === 0) {
//       console.warn(`No translation files found for: ${lang}`);
//       return of({});
//     }
//
//     return forkJoin(loaders).pipe(
//       map(results => {
//         const merged: any = {};
//         for (const m of results) {
//           Object.assign(merged, m.default);
//         }
//         return merged;
//       })
//     );
//   }
// }
