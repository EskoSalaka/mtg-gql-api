import { registerEnumType } from '@nestjs/graphql';

enum Color {
  W = 'W',
  U = 'U',
  B = 'B',
  R = 'R',
  G = 'G',
}

registerEnumType(Color, {
  name: 'Color',
  description: `
Color Arrays

Whenever the API presents set of Magic colors, the field will be an array that uses the uppercase, single-character abbreviations for those colors. For example, ["W","U"] represents something that is both white and blue. Colorless sources are denoted with an empty array []

Common places were you might see this kind of array are a Card object’s colors and color_identity. When a color field is null or missing, it implies that that information is not pertinent for the current object. It does not imply that the object is colorless.

Color arrays are not guaranteed to be in a particular order.
  `,
  valuesMap: {
    W: { description: 'White' },
    U: { description: 'Blue' },
    B: { description: 'Black' },
    R: { description: 'Red' },
    G: { description: 'Green' },
  },
});

export default Color;
