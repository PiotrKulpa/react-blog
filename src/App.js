import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    fetch('http://localhost/wprest/wp/wp-json/wp/v2/posts?per_page=100')
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      this.setState({
        posts: myJson
      });
      console.log(this.state.posts);
      /** Hide more links from Wordpress*/
      let moreLinks = document.querySelectorAll('.link-more');
      for (let x = 0; x < moreLinks.length; x++) {
        moreLinks[x].style.display = "none";
      }

    });
  }
  render() {
    return (
      <div className="App">
        {!this.state.posts ? <p>Nie ma wpisów</p> : this.state.posts.map((el) =>

          <div key={el.id}>
            <h1>{el.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{__html: el.excerpt.rendered}} />
            <div style={{ display: "none"}} dangerouslySetInnerHTML={{__html: el.content.rendered}} />

          </div>
          )}

      </div>
    );
  }
}

export default App;
