import { gql } from "@apollo/client";

const GET_WHITECARDS = gql`
  query getWhiteCards {
    packs {
      white {
        text
        pack
      }
    }
  }
`;

const GET_BLACKCARDS = gql`
  query getBlackCards {
    packs {
      black {
        text
        pack
      }
    }
  }
`;

const GET_PACKS = gql`
  query getPacks {
    packs {
      name
      white {
        text
        pack
      }
      black {
        text
        pick
      }
      official
    }
  }
`;

export { GET_WHITECARDS, GET_BLACKCARDS, GET_PACKS };
