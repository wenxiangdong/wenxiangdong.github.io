import ApolloClient, {InMemoryCache} from "apollo-boost";
const endpoint = "https://api.github.com/graphql";
const personalToken = "61dd5723314414368b4db4daf38774a8ec5bf632";

const graphClient = new ApolloClient({
    uri: endpoint,
    headers: {
        authorization: `Bearer ${personalToken}`
    },
});

export {graphClient};