import { TimeHelper } from "../DashboardContainer/TimeHelper";

test('TimeHelper: Diff seconds', () => {

  expect(TimeHelper.
    diffSeconds(new Date('Sun Aug 11 2019 14:55:00'), new Date('Sun Aug 11 2019 14:55:50'))).toEqual(50);
  expect(TimeHelper.
    diffSeconds(new Date('Sun Aug 11 2019 14:57:00'), new Date('Sun Aug 11 2019 14:59:00'))).toEqual(120);
  expect(TimeHelper.
    diffSeconds(new Date('Sun Aug 11 2019 15:00:00'), new Date('Sun Aug 11 2019 17:00:00'))).toEqual(7200);
  expect(TimeHelper.
    diffSeconds(new Date('Sun Aug 11 2019 15:10:24'), new Date('Sun Aug 11 2019 17:15:55'))).toEqual(7531);
  
});

test('TimeHelper: Formatted Date', () => {

  expect(TimeHelper.formattedDate(new Date('05/09/2018'))).toEqual('09 May');
  expect(TimeHelper.formattedDate(new Date('04/09/2018'))).toEqual('09 Apr');
  expect(TimeHelper.formattedDate(new Date('06/09/2018'))).toEqual('09 Jun');
  expect(TimeHelper.formattedDate(new Date('06/09/2019'))).toEqual('09 Jun');
  expect(TimeHelper.formattedDate(new Date('12/23/2019'))).toEqual('23 Dec');
  
});

test('TimeHelper: Formatted time Diff', () => {

  expect(TimeHelper.formattedTimeDiff(5)).toEqual('0h0m');
  expect(TimeHelper.formattedTimeDiff(60)).toEqual('1m');
  expect(TimeHelper.formattedTimeDiff(3600)).toEqual('1h');
  expect(TimeHelper.formattedTimeDiff(86400)).toEqual('1day');
  expect(TimeHelper.formattedTimeDiff(172800)).toEqual('2days');
  expect(TimeHelper.formattedTimeDiff(172860)).toEqual('2days 1m');
  expect(TimeHelper.formattedTimeDiff(172980)).toEqual('2days 3m');
  expect(TimeHelper.formattedTimeDiff(273780)).toEqual('3days 4h3m');
  
});

test('TimeHelper: Get hours from seconds', () => {

  expect(TimeHelper.getHoursFromSeconds(5)).toEqual(0);
  expect(TimeHelper.getHoursFromSeconds(60)).toEqual(0);
  expect(TimeHelper.getHoursFromSeconds(3600)).toEqual(1);
  expect(TimeHelper.getHoursFromSeconds(86400)).toEqual(24);
  expect(TimeHelper.getHoursFromSeconds(172800)).toEqual(48);
  expect(TimeHelper.getHoursFromSeconds(259200)).toEqual(72);
  expect(TimeHelper.getHoursFromSeconds(226800)).toEqual(63);
  
});

test('TimeHelper: Date overlaps', () => {

  expect(TimeHelper.dateRangeOverlaps(new Date('05/09/2018'),
    new Date('04/09/2018'), new Date('06/09/2018'), new Date('07/09/2018'))).toEqual(false);
    expect(TimeHelper.dateRangeOverlaps(new Date('05/06/2018'),
    new Date('05/30/2018'), new Date('05/09/2018'), new Date('06/01/2018'))).toEqual(true);
    expect(TimeHelper.dateRangeOverlaps(new Date('05/06/2018'),
      new Date('05/30/2019'), new Date('11/09/2018'), new Date('12/01/2018'))).toEqual(true);
  
});

test('TimeHelper: Date between', () => {

  expect(TimeHelper.dateBetween(new Date('05/09/2018'),
    new Date('04/09/2018'), new Date('06/09/2018'))).toEqual(true);
    expect(TimeHelper.dateBetween(new Date('12/23/2018'),
      new Date('04/09/2018'), new Date('06/09/2019'))).toEqual(true);
    expect(TimeHelper.dateBetween(new Date('12/23/2019'),
      new Date('04/09/2018'), new Date('06/09/2019'))).toEqual(false);
  
});
