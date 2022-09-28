import { Link } from 'react-router-dom';

const CharactersByHero = ({ alter_ego,characters }) => {
    if( alter_ego === characters) return (<></>);
    return <p>{ characters }</p>;
}

// function importAll(r) {
// 	let images = {};
//   r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
// 	return images
// }

// const images = importAll(require.context('./src/assets/heroes/', false, /\.(png|jpe?g|svg)$/).default);

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
}) => {
    
    const heroImageUrl = `assets/heroes/${ id }.jpg`;


  return (
    <div className="col animate__animated animate__fadeInRight animate__faster">
        <div className="card">

            <div className="row np-gutters">
                <div className="col-4 ">
                    <img src={heroImageUrl} className="card-img" alt={superhero}/>
                </div>

                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{superhero}</h5>
                        <p className="card-text">{alter_ego}</p>

                        {/* {
                            ( alter_ego !== characters) && characterByHero
                        } */}
                        <CharactersByHero characters={characters} alter_ego={alter_ego}/>

                        <p className="card-text">
                            <small className="text-muted">{ first_appearance }</small>
                        </p>

                        <Link to={`/hero/${ id }`}>
                            Ver más...
                        </Link>
                        
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}
