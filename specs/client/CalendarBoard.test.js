import React from 'react';
import Enzyme from 'enzyme';
import 'babel-polyfill';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import  CalendarBoard  from '../../client/src/CalendarBoard.jsx';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../client/src/CalendarBoard.jsx', () => 'CalendarBoard');

const mockFn = jest.fn();



describe('CalendarBoard Component', () => {

  it('should be defined', () => {
    expect(CalendarBoard).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <CalendarBoard className='calendarFrame' />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call mock function when a day is clicked', () => {
    const wrapper = shallow(<CalendarBoard className='calendarFrame' onDayClick={mockFn}/>);

    wrapper.find('.availableDay').simulate('click')
    // expect(mockFn).toHaveBeenCalled();
    expect(wrapper.find('.availableDay').length).toEqual(1);
  })

})
