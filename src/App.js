import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import MovieDetailPage from './components/MovieDetailPage';

const App = () => (
  <Router>
    <div className="container mx-auto">
      <Switch>
        <Route path="/" exact component={SearchPage} />
        <Route path="/movie/:id" component={MovieDetailPage} />
      </Switch>
    </div>
  </Router>
);

export default App;
