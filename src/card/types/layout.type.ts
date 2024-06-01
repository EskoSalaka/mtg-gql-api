import { registerEnumType } from '@nestjs/graphql';

enum Layout {
  normal = 'normal',
  split = 'split',
  flip = 'flip',
  transform = 'transform',
  modal_dfc = 'modal_dfc',
  meld = 'meld',
  leveler = 'leveler',
  class = 'class',
  case = 'case',
  saga = 'saga',
  adventure = 'adventure',
  mutate = 'mutate',
  prototype = 'prototype',
  battle = 'battle',
  planar = 'planar',
  scheme = 'scheme',
  vanguard = 'vanguard',
  token = 'token',
  double_faced_token = 'double_faced_token',
  emblem = 'emblem',
  augment = 'augment',
  host = 'host',
  art_series = 'art_series',
  reversible_card = 'reversible_card',
}

registerEnumType(Layout, {
  name: 'Layout',
  description: `
  The layout property categorizes the arrangement of card parts, faces, and other bounded regions on cards. The layout can be used to programmatically determine which other properties on a card you can expect.

  Specifically:
  
      Cards with the layouts split, flip, transform, and double_faced_token will always have a card_faces property describing the distinct faces.
      Cards with the layout meld will always have an all_parts property pointing to the other meld parts.
  `,
  valuesMap: {
    normal: { description: 'A standard Magic card with one face' },
    split: { description: 'A split-faced card' },
    flip: { description: 'Cards that invert vertically with the flip keyword' },
    transform: { description: 'Double-sided cards that transform' },
    modal_dfc: { description: 'Double-sided cards that can be played either-side' },
    meld: { description: 'Cards with meld parts printed on the back' },
    leveler: { description: 'Cards with Level Up' },
    class: { description: 'Class-type enchantment cards' },
    case: { description: 'Case-type enchantment cards' },
    saga: { description: 'Saga-type cards' },
    adventure: { description: 'Cards with an Adventure spell part' },
    mutate: { description: 'Cards with Mutate' },
    prototype: { description: 'Cards with Prototype' },
    battle: { description: 'Battle-type cards' },
    planar: { description: 'Plane and Phenomenon-type cards' },
    scheme: { description: 'Scheme-type cards' },
    vanguard: { description: 'Vanguard-type cards' },
    token: { description: 'Token cards' },
    double_faced_token: { description: 'Tokens with another token printed on the back' },
    emblem: { description: 'Emblem cards' },
    augment: { description: 'Cards with Augment' },
    host: { description: 'Host-type cards' },
    art_series: { description: 'Art Series collectable double-faced cards' },
    reversible_card: { description: 'A Magic card with two sides that are unrelated' },
  },
});

export default Layout;
