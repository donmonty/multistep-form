import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';


let today = startOfToday();
const currentMonth = format(today, 'MMM-yyyy'); // string
let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date()) // Date object


export function getDays() {
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });
  return days;
}
