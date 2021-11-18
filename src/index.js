import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class FilmSearchBar extends React.Component{
    render(){
        return(
            <form>
                <input type = "text" placeholder = "Search films"/>
            </form>




        )



    }
}

class FilmResultHeaders extends React.Component{
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

class FilmResults extends React.Component{
    render(){
        const film = this.props.film;
        const title = film.movieName;
        const filmLength = film.length 
    
        return(

            <tr>
                <td>{title}</td>
                <td>{filmLength}</td>
            </tr>
        )
    }
}

class SearchFilms extends React.Component{
    render(){
        const filmRows = [];

        this.props.films.forEach((film) => {
            filmRows.push(
                <FilmResults
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

class FilmsClass extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <FilmSearchBar/>
                    <FilmResultHeaders/>
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





