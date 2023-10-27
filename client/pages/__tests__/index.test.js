import React from 'react';
import { shallow } from 'enzyme';
import Home from "../index";
import Container from '../../components/container';

describe('<Home />', () => {
    it('renders <Container />', () => {
      const wrapper = shallow(<Home />);
  
      expect(wrapper.find(Container)).exists();
    })
  })