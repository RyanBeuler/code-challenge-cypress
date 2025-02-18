describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup.html');
  });

  it('submits the form without errors', () => {
    cy.findByLabelText('Username').type('sparkbox');
    cy.findByLabelText('Password').type('passwords-are-actually-really-cool');
    cy.findByRole('button', { text: 'Submit' }).click();
    cy.get('.error').should('not.exist');
    cy.get('.error_message').should('not.exist');
  });

  describe('form validation displays an error when', () => {
    it('the username is empty', () => {
      cy.findByRole('button', { text: 'Submit' }).click();
      cy.findByText('Enter a username').should('have.class', 'error_message');
      cy.get('input[name=username]').should('have.class', 'error');
    });

    it('the password is less than 10 characters', () => {
      // add test commands
      cy.findByLabelText('Username').type('sparkbox');
      cy.findByLabelText('Password').type('invalid');
      cy.findByRole('button', { text: 'Submit' }).click();
      cy.findByText('Password must be at least 10 characters').should('have.class', 'error_message');
      cy.get('input[name=password]').should('have.class', 'error');
    });
  });
});
