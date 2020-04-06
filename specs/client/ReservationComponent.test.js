import React from 'react';
import Enzyme from 'enzyme';
import 'babel-polyfill';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import  Reservation  from '../../client/src/index.jsx';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../client/src/index.jsx', () => 'Reservation');




const wrapper = shallow(<Reservation />);

describe('Reservation', () => {


  it('should be defined', () => {
    expect(Reservation).toBeDefined();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a CalendarBoard child component', () => {
    expect(wrapper.find(Reservation)).toHaveLength(1);
  });

})
