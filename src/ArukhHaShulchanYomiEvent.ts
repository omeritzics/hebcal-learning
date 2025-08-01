import {Event, HDate, Locale, flags} from '@hebcal/core';
import {AhSYomiReading} from './arukhHaShulchanYomiBase';
import {gematriyaNN} from './common';
import './locale';

/**
 * Event wrapper around a Arukh HaShulchan Yomi reading
 */
export class ArukhHaShulchanYomiEvent extends Event {
  reading: AhSYomiReading;
  category: string;
  constructor(date: HDate, reading: AhSYomiReading) {
    super(date, `${reading.k} ${reading.v}`, flags.DAILY_LEARNING);
    this.reading = reading;
    this.category = 'Arukh HaShulchan Yomi';
  }
  render(locale?: string): string {
    locale = locale || Locale.getLocaleName();
    if (typeof locale === 'string') {
      locale = locale.toLowerCase();
    }
    const reading = this.reading;
    const name = Locale.gettext(reading.k, locale);
    if (locale === 'he' || locale === 'he-x-nonikud') {
      const parts = reading.v.split('-');
      const beginEnd = parts.map(x => x.split(/\./).map(gematriyaNN).join(':'));
      return name + ' ' + beginEnd.join('-');
    }
    return name + ' ' + reading.v.replace(/\./g, ':');
  }
  /**
   * Returns a link to sefaria.org
   */
  url(): string {
    const reading = this.reading;
    const name = 'Arukh HaShulchan, ' + reading.k + '.' + reading.v;
    const urlName = encodeURIComponent(name.replace(/ /g, '_'));
    return `https://www.sefaria.org/${urlName}?lang=bi`;
  }
  getCategories(): string[] {
    return ['arukhHaShulchanYomi'];
  }
}
