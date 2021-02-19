import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions} from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  // const state = useSelector((state: any) => state.repositories);
  const { data, error, loading } = useTypedSelector((state) => state.repositories);
  // console.log(state);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && 
        data.map((name) => <div key={name}>{name}</div>)}
    </div>
  );
};

export default RepositoriesList;

// If error is null, then we are not going to show h3 {error && <h3>{error}</h3>}
// If loading is true then print out h3 {loading && <h3>Loading...</h3>}
// If there is no error, loading, printout our list of library or packages names {!error && !loading && data}