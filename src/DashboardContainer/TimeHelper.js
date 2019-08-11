import moment from 'moment';

export class TimeHelper {

  /** Get the diffence in seconds between given start and end time */
  static diffSeconds = (startDate, endDate) => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffSecs = Math.ceil(diffTime / (1000));

    return diffSecs;
  }

  /** Format the date as 10 Ago. */
  static formattedDate = (date) => {
    
    return moment(date).format('DD MMM');
  }

  /** Returns a formatted amount of time (dd hh mm ss) given time in seconds */
  static formattedTimeDiff = (diffSecs) => {

    if (!diffSecs || diffSecs < 60) {
      return '0h0m';
    }

    var seconds = diffSecs;
    var days = Math.floor(seconds / (3600*24));
    seconds  -= days*3600*24;
    var hours   = Math.floor(seconds / 3600);
    seconds  -= hours*3600;
    var minutes = Math.floor(seconds / 60);
    seconds  -= minutes*60;

    return (`${(days > 0 && days + (days === 1 ? 'day ' : 'days ')) || ''}` +
      `${(hours > 0 && hours + 'h') || ''}` + `${(minutes > 0 && minutes + 'm') || ''}`).trim();
  }

  /** Get hours given time in seconds */
  static getHoursFromSeconds = (timeInSeconds) => {
    return Math.round(timeInSeconds/(60*60));
  }

  /** Checks if period A overlaps period B */
  static dateRangeOverlaps = (startDateA, endDateA, startDateB, endDateB) => {
    return !((endDateA < startDateB) || (startDateA > endDateB));
  }

  /** Checks if data is between start and end */
  static dateBetween = (dateToBeChecked, startDate, endDate) => {
    return startDate <= dateToBeChecked && endDate >= dateToBeChecked;
  }
}
