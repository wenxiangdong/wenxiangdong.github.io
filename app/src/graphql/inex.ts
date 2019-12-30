import ApolloClient, {InMemoryCache} from "apollo-boost";
const endpoint = "https://api.github.com/graphql";
const personalToken = "82652034ee6d72704e2a89631566dd128ca7b822";

const graphClient = new ApolloClient({
    uri: endpoint,
    headers: {
        authorization: `Bearer ${personalToken}`
    },
});

export {graphClient};