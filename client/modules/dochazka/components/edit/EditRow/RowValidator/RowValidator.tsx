import moment from 'moment';

export default function rowValidator(dayData: any, setErrors: any) {
  if (dayData.from === null && dayData.to === null && dayData.note === '') {
    setErrors([]);

    return true;
  }

  if (dayData.from === null && dayData.to === null && dayData.note !== '') {
    setErrors([]);

    return true;
  }

  if (dayData.from === null && dayData.to === null && dayData.note === '') {
    setErrors([]);
    return false;
  }

  if (dayData.from !== null && dayData.to !== null) {
    if (moment(dayData.from).isBefore(dayData.to)) {
      setErrors([]);

      return true;
    } else {
      setErrors(['Od nemuze mit nizsi hodnotu jak Do']);
      return false;
    }
  } else {
    setErrors(['Nemuzes mit prazdne od a do']);
    return false;
  }
}
