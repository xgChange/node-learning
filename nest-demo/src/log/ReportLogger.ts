import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class ReportLogger extends ConsoleLogger {
  log(...rest: any[]) {
    console.log('[log上报]-', rest[0]);
    super.log.apply(this, rest);
  }

  error(...rest: any[]) {
    console.log('[error上报]-', rest[0]);
    super.error.apply(this, rest);
  }

  warn(...rest) {
    console.log('[warn上报]-', rest[0]);
    super.warn.apply(this, rest);
  }

  debug(...rest) {
    console.log('[debug上报]-', rest[0]);
    super.debug.apply(this, rest);
  }

  verbose(...rest) {
    console.log('[verbose上报]', rest[0]);
    super.verbose.apply(this, rest);
  }
}
