import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class ReportLogger extends ConsoleLogger {
  log(...rest: any[]) {
    console.log('[log]-', rest[0]);
    super.log.apply(this, rest);
  }

  error(...rest: any[]) {
    console.log('[error]-', rest[0]);
    super.error.apply(this, rest);
  }

  warn(...rest) {
    console.log('[warn]-', rest[0]);
    super.warn.apply(this, rest);
  }

  debug(...rest) {
    console.log('[debug]-', rest[0]);
    super.debug.apply(this, rest);
  }

  verbose(...rest) {
    console.log('[verbose]', rest[0]);
    super.verbose.apply(this, rest);
  }
}
