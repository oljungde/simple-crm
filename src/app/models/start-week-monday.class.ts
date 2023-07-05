import { NativeDateAdapter } from "@angular/material/core";

export class StartWeekMonday extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }
}