import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    defaultPosts: [],
    posts: []
  }

  loadMoreNum = 10

  loadMore() {
    this.loadMoreNum += 10;
    if (this.loadMoreNum <= this.state.defaultPosts.length) {
      this.setState({
        posts: this.state.defaultPosts.slice(0, this.loadMoreNum)
      });
    } else {
      this.setState({
        posts: this.state.defaultPosts.slice(0, this.state.defaultPosts.length)
      });
    }
  }

  searchPost(e) {
    //TODO if array state.posts is empty show info - bug?
    if (e.target.value.length > 0) {
      this.setState({
        posts: this.state.defaultPosts.filter((el) => el.title.rendered.toLowerCase().includes(e.target.value.toLowerCase()))
      });
      console.log(this.state.posts.length);
      //this.state.posts.length === 0 ? alert('Nic nie znaleziono') : null;
    } else {
      this.setState({
        posts: this.state.defaultPosts
      });
    }
  }

  sortPosts(e) {
    switch(e.target.value) {
      case 'newest':
        this.setState({
          posts: this.state.posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
        })
        break;
      case 'oldest':
        this.setState({
          posts: this.state.posts.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
        })
        break;
      case 'asc':
        this.setState({
          posts: this.state.posts.sort((a,b) => (a.title.rendered > b.title.rendered) ? 1 : ((b.title.rendered > a.title.rendered) ? -1 : 0))
        })
        break;
      case 'desc':
        this.setState({
          posts: this.state.posts.sort((a,b) => (a.title.rendered < b.title.rendered) ? 1 : ((b.title.rendered < a.title.rendered) ? -1 : 0))
        })
        break;
      default:
      this.setState({
        posts: this.state.posts.sort((a,b) => (a.title.rendered > b.title.rendered) ? 1 : ((b.title.rendered > a.title.rendered) ? -1 : 0))
      })

    }
  }

  hideMoreLinks() {
    
  }

  componentDidMount() {
    fetch('http://localhost/wprest/wp/wp-json/wp/v2/posts?per_page=100')
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      this.setState({
        defaultPosts: myJson,
        posts: myJson.slice(0, this.loadMoreNum)
      });

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
        Szukaj: <input onChange={(e) => {this.searchPost(e)}}/>
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
            <a href="">More</a>
            <div style={{ display: "none"}} dangerouslySetInnerHTML={{__html: el.content.rendered}} />
          </div>
          )}

          <button style={{marginTop: "25px"}} onClick={() => {this.loadMore()}}>Pokaż więcej wpisów</button>


      </div>
    );
  }
}

export default App;
