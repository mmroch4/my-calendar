import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { URI } from "../../env";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: URI,
    }),
  });
});
