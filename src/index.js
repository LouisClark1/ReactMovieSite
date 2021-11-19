import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class FilmSearchResult extends React.Component {
  render() {
    const header1 = "Search Resuts";
    return (
      <table>
        <thead>
          <tr>
            <th colSpan="1">
              <h2>{header1}</h2>
            </th>
          </tr>
        </thead>
      </table>
    );
  }
}

class IndividualFilmResults extends React.Component {
  // this will need some state
  render() {
    const film = this.props.film;
    const title = film.movieName;
    const filmLength = film.length;
    return (
      <tr>
        <td>{title}</td>
        <td>{filmLength}</td>
      </tr>
    );
  }
}

class FilmTable extends React.Component {
  render() {
    const searchText = this.props.searchText;
    //const searchText = "";

    const filmRows = [];

    this.props.films.forEach((film) => {
      if (
        film.movieName.toLowerCase().indexOf(searchText.toLowerCase()) === -1
      ) {
        return;
      }
      filmRows.push(<IndividualFilmResults film={film} key={film.movieId} />);
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Film Length</th>
          </tr>
        </thead>
        <tbody>{filmRows}</tbody>
      </table>
    );
  }
}

class FilmSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }
  handleSubmitSearch(submitEvent) {
    alert("A search for " + this.props.searchText + " was submitted");
    submitEvent.preventDefault();
    //this.props.onSearchTextSubmit(event.target.value)
  }

  render() {
    const searchText = this.props.searchText;
    return (
      <form onSubmit={this.handleSubmitSearch}>
        <label>
          Film Title:
          <input
            type="text"
            placeholder="Search films"
            value={this.props.searchText}
            onChange={this.handleSearchTextChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
class SearchFilms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }
  handleSearchTextChange(searchText) {
    this.setState({
      searchText: searchText,
    });
  }
  render() {
    return (
      <div>
        <FilmSearchBar
          searchText={this.state.searchText}
          onSearchTextChange={this.handleSearchTextChange}
          onSearchTextSubmit = {this.handleSubmitSearch}
        />
        <FilmTable
          films={this.props.films}
          searchText={this.state.searchText}
          //onSearchTextSubmit = {this.handleSubmitSearch}
        />
      </div>
    );
  }
}

class FilmsClass extends React.Component {
  render() {
    return (
      <div>
        <div>
          <FilmSearchResult />
          <SearchFilms films={this.props.films} />
        </div>

        <div>
          <AddAFilm onSubmit={this.handleSubmit} />
        </div>

        <div>
          <RemoveAFilm />
        </div>
      </div>
    );
  }
}

class AddAFilm extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p>This is the section where you can add a film to the DB</p>
        </div>
        <div>
          <FilmDataEntryBoxes onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

class FilmDataEntryBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AddTitle: "",
      AddID: "",
      AddDescription: "",
      AddLength: "",
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeLength = this.handleChangeLength.bind(this);
    this.handleSubmit = this.handleSubmit(this);
  }
  handleChangeTitle(event) {
    this.setState({ value: event.target.value });
  }
  handleChangeID(event) {
    this.setState({ value: event.target.value });
  }
  handleChangeDescription(event) {
    this.setState({ value: event.target.value });
  }
  handleChangeLength(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // alert("A name was submitted: "); // + this.state.AddTitle);
    // event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Film Title:
          <input
            type="text"
            placeholder="Title...."
            AddTitle={this.state.AddTitle}
            onChangeTitle={this.handleChangeTitle}
          />
          Film language ID:
          <input
            type="text"
            placeholder="ID...."
            AddID={this.state.AddID}
            onChangeID={this.handleChangeID}
          />
          Film description:
          <input
            type="text"
            placeholder="ohh its a propa good"
            AddDescription={this.state.AddDescription}
            onChangeDescription={this.handleChangeDescription}
          />
          Film Length:
          <input
            type="text"
            placeholder="Length...."
            AddLength={this.state.AddLength}
            onChangeLength={this.handleChangeLength}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class RemoveAFilm extends React.Component {
  render() {
    return (
      <div>
        <SelectFilmToRemove />
      </div>
    );
  }
}

class SelectFilmToRemove extends React.Component {
  render() {
    return (
      <form onSubmit={this.handleSubmitRemove}>
        <label>
          Film to remove:
          <input type="submit" value="Submit" />
        </label>
      </form>
    );
  }
}

class ContentAndResults extends React.Component {
  render() {
    return (
      <div>
        <FilmsClass films={this.props.films} />
      </div>
    );
  }
}

const FILMS = [
  {
    movieName: "ACADEMY DINOSAUR",
    languageId: 1,
    description:
      "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    length: 86,
    movieId: 1,
  },
  {
    movieName: "ACE GOLDFINGER",
    languageId: 1,
    description:
      "A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China",
    length: 48,
    movieId: 2,
  },
  {
    movieName: "ADAPTATION HOLES",
    languageId: 1,
    description:
      "A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory",
    length: 50,
    movieId: 3,
  },
  {
    movieName: "AFFAIR PREJUDICE",
    languageId: 1,
    description:
      "A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank",
    length: 117,
    movieId: 4,
  },
  {
    movieName: "AFRICAN EGG",
    languageId: 1,
    description:
      "A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico",
    length: 130,
    movieId: 5,
  },
];

ReactDOM.render(
  <ContentAndResults films={FILMS} />,
  document.getElementById("root")
);
