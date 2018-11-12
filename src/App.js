import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    defaultPosts: [],
    posts: [],
    msg: ''
  }

  loadMoreNum = 10

  showPost(e) {
    e.preventDefault();
    e.target.previousSibling.style.display = 'none';
    e.target.nextSibling.style.display = 'block';
  }

  loadMore(e) {
    e.preventDefault();
    this.loadMoreNum += 10;
    if (this.loadMoreNum <= this.state.defaultPosts.length) {
      this.setState({
        posts: this.state.defaultPosts.slice(0, this.loadMoreNum)
      }, this.hideMoreLinks);
    } else {
      this.setState({
        posts: this.state.defaultPosts.slice(0, this.state.defaultPosts.length)
      }, this.hideMoreLinks);
    }
    /** Hide more links from Wordpress*/
    this.hideMoreLinks();
  }

  alertMessage() {
    if (this.state.posts.length === 0) {
      this.setState({
        msg: 'Nie ma takich postów'
      })
    } else {
      this.setState({
        msg: ''
      })
    }

  }

  searchPost(e) {

      if (e.target.value.length > 0) {
        this.setState({
          posts: this.state.defaultPosts.filter((el) => el.title.rendered.toLowerCase().includes(e.target.value.toLowerCase()))
        }, this.alertMessage);
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
    /** Hide more links from Wordpress*/
    let moreLinks = document.querySelectorAll('.link-more');
    for (let x = 0; x < moreLinks.length; x++) {
      moreLinks[x].style.display = "none";
    }
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
      this.hideMoreLinks();

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

        <p>{this.state.msg}</p>

        {!this.state.posts ? <p>Nie ma wpisów</p> : this.state.posts.map((el) =>
          <div key={el.id}>
            <h1>{el.title.rendered}</h1>
            <p>{el.date}</p>
            <div dangerouslySetInnerHTML={{__html: el.excerpt.rendered}} />
            <a href="" onClick={(e) => {this.showPost(e)}}>Pokaż cały wpis</a>
            <div style={{ display: "none"}} dangerouslySetInnerHTML={{__html: el.content.rendered}} />
          </div>
          )}

          <button style={{marginTop: "25px"}} onClick={(e) => {this.loadMore(e)}}>Pokaż więcej wpisów</button>


      </div>
    );
  }
}

export default App;
