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
            <th colSpan="1" className="titlesDiv">
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
            id="searchTextInput"
          />
        </label>

        <input type="submit" value="Submit" id="searchButtonInput" />
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
    //alert("A search for " + this.state.searchText + " was submitted");
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
        <div className="filmResultsDiv">
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
        <div >
          <img
            src="https://th.bing.com/th/id/R.31cf3ec27ea1088d285cba5ace6bd904?rik=m9%2bsw1ORUqipTw&riu=http%3a%2f%2fimg.izismile.com%2fimg%2fimg7%2f20140630%2f1000%2f80s_movie_gifs_remind_us_why_these_films_were_so_great_05.gif&ehk=Hu0WEQNc893sPXMgnXl4IQ9rq2a%2fPPZTFj22sgLu6Yg%3d&risl=&pid=ImgRaw&r=0"
            width="30%"
            id="movingMan"
          />
          <h1 className="pageTitleTextDiv">
            <center>All the films you should care about</center>
          </h1>
          <img
            src="https://64.media.tumblr.com/827011a5273d44b865ba7eb29a2a1fb3/tumblr_p2m538tqyB1rjlj53o1_500.gif"
            width="30%"
            id="ball"
          />
           </div>
        <center>
          <div className="dataEntryDiv">
            <AddAFilm />
          </div>
          <div className="dataEntryDiv">
            <RemoveAFilm />
          </div>
        </center>
        <div>
          <FilmSearchResult />
          <SearchFilms films={this.props.films} />
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
          <p className="titlesDiv">
            <h2>
              {" "}
              <center>Add Films</center>
            </h2>
          </p>
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div>
              Film Title:
              <input
                type="text"
                placeholder="Title...."
                value={this.state.AddTitle}
                onChange={this.handleChangeTitle}
                id="addFilmTitleTextInput"
              />
            </div>
            <div>
              Film language ID:
              <input
                type="text"
                placeholder="ID...."
                value={this.state.AddID}
                onChange={this.handleChangeID}
                id="addFilmLangIDTextInput"
              />
            </div>
            <div>
              Film description:
              <input
                type="text"
                placeholder="ohh its a propa good"
                value={this.state.AddDescription}
                onChange={this.handleChangeDescription}
                id="addFilmDescriptionTextInput"
              />
            </div>
            <div>
              Film Length:
              <input
                type="text"
                placeholder="Length...."
                value={this.state.AddLength}
                onChange={this.handleChangeLength}
                id="addFilmLengthTextInput"
              />
            </div>
          </label>
          <center>
            <input type="submit" value="Submit" id="addButtonInput" />
          </center>
        </form>
      </div>
    );
  }
}

class RemoveAFilm extends React.Component {
  render() {
    return (
      <div>
        <p className="titlesDiv">
          <h2>
            <center>Remove Films</center>
          </h2>
        </p>
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
    this.handleSubmitRemove = this.handleSubmitRemove.bind(this);
  }

  handleChangeRemoveSelect(e) {
    this.setState({ RemoveSelect: e.target.value });
  }

  handleSubmitRemove(event) {
    alert("Film number " + this.state.RemoveSelect + " was deleted");
    fetch("http://52.15.164.212:8080/removeMovie/" + this.state.RemoveSelect, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitRemove}>
        <label>
          Film to remove:
          <input
            type="text"
            placeholder="Film ID..."
            value={this.state.RemoveSelect}
            onChange={this.handleChangeRemoveSelect}
            id="removeFilmTextInput"
          />
          <center>
            <input type="submit" value="Submit" id="removeButtonInput" />
          </center>
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
