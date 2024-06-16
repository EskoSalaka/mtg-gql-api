# Examples

This file contains a set of example queries that you can just copypaste into playground

## Cards

```graphql
query cards {
  cards(limit: 100, page: 1, where: { prices_eur: { gte: "100" } }) {
    page_info {
      limit
      page
      total_pages
      total_rows
    }
    rows {
      id
      set_name
      name
      prices {
        eur
      }
    }
  }
}

query card {
  card(id: "84f2c8f5-8e11-4639-b7de-00e4a2cbabee") {
    name
    card_faces {
      id
      name
    }
    rulings {
      id
      comment
    }
  }
}
```

## Sets

```graphql
query set {
  set(id: "597c6d4a-8212-4903-a6af-12c4ae9e13f0") {
    name
    id
    name
    block
    block_code
    card_count
    cards {
      total_rows
      rows {
        id
        name
        set_name
      }
    }
  }
}

query sets {
  sets {
    total_rows
    rows {
      id
      name
      block
      block_code
    }
  }
}
```

## Rulings

```graphql
query rulings {
  rulings(limit: 100) {
    page_info {
      limit
      page
      total_rows
      total_pages
      has_more
    }
    rows {
      id
      oracle_id
      source
      comment
      published_at
    }
  }
}

query ruling {
  ruling(id: "e0724c92-0c35-4854-98ee-f220ca3de965") {
    comment

    cards {
      name
      oracle_text
    }
  }
}
```

## Card Catalogs

```graphql
query card_names {
  card_names {
    total_rows
    rows
  }
}

query card_watermarks {
  card_watermarks {
    total_rows
    rows
  }
}

query card_artist_names {
  card_artist_names {
    total_rows
    rows
  }
}

query card_full_types {
  card_full_types {
    total_rows
    rows
  }
}

query card_full_basic_types {
  card_full_basic_types {
    total_rows
    rows
  }
}

query card_powers {
  card_powers {
    total_rows
    rows
  }
}

query card_toughnesses {
  card_toughnesses {
    total_rows
    rows
  }
}

query card_loyalties {
  card_loyalties {
    total_rows
    rows
  }
}
```

## Symbology

```graphql
query symbology {
  symbology {
    total_rows
    rows {
      id
      symbol
      hybrid
      english
      svg_uri
      colors
      object
      appears_in_mana_costs
      transposable
      gatherer_alternates
      phyrexian
    }
  }
}

query symbologyExampleSqlite1 {
  symbology(where: { colors: { like: "%W%" } }) {
    total_rows
    rows {
      id
      symbol
      hybrid
      english
      svg_uri
      colors
      object
      appears_in_mana_costs
      transposable
      gatherer_alternates
      phyrexian
    }
  }
}

query symbologyExampleSqlite2 {
  symbology(where: { symbol: "{R}" }) {
    total_rows
    rows {
      id
      symbol
      hybrid
      english
      svg_uri
      colors
      object
      appears_in_mana_costs
      transposable
      gatherer_alternates
      phyrexian
    }
  }
}
```
