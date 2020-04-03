import React from 'react';
import Enzyme from 'enzyme';
import 'babel-polyfill';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import  App  from '../../client/src/index.jsx';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../client/src/index.jsx', () => 'App');




const wrapper = shallow(<App />);

describe('<App />', () => {

  it('should contain a CalendarBoard child component', () => {
    expect(wrapper.find(App)).toHaveLength(1);
  });

})
