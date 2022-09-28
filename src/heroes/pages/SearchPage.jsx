import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../helpers';
import { HeroCard } from '../components'

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search );
  const heroes = getHeroesByName(q);

  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = (event) => {
    event.preventDefault();
    // if( searchText.trim ().length <= 1 ) return;
    navigate( `?q=${ searchText }` );
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit } aria-label="form">
            <input 
              type="text"
              placeholder="Busca un Heroe"
              className="form-control"
              name="searchText" 
              autoComplete="off"
              value={ searchText }
              onChange={ onInputChange }
              />

              <button className="btn btn-outline-primary mt-2">
                Search
              </button>

          </form>
        </div>

        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          <div 
            className="alert alert-primary animate__animated animate__fadeIn animate__faster" 
            style={{ display: showSearch ? '' : 'none' }}>
            busca un héroe
          </div>

          <div
            aria-label='alert-danger' 
            className="alert alert-danger animate__animated animate__fadeIn animate__faster" 
            style={{ display: showError ? '' : 'none'}}>
            No existen resultados para <b>{ q }</b>
          </div>

          {
            heroes.map( hero => (
              <HeroCard key={ hero.id } { ...hero }/>
            ))
          }
        </div>
      </div>


    </>
  )
}
