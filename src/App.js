import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    posts: []
  }

  

  sortPosts(e) {
    switch(e.target.value) {
      case 'newest':
        console.log('przelaczylem na najnowsze');
        this.setState({
          posts: this.state.posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
        })
        break;
      case 'oldest':
        console.log('przelaczylem na najstarsze');
        this.setState({
          posts: this.state.posts.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
        })
        break;
      case 'asc':
        console.log('przelaczylem na alfabetycznie ');
        this.setState({
          posts: this.state.posts.sort((a,b) => (a.title.rendered > b.title.rendered) ? 1 : ((b.title.rendered > a.title.rendered) ? -1 : 0))
        })
        break;
      case 'desc':
        console.log('przelaczylem na alfabetycznie od tyłu');
        this.setState({
          posts: this.state.posts.sort((a,b) => (a.title.rendered < b.title.rendered) ? 1 : ((b.title.rendered < a.title.rendered) ? -1 : 0))
        })
        break;

    }
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
        Szukaj: <input />
        Sortuj:
        <select onChange={(e) => {this.sortPosts(e)}}>
          <option value="newest">Najnowsze</option>
          <option value="oldest">Najstarsze</option>
          <option value="asc">Alfabetycznie rosnąco</option>
          <option value="desc">Alfabetycznie malejąco</option>
        </select>

        {!this.state.posts ? <p>Nie ma wpisów</p> : this.state.posts.map((el) =>

          <div key={el.id}>
            <h1>{el.title.rendered}</h1>
            <p>{el.date}</p>
            <div dangerouslySetInnerHTML={{__html: el.excerpt.rendered}} />
            <a href="#">More</a>
            <div style={{ display: "none"}} dangerouslySetInnerHTML={{__html: el.content.rendered}} />

          </div>
          )}

      </div>
    );
  }
}

export default App;
