import { isNumeric } from '../../utils';
import { formatDate } from '../../date-utils';

import { TOKEN_TO_TYPE_MAP } from '../constants';
import { DateFieldSection } from '../DateField.types';

export const convertDateToSections = (value: Date, format: string) => {
  const sections: DateFieldSection[] = [];

  let section: DateFieldSection | undefined;
  let indexOffset = 0;

  for (let i = 0; i < format.length; i++) {
    const char = format[i];
    const { type } = TOKEN_TO_TYPE_MAP[char] || { type: 'literal' };

    const pushSection = () => {
      if (!section) {
        return;
      }

      if (section.type !== 'literal') {
        section.value = formatDate(value, section.token);

        if (isNumeric(section.value)) {
          section.contentType = 'numeric';
        }

        /**
         * The number of characters in the value is not always equal
         * to the number of characters in the token
         *
         * For example: MMMM --> February
         */
        if (section.token.length !== section.value.length) {
          const offset = section.value.length - section.token.length;
          section.endIndex = section.endIndex + offset;
          indexOffset = indexOffset + offset;
        }
      } else {
        section.value = section.token;
      }

      sections.push(section);
      section = undefined;
    };

    /**
     * Section change
     * @todo Add case handling with format without separators: MMDD-YYYY
     */
    if (section && section.type !== type) {
      pushSection();
    }

    /**
     * Section init
     */
    if (!section) {
      section = {
        type,
        value: '',
        token: char,
        contentType: 'text',
        startIndex: i + indexOffset,
        endIndex: i + indexOffset + 1,
      };

      continue;
    }

    section.token = `${section.token}${char}`;
    section.endIndex = i + indexOffset + 1;

    /**
     * Last char
     */
    if (i === format.length - 1) {
      pushSection();
    }
  }

  return sections;
};
