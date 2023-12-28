import Home from './page';

describe('<Home />', () => {
  it('mounts', () => {
    cy.mount(<Home />);
  });
});
