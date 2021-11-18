import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';





class FilmSearchResult extends React.Component{
    render(){
        const header1 = "Search Resuts";
        return(
            <table>
                <thead>
                    <tr>
                        <th colSpan = "1">
                            <h2>{header1}</h2>
                        </th>
                    </tr>
                </thead>
            </table>
        )
    }
}

class IndividualFilmResults extends React.Component{
    // this will need some state
    render(){
        const film = this.props.film;
        const title = film.movieName;
        const filmLength = film.length;
        return(
            <tr>
                <td>{title}</td>
                <td>{filmLength}</td>
            </tr>
        )
    }
}

class FilmTable extends React.Component{
    render(){
        const searchText =this.props.searchText;

        const filmRows = [];

        this.props.films.forEach((film) => {
            if (film.movieName.toLowerCase().indexOf(searchText.toLowerCase()) === -1){
                return;
            }
            filmRows.push(
                <IndividualFilmResults
                    film = {film}
                    key = {film.movieId}
                    />
            )
        })
        return(
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Film Length</th>
                    </tr>
                </thead>
                <tbody>
                        {filmRows}
                </tbody>
            </table>
        )
    }
}

class FilmSearchBar extends React.Component{

    constructor(props){
        super(props);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
    }

    handleSearchTextChange(e){
        this.props.onSearchTextChange(e.target.value)
    }

    render(){
        const searchText = this.props.searchText;
        return(
            <form>
                <input type = "text" 
                    placeholder = "Search films"
                    value = {this.props.searchText}
                    onChange = {this.handleSearchTextChange}
                />
            </form>
        )
    }
}
class SearchFilms extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: ""
        }
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }
    handleSearchTextChange(searchText){
        this.setState({
            searchText: searchText
        })
    }
    render(){
        return(
            <div>
                <FilmSearchBar
                    searchText = {this.state.searchText}
                    onSearchTextChange = {this.handleSearchTextChange}
                />
                <FilmTable
                    films = {this.props.films}
                    searchText = {this.state.searchText}
                />
            </div>
       )
    }
}

class FilmsClass extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <FilmSearchResult/>
                    <SearchFilms films = {this.props.films}/>
                </div>

                <div>
                    <p>
                        "this is where the add film bit will go"
                    </p>
                </div>

                <div>
                    <p>
                        "this is where the remove film bit will go"
                    </p>
                </div>
            </div>
        )
    }
}

class ContentAndResults extends React.Component{
    render(){
        return(     
            <div>
                <FilmsClass films = {this.props.films}/>
            </div>
            
        )
    }

}
const FILMS = [
    {
        movieName: "ACADEMY DINOSAUR",
        languageId: 1,
        description: "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
        length: 86,
        movieId: 1
    },
    {
        movieName: "ACE GOLDFINGER",
        languageId: 1,
        description: "A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China",
        length: 48,
        movieId: 2
    },
    {
        movieName: "ADAPTATION HOLES",
        languageId: 1,
        description: "A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory",
        length: 50,
        movieId: 3
    },
    {
        movieName: "AFFAIR PREJUDICE",
        languageId: 1,
        description: "A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank",
        length: 117,
        movieId: 4
    },
    {
        movieName: "AFRICAN EGG",
        languageId: 1,
        description: "A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico",
        length: 130,
        movieId: 5
    }
];


ReactDOM.render(
    <ContentAndResults films={FILMS} />,
    document.getElementById('root')
  );