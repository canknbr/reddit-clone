import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://itaperucu.stepzen.net/api/kissing-pig/__graphql',
  headers: {
    Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
