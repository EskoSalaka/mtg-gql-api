import { registerEnumType } from '@nestjs/graphql';

enum Frame {
  y1993 = '1993',
  y1997 = '1997',
  y2003 = '2003',
  y2015 = '2015',
  future = 'future',
}

registerEnumType(Frame, {
  name: 'Frame',
  description: `
  The frame field tracks the edition of the card frame of used for the re/print in question. 
  The overall Magic frame has gone though several major revisions in the game's lifetime.
  `,
  valuesMap: {
    y1993: {
      description: 'The original Magic card frame, starting from Limited Edition Alpha.',
    },
    y1997: { description: 'The updated classic frame starting from Mirage block' },
    y2003: {
      description:
        'The “modern” Magic card frame, introduced in Eighth Edition and Mirrodin block.',
    },
    y2015: { description: 'The holofoil-stamp Magic card frame, introduced in Magic 2015.' },
    future: { description: 'The frame used on cards from the future' },
  },
});

export default Frame;
