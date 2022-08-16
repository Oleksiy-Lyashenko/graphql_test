import Header from './components/Header';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Project from './components/pages/Project';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='*' element={<NotFound />}/>
              <Route path='/projects/:id' element={<Project />}/>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
