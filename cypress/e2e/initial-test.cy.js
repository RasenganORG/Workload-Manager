describe('First test', () => {
  it('Check if new task form is working', () => {
    cy.visit('http://localhost:3000/')
		cy.wait(100)
		cy.contains('Project 1').click()
		cy.contains("Add new task").click()
		cy.wait(100)
		cy.get("input").eq(4).type("task name") 
		cy.get("textarea").type("task description") 
		// cy.get('[data-cy="newTaskAsignee"]')
		cy.contains("Create task").click()
   })
})