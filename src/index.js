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
  render() {
    const film = this.props.film;
    const title = film.movieName;
    const filmLength = film.length;
    return (
      <tr>
        <td>{title}</td>
        <td>{filmLength}</td>
        <td>{film.description}</td>
        <td>{film.movieId}</td>
      </tr>
    );
  }
}

class FilmTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Length</th>
            <th>Description</th>
            <th>Film ID</th>
          </tr>
        </thead>
        <tbody>{this.props.filmRows}</tbody>
      </table>
    );
  }
}

class FilmSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }
  handleSubmit(submitEvent) {
    submitEvent.preventDefault();
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          this.props.handleClick(e);
        }}
      >
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
      filmRows: [],
      films: [],
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await fetch("http://52.15.164.212:8080/movies/all")
      .then((response) => response.json())
      .then((jsonData) => {
        const packages = jsonData;
        this.setState({
          films: packages,
          filmRows: packages,
          //totalPackages: jsonData.total,
        });
      });
    //.then((data) => console.log(data[0]));
  }

  handleSearchTextChange(searchText) {
    this.setState({
      searchText: searchText,
    });
  }

  handleClick(event) {
    alert("A search for " + this.state.searchText + " was submitted");
    event.preventDefault();
    const searchText = this.state.searchText;

    const filmRows = [];

    this.state.films.forEach((film) => {
      if (
        film.movieName.toLowerCase().indexOf(searchText.toLowerCase()) === -1
      ) {
        return;
      }
      filmRows.push(film);
    });

    this.setState({
      filmRows: filmRows,
    });
  }

  render() {
    const renderRows = [];
    this.state.filmRows.forEach((film) => {
      renderRows.push(<IndividualFilmResults film={film} key={film.movieId} />);
    });
    return (
      <div>
        <div>
          <FilmSearchBar
            searchText={this.state.searchText}
            onSearchTextChange={this.handleSearchTextChange}
            onSearchTextSubmit={this.handleSubmit}
            handleClick={this.handleClick}
          />
        </div>
        <div class="filmResultsDiv">
          <FilmTable
            //filmRows={this.state.filmRows}
            filmRows={renderRows}
          />
        </div>
      </div>
    );
  }
}

class FilmsClass extends React.Component {
  render() {
    return (
      <div>
        <div class="pageTitle">
          <h1>
            <center>All the films you should care about</center>
          </h1>
        </div>
        <div>
          <AddAFilm />
        </div>
        <div>
          <FilmSearchResult />
          <SearchFilms films={this.props.films} />
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
          <FilmDataEntryBoxes />
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeTitle(event) {
    this.setState({ AddTitle: event.target.value });
  }
  handleChangeID(event) {
    this.setState({ AddID: event.target.value });
  }
  handleChangeDescription(event) {
    this.setState({ AddDescription: event.target.value });
  }
  handleChangeLength(event) {
    this.setState({ AddLength: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.AddTitle);
    //event.preventDefault();
    const movieName = this.state.AddTitle;
    const languageId = this.state.AddID;
    const description = this.state.AddDescription;
    const length = this.state.AddLength;

    const addFilmData = {
      movieName: movieName,
      languageId: languageId,
      description: description,
      length: length,
    };
    fetch("http://52.15.164.212:8080/addMovie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addFilmData),
    }).then(() => {
      console.log("film added");
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Film Title:
          <input
            type="text"
            placeholder="Title...."
            value={this.state.AddTitle}
            onChange={this.handleChangeTitle}
          />
          Film language ID:
          <input
            type="text"
            placeholder="ID...."
            value={this.state.AddID}
            onChange={this.handleChangeID}
          />
          Film description:
          <input
            type="text"
            placeholder="ohh its a propa good"
            value={this.state.AddDescription}
            onChange={this.handleChangeDescription}
          />
          Film Length:
          <input
            type="text"
            placeholder="Length...."
            value={this.state.AddLength}
            onChange={this.handleChangeLength}
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
  constructor(props) {
    super(props);
    this.state = {
      RemoveSelect: "",
    };

    this.handleChangeRemoveSelect = this.handleChangeRemoveSelect.bind(this);
  }

  handleChangeRemoveSelect(e) {
    this.setState({ RemoveSelect: e.target.value });
  }

  handleSubmit(event) {
    alert("Film number " + this.state.RemoveSelect + "was deleted");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitRemove}>
        <label>
          <input
            type="text"
            placeholder="Film ID..."
            value={this.state.RemoveSelect}
            onChange={this.handleChangeRemoveSelect}
          />
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
        <FilmsClass />
        {/* <APIImportsClass/> */}
      </div>
    );
  }
}

ReactDOM.render(<ContentAndResults />, document.getElementById("root"));
