import { Pipe, PipeTransform } from '@angular/core';
import { APP_CONSTS } from 'src/app/config/app.constants';
import * as moment from 'moment';

/*
 * Return the human readable date for a given Date object
 * Takes  as an argument
 * Usage:
 *   date | formatDate
*/
@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    if (value) {
      const format = moment.localeData().longDateFormat(<moment.LongDateFormatKey>APP_CONSTS.LONG_DATE_FORMAT);
      const dateStr = moment(value).format(format);
      return dateStr;
    } else {
      return undefined;
    }
  }
}
