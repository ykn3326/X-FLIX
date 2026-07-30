import Hero from '../hero/Hero';

const Home = ({ movies, searchTerm }) => {

    return (
        <Hero
            movies={movies}
            searchTerm={searchTerm}
        />
    );

}

export default Home;