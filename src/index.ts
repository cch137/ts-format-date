const fullMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const abbreviatedMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const fullDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const abbreviatedDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const addLeadingZeros = (val: number, len = 2) =>
  val.toString().padStart(len, "0");

export default function formatDate(
  date: Date,
  format = "yyyy-MM-dd HH:mm:ss",
  isUTC = false
) {
  const dateProperties = isUTC
    ? {
        y: date.getUTCFullYear(),
        M: date.getUTCMonth() + 1,
        d: date.getUTCDate(),
        w: date.getUTCDay(),
        H: date.getUTCHours(),
        m: date.getUTCMinutes(),
        s: date.getUTCSeconds(),
        f: date.getUTCMilliseconds(),
      }
    : {
        y: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        w: date.getDay(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        f: date.getMilliseconds(),
      };
  const T = dateProperties.H < 12 ? "AM" : "PM";
  const _h = dateProperties.H % 12;
  const h = _h === 0 ? 12 : _h;
  format = format
    .replace(/yyyy/g, String(dateProperties.y))
    .replace(/yy/g, `${dateProperties.y}`.substring(2, 4))
    .replace(/y/g, String(dateProperties.y))
    .replace(/HH/g, addLeadingZeros(dateProperties.H))
    .replace(/H/g, String(dateProperties.H))
    .replace(/hh/g, addLeadingZeros(h))
    .replace(/h/g, String(h))
    .replace(/mm/g, addLeadingZeros(dateProperties.m))
    .replace(/m/g, String(dateProperties.m))
    .replace(/ss/g, addLeadingZeros(dateProperties.s))
    .replace(/s/g, String(dateProperties.s))
    .replace(/fff/g, String(Math.round(dateProperties.f)))
    .replace(/ff/g, String(Math.round(dateProperties.f / 10)))
    .replace(/f/g, String(Math.round(dateProperties.f / 100)))
    .replace(/TT/gi, T)
    .replace(/T/gi, T.charAt(0))
    .replace(/dddd/g, fullDayNames[dateProperties.w])
    .replace(/ddd/g, abbreviatedDayNames[dateProperties.w])
    .replace(/dd/g, addLeadingZeros(dateProperties.d))
    .replace(/d/g, String(dateProperties.d));
  const formatBefore = format;
  format = format
    .replace(/MMMM/g, fullMonthNames[dateProperties.M - 1])
    .replace(/MMM/g, abbreviatedMonthNames[dateProperties.M - 1]);
  return format !== formatBefore
    ? format
    : format
        .replace(/MM/g, addLeadingZeros(dateProperties.M))
        .replace(/M/g, String(dateProperties.M));
}
