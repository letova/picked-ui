import dayjs from 'dayjs';

import { isNumeric } from '../../utils';

import { TOKEN_TO_TYPE_MAP } from '../constants';
import { DateFieldSection } from '../DateField.types';

export const convertDateToSections = (value: Date, format: string) => {
  const sections: DateFieldSection[] = [];

  let section: DateFieldSection | undefined;
  let indexOffset = 0;

  for (let i = 0; i < format.length; i++) {
    const char = format[i];
    const { type } = TOKEN_TO_TYPE_MAP[char] || { type: 'literal' };

    const finalizeSection = () => {
      if (!section) {
        return;
      }

      if (section.type !== 'literal') {
        section.value = dayjs(value).format(section.token);

        if (isNumeric(section.value)) {
          section.contentType = 'numeric';
        }

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

    // Section change
    if (section && section.type !== type) {
      finalizeSection();
    }

    // Empty section
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

    if (i === format.length - 1) {
      finalizeSection();
    }
  }

  return sections;
};
