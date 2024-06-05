## Description

NestJs Graphql (Apollo) server that provides data available from scryfall (https://scryfall.com/docs/api) from your own database.
It supports both sqlite and postgres (and quite possibly some other engines too) and uses the Sequelize ORM under the hood.

The database is updated by using the available bulk data from scryfall. The project supports creating the database
from scratch as well as updating the current data such as latest pricing & rulings information. With sqlite, you can
get started and build the database with barely any setup at all

### List of features

- Create & update the database automatically by using the available bulk data from scryfall
- Paginate Card data
- Make complex queries to search for Cards and Sets by using a Sequelize-like JSON 'Where' filter from the client-side

Currently, the following scryfall mtg data and related functionalities are supported by the API:

- Cards
  - Card Faces
  - Rulings
- Sets

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

Fill in the 'DB_STORAGE' variable (for example .data/mydb.sqlite) to set path of the sqlite storage and set
'DB_SYNCHRONIZE=true' . When you start the project, a database will automatically generated. When 'DB_SYNCHRONIZE=true' also any changes to the schema are applied automatically when possible.

Then, just run the script which should fetch the bulk data from scryfall and update the database. Also starting the server with no database will automatically create a new one in the provided path

```bash
$ npm run update-db
```

#### Using postgres

For postgres, you first need to install a postgres server or use an existing one. For local setup, you can download it here https://www.postgresql.org/download/. Then you need to create a fresh database.

Set
'DB_DIALECT="postgres"' and
'DB_URI="postgresql://myUser:myPassword@localhost:5432/myDatabaseName"

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

#### Querying by attributes of card_faces and rules (and possible other future related tables) of Cards

To query by attributes of card*faces and rules, use the similar kind of queries as above, but use the attribute name 'card_faces*<some*card_face_attribute>' and 'rulings*<some_rule_attribute>

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

#### Handling JSON(B) attributes

Some attributes of the entities such as colors and color_identity (Arrays) and prices (JSON object) are implemented as JSONB DataType in the database.

--In sqlite --
You must query them as strings. This means that for example

- colors is a string like '["R","W"]'
- prices is string like "prices": '{"usd": "12.27", "eur": "2.62", ...}',

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

#TODO: Need to support queries like searcing for prices and other JSON object fields with gte, lte, etc.

## License

Nest is [MIT licensed](LICENSE).
