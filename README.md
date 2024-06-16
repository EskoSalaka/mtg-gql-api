## Description

NestJs Graphql (Apollo) server that provides data available from scryfall (https://scryfall.com/docs/api) from your own database.
It supports both sqlite and postgres (and quite possibly some other engines too) and uses the Sequelize ORM under the hood.

The database is updated by using the available bulk data from scryfall. The project supports creating the database
from scratch as well as updating the current data such as latest pricing & rulings information. With sqlite, you can
get started and build the database with barely any setup at all

### Status of the project

The project is now pretty much usable for the current features. There are still a few more things to iron out. Some things are still likely to change and there are most likely some minor bugs.

### List of features

- Create & update the database automatically by using the available bulk data from scryfall
- Paginate and query data like Cards and Rulings
- Make complex queries to search for various entities by using a Sequelize-like JSON 'Where' filter from the client-side

Currently, the following scryfall mtg data and related functionalities are supported by the API:

- Cards
  - Card Faces
  - Rulings
- Sets
  - Cards
- Rulings
  - Cards
- Catalogs (similar to what scryfall server)
  - Card names
  - Card powers
  - Card touhnesses
  - etc.

The server comes with

- Environment validation using 'ConfigService'
- DTO's and validation with 'class-validator' and 'class-transformer'
- File and console logging with 'Winston'. Loggers can be disabled as necessary. What is logged:
  - HTTP requests
  - Errors
  - Queries
- Fast 'swc' compiler
- Server 'status' controller for monitoring
- Feature module separation

## Setup

### Installation

```bash
$ npm install
```

### Environment config

The server uses 'dotenv' under the hood. To get started quickly, create a '.env' file at the root of the project and add in the required env variables defined in the 'environment.config.ts' file.

#### Using sqlite

Set the environment variable

```
DB_URI="sqlite://db-data/database.sqlite" # Or wherever your database is
```

When DB_SYNCHRONIZE=true also any changes to the schema are applied automatically when possible.

Then, just run the script which should fetch the bulk data from scryfall and update the database. Also starting the server with no database will automatically create a new one in the provided path

```bash
$ npm run update-db
```

#### Using postgres

For postgres, you first need to install a postgres server or use an existing one. For local setup, you can download it here https://www.postgresql.org/download/. Then you need to create a fresh database.

Set the environment variables

```
DB_URI="postgresql://myUser:myPassword@localhost:5432/myDatabaseName"
```

When DB_SYNCHRONIZE=true also any changes to the schema are applied automatically when possible.

Then, just run the script which should fetch the bulk data from scryfall and update the database. With postgres, you will need to create a database first, but running the app or the update script should create
all the required tables

```bash
$ npm run update-db
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Schema & Apollo Playground

The gql schema of the server can be found at the 'schema.gql' file. This file is updated automatically whenever any changes are made to the Resolvers or Types defined in the project.

Apollo Playground is currently enabled by default and you can access it at whatever PORT the server is running. For example, by default at http://localhost:3000/graphql

## Queries and Pagination

The Queries that can contain a large amount of results support pagination by using the arguments 'limit' and 'page'. The page_info object in the response can be used by the client to paginate.

Some Queries return a possibly large list of related objects such as Set-->Cards. In these cases the the resulting list is returned in a simple non-paginated list of 'rows' and includes the field 'total_rows' which indicates the total count of these related objects.

In the case where the set of related objects is small, only the objects are returned.

The Queries that support filtering contain a 'where' argument, which is a JSON object that is turned into a query for Sequelize. It behaves in a very similar manner than the normal Sequelize 'where' and supports complex queries combining OR and AND clauses on the columns of the tables.

The where JSON supports these following set of operations that act on the fields of the queries objects:

```
    eq: '$eq',
    ne: '$ne',
    gte: '$gte',
    gt: '$gt',
    lte: '$lte',
    lt: '$lt',
    not: '$not',
    in: '$in',
    notIn: '$notIn',
    is: '$is',
    like: '$like',
    notLike: '$notLike',
    iLike: '$iLike',
    notILike: '$notILike',
    regexp: '$regexp',
    notRegexp: '$notRegexp',
    iRegexp: '$iRegexp',
    notIRegexp: '$notIRegexp',
    between: '$between',
    notBetween: '$notBetween',
    overlap: '$overlap',
    contains: '$contains',
    contained: '$contained',
    adjacent: '$adjacent',
    strictLeft: '$strictLeft',
    strictRight: '$strictRight',
    noExtendRight: '$noExtendRight',
    noExtendLeft: '$noExtendLeft',
    and: '$and',
    or: '$or',
    any: '$any',
    all: '$all',
    values: '$values',
```

Which sort of operations you need to use on each fields depends on your database and the type of the field. Most of the fields are just strings or numbers and filtering by these is trivial. Any sort of Array or JSON fields such as colors or prices are saved in the database as JSONB and are a bit tricker. For sqlite, you have to treat the values of these fields (like colors: '["R","W"]') as strings. For postgres, you need to do a JSON query. There are some samples of each below.

In general, there are no decent instructions on how to use these operations, but they are quite intuitive if you ever worked with SQL and/or Sequelize. Probably the best place is to go check out the API Reference of Sequelize Operations at https://sequelize.org/docs/v7/querying/operators/

### Querying cards

Here are some common Queries on Cards:

Name is exactly 'Counterspell'

```
query {
  cards(limit: 100, page: 1, where: { name: "Counterspell" }) {
    page_info {
      limit
      page
      total_pages
      total_rows
    }
    rows {
      set_name
      name
    }
  }
}
```

Name is contains the word 'Counter'

```
query {
  cards(limit: 100, page: 1, where: { name: { like: "%Counter%" } }) {
    page_info {
      limit
      page
      total_pages
      total_rows
    }
    rows {
      set_name
      name
    }
  }
}

```

Has either toughness of "0" OR power of "0"

```
query {
  cards(
    limit: 100
    page: 1
    where: {
      or: [{ toughness: "0" }, { power: "0" }]
    }
  ) {
    page_info {
      limit
      page
      total_pages
      total_rows
    }
    rows {
      set_name
      name
      toughness
      power
    }
  }
}

```

More complex, combining AND and OR: Has textless: true AND either toughness: "0" OR power: "0"

```
query {
  cards(
    limit: 100
    page: 1
    where: {
      and: [{ or: [{ toughness: "1" }, { power: "1" }], textless: false }]
    }
  ) {
    page_info {
      limit
      page
      total_pages
      total_rows
    }
    rows {
      set_name
      name
      toughness
      power
      textless
    }
  }
}

```

#### Querying by attributes of card_faces, rules and prices of Cards

To query by attributes of card*faces and rules, use the similar kind of queries as above, but use the attribute name card*faces*<some*card*face_attribute>, rulings*<some*rule_attribute> and prices_eur*<some_price_name>

Has a card_face that has either tougness: "0" or power: "0" (note, that the result only contains cards that HAVE card_faces):

```
query {
  cards(
    limit: 100
    page: 1
    where: {
      or: [{ card_faces_toughness: "0" }, { card_faces_power: "0" }]
    }
  ) {
    page_info {
      limit
      page
      total_pages
      total_rows
    }
    rows {
      set_name
      name
      card_faces {
        name
        power
        toughness
      }
    }
  }
}

```

Has a ruling->comment that contains the string "colorless" (note, that the results contain only cards that HAVE rulings):

```
query {
  cards(
    limit: 100
    page: 1
    where: { rulings_comment: { like: "%colorless%" } }
  ) {
    page_info {
      limit
      page
      total_pages
      total_rows
    }
    rows {
      set_name
      name
      rulings {
        comment
      }
    }
  }
}

```

Cards with the (current) 'eur' price higher than 100

```
query {
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

```

#### Handling JSON(B) attributes

Some attributes of the entities such as colors and color_identity (Arrays) are implemented as JSONB DataType in the database.

--In sqlite --
You must query them as strings. This means that for example

- colors is a string like '["R","W"]'

Example:

Is either R or W card:

```
query {
  cards(
    limit: 100
    page: 1
    where: { or: [{colors: {like: "%R%"}}, {colors: {like: "%W%"}}] }
  ) {
    page_info {
      limit
      page
      total_pages
      total_rows
    }
    rows {
      colors
      set_name
      name

    }
  }
}


```

--In Postgres--
You must query them as doing queries from values of a JSON object. This means you must pass real JSON objects into the query. You must escape the "-signs

Example:

Is either R or W card:

```
query {
  cards(
    limit: 100
    page: 1
    where: { or: [{colors: {contains: "\"R\""}}, {colors: {contains: "\"W\""}}] }
  ) {
    page_info {
      limit
      page
      total_pages
      total_rows
    }
    rows {
      colors
      set_name
      name

    }
  }
}

```

## License

[MIT licensed](LICENSE).

## Disclaimer and notes

This project is not endorsed by Wizards of the Coast, Scryfall or any other party.

This is a hobby project with the primary purpose of learning and providing tools to create additional Magic: the Gathering software, performing research and creating community content.

The project is free and open-source. No content shall be locked behind a login except for the purpose of users accessing their own resources like Decks and Admins performing server maintenance tasks.
