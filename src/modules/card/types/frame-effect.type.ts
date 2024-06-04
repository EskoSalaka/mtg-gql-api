import { registerEnumType } from '@nestjs/graphql';

enum FrameEffect {
  legendary = 'legendary',
  miracle = 'miracle',
  nyxtouched = 'nyxtouched',
  draft = 'draft',
  devoid = 'devoid',
  tombstone = 'tombstone',
  colorshifted = 'colorshifted',
  inverted = 'inverted',
  sunmoondfc = 'sunmoondfc',
  compasslanddfc = 'compasslanddfc',
  originpwdfc = 'originpwdfc',
  mooneldrazidfc = 'mooneldrazidfc',
  waxingandwaningmoondfc = 'waxingandwaningmoondfc',
  showcase = 'showcase',
  extendedart = 'extendedart',
  companion = 'companion',
  etched = 'etched',
  snow = 'snow',
  lesson = 'lesson',
  shatteredglass = 'shatteredglass',
  convertdfc = 'convertdfc',
  fandfc = 'fandfc',
  upsidedowndfc = 'upsidedowndfc',
  spree = 'spree',
  fullart = 'fullart',
}

registerEnumType(FrameEffect, {
  name: 'FrameEffect',
  description: `
  The frame_effects field tracks additional frame artwork applied over a particular frame. 
  For example, there are both 2003 and 2015-frame cards with the Nyx-touched effect.
  `,
  valuesMap: {
    legendary: { description: 'The cards have a legendary crown' },
    miracle: { description: 'The miracle frame effect' },
    nyxtouched: { description: 'The nyxtouched frame effect' },
    draft: { description: 'The draft-matters frame effect' },
    devoid: { description: 'The devoid frame effect' },
    tombstone: { description: 'The Odyssey tombstone mark' },
    colorshifted: { description: 'A colorshifted frame' },
    inverted: { description: 'The FNM-style inverted frame' },
    sunmoondfc: { description: 'The sun and moon transform marks' },
    compasslanddfc: { description: 'The compass and land transform marks' },
    originpwdfc: { description: 'The Origins and planeswalker transform marks' },
    mooneldrazidfc: { description: 'The moon and Eldrazi transform marks' },
    waxingandwaningmoondfc: { description: 'The waxing and waning crescent moon transform marks' },
    showcase: { description: 'A custom Showcase frame' },
    extendedart: { description: 'An extended art frame' },
    companion: { description: 'The cards have a companion frame' },
    etched: { description: 'The cards have an etched foil treatment' },
    snow: { description: 'The cards have the snowy frame effect' },
    lesson: { description: 'The cards have the Lesson frame effect' },
    shatteredglass: { description: 'The cards have the Shattered Glass frame effect' },
    convertdfc: { description: 'The cards have More Than Meets the Eye™ marks' },
    fandfc: { description: 'The cards have fan transforming marks' },
    upsidedowndfc: { description: 'The cards have the Upside Down transforming marks' },
    spree: { description: 'The cards have Spree asterisks' },
    fullart: { description: 'The cards have a full-art frame' },
  },
});

export default FrameEffect;
