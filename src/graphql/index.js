const {ApolloServer} = require('@apollo/server');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
const { expressMiddleware } = require('@apollo/server/express4')
const {loadFiles} = require('@graphql-tools/load-files')


const resolvers = {
  Query: {
    getUser: () => {
      return {
        name: 'Juan',
        age: 12,
        email: 'juan@gmail',
        password: 'juan123456',
      };
    },
  },
};

const useGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs: await loadFiles('./src/**/*.graphql'),
    resolvers,
    playground:true,
    plugins: [ApolloServerPluginLandingPageLocalDefault],
  });

  await server.start();
  app.use(expressMiddleware(server,{
    context: async ({req}) => ({
      token: req.headers.token
    })
  }))
}

module.exports = useGraphql;