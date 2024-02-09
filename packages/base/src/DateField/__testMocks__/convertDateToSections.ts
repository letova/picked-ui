const DATE = new Date('2024-02-07T07:00:00');

/**
 * 0123456789
 * 07.02.2024
 */
export const SET_1 = {
  input: {
    date: DATE,
    format: 'DD.MM.YYYY',
  },
  output: [
    { value: '07', token: 'DD', startIndex: 0, endIndex: 2, type: 'day', contentType: 'numeric' },
    { value: '.', token: '.', startIndex: 2, endIndex: 3, type: 'literal', contentType: 'text' },
    { value: '02', token: 'MM', startIndex: 3, endIndex: 5, type: 'month', contentType: 'numeric' },
    { value: '.', token: '.', startIndex: 5, endIndex: 6, type: 'literal', contentType: 'text' },
    { value: '2024', token: 'YYYY', startIndex: 6, endIndex: 10, type: 'year', contentType: 'numeric' },
  ],
};

/**
 * 01234567
 * 2/7/2024
 */
export const SET_2 = {
  input: {
    date: DATE,
    format: 'M/D/YYYY',
  },
  output: [
    { value: '2', token: 'M', startIndex: 0, endIndex: 1, type: 'month', contentType: 'numeric' },
    { value: '/', token: '/', startIndex: 1, endIndex: 2, type: 'literal', contentType: 'text' },
    { value: '7', token: 'D', startIndex: 2, endIndex: 3, type: 'day', contentType: 'numeric' },
    { value: '/', token: '/', startIndex: 3, endIndex: 4, type: 'literal', contentType: 'text' },
    { value: '2024', token: 'YYYY', startIndex: 4, endIndex: 8, type: 'year', contentType: 'numeric' },
  ],
};

/**
 * 012345678901234
 * февраль 7, 2024
 */
export const SET_3 = {
  input: {
    date: DATE,
    format: 'MMMM D, YYYY',
  },
  output: [
    { value: 'февраль', token: 'MMMM', startIndex: 0, endIndex: 7, type: 'month', contentType: 'text' },
    { value: ' ', token: ' ', startIndex: 7, endIndex: 8, type: 'literal', contentType: 'text' },
    { value: '7', token: 'D', startIndex: 8, endIndex: 9, type: 'day', contentType: 'numeric' },
    { value: ', ', token: ', ', startIndex: 9, endIndex: 11, type: 'literal', contentType: 'text' },
    { value: '2024', token: 'YYYY', startIndex: 11, endIndex: 15, type: 'year', contentType: 'numeric' },
  ],
};

/**
 * 012345678901234567
 * февр. 7, 2024 7:00
 */
export const SET_4 = {
  input: {
    date: DATE,
    format: 'MMM D, YYYY h:mm',
  },
  output: [
    { value: 'февр.', token: 'MMM', startIndex: 0, endIndex: 5, type: 'month', contentType: 'text' },
    { value: ' ', token: ' ', startIndex: 5, endIndex: 6, type: 'literal', contentType: 'text' },
    { value: '7', token: 'D', startIndex: 6, endIndex: 7, type: 'day', contentType: 'numeric' },
    { value: ', ', token: ', ', startIndex: 7, endIndex: 9, type: 'literal', contentType: 'text' },
    { value: '2024', token: 'YYYY', startIndex: 9, endIndex: 13, type: 'year', contentType: 'numeric' },
    { value: ' ', token: ' ', startIndex: 13, endIndex: 14, type: 'literal', contentType: 'text' },
    { value: '7', token: 'h', startIndex: 14, endIndex: 15, type: 'hour', contentType: 'numeric' },
    { value: ':', token: ':', startIndex: 15, endIndex: 16, type: 'literal', contentType: 'text' },
    { value: '00', token: 'mm', startIndex: 16, endIndex: 18, type: 'minute', contentType: 'numeric' },
  ],
};

/**
 * 0123456
 * 7:00:00
 */
export const SET_5 = {
  input: {
    date: DATE,
    format: 'h:mm:ss',
  },
  output: [
    { value: '7', token: 'h', startIndex: 0, endIndex: 1, type: 'hour', contentType: 'numeric' },
    { value: ':', token: ':', startIndex: 1, endIndex: 2, type: 'literal', contentType: 'text' },
    { value: '00', token: 'mm', startIndex: 2, endIndex: 4, type: 'minute', contentType: 'numeric' },
    { value: ':', token: ':', startIndex: 4, endIndex: 5, type: 'literal', contentType: 'text' },
    { value: '00', token: 'ss', startIndex: 5, endIndex: 7, type: 'second', contentType: 'numeric' },
  ],
};
