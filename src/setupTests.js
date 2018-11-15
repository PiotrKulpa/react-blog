import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);