import { registerEnumType } from '@nestjs/graphql';

enum SetType {
  core = 'core',
  expansion = 'expansion',
  masters = 'masters',
  alchemy = 'alchemy',
  masterpiece = 'masterpiece',
  arsenal = 'arsenal',
  from_the_vault = 'from_the_vault',
  spellbook = 'spellbook',
  premium_deck = 'premium_deck',
  duel_deck = 'duel_deck',
  draft_innovation = 'draft_innovation',
  treasure_chest = 'treasure_chest',
  commander = 'commander',
  planechase = 'planechase',
  archenemy = 'archenemy',
  vanguard = 'vanguard',
  funny = 'funny',
  starter = 'starter',
  box = 'box',
  promo = 'promo',
  token = 'token',
  memorabilia = 'memorabilia',
  minigame = 'minigame',
}

registerEnumType(SetType, {
  name: 'SetType',
  description: `
  Scryfall provides an overall categorization for each Set in the set_type property.
  `,
  valuesMap: {
    core: { description: 'A yearly Magic core set (Tenth Edition, etc)' },
    expansion: { description: 'A rotational expansion set in a block' },
    masters: { description: 'A reprint set that contains no new cards' },
    alchemy: { description: 'An Arena-only digital set' },
    masterpiece: { description: 'Masterpiece Series premium foil cards' },
    arsenal: { description: 'A set that contains a marketing card' },
    from_the_vault: { description: 'From the Vault gift sets' },
    spellbook: { description: 'Spellbook series gift sets' },
    premium_deck: { description: 'Premium Deck Series decks' },
    duel_deck: { description: 'Duel Decks' },
    draft_innovation: { description: 'Draft Innovation product sets' },
    treasure_chest: { description: 'Magic Online treasure chest prize sets' },
    commander: { description: 'Commander preconstructed decks' },
    planechase: { description: 'Planechase sets' },
    archenemy: { description: 'Archenemy sets' },
    vanguard: { description: 'Vanguard card sets' },
    funny: { description: 'A funny un-set or set with funny promos' },
    starter: { description: 'A starter/introductory set' },
    box: { description: 'A gift box set' },
    promo: { description: 'A set with non-redeemable promotional cards' },
    token: { description: 'A set made up of tokens and emblems' },
    memorabilia: {
      description: 'A set made up of gold-bordered, oversize, or trophy cards that are not legal',
    },
    minigame: { description: 'A set made up of minigames' },
  },
});

export default SetType;
