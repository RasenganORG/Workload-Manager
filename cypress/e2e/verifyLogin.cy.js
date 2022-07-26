
 describe('check if login is wokring', () => {
	beforeEach(() => {
		cy.visit('login/')

	})
  it('verify login', () => {
		cy.get("[data-cy='usernameInput']")
			.find("input")
			.type("johndoe2")
		cy.get("[data-cy='passwordInput']")
			.find("input")
			.type("pass")
		cy.get("[data-cy='loginSubmitButton']")
			.find("button")
			.click()
			.request({
				method: 'GET',
				url: "http://localhost:8080/api/users",
			})
			.then( (board) => {

				console.log(board.body)
			} )
 
	 })
})