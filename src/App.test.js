import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import fetch from 'isomorphic-fetch';
import App from './App';
import './setupTests';

it('renders without crashing', () => {
  shallow(<App />);
});

it('should call componentDidMount', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'componentDidMount');
    instance.componentDidMount();
    expect(spy).toHaveBeenCalledTimes(1);
  });

it('fetch data from Wordpress API', () => {
  var data = [
    {
    "id": 111,
    "date": "2018-11-11T14:32:34",
    "date_gmt": "2018-11-11T13:32:34"
    }
  ];
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(data);
    }, 300);
  });

  return promise.then(function(value) {
    expect(value).toBeDefined();
    expect(value.length).toBe(1);

    const app = shallow(<App />);
    app.setState({ msg: '' });
    expect(app.find('.msg').text()).toBe('');
  });

});
