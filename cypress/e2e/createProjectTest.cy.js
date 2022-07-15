 
describe('Check if all required inputs can be completed', () => {
	beforeEach(() => {
		cy.visit('projects/add-new-project/')

	})
  it('Check if new task form is working', () => {
		cy.get("[data-cy='projectTitle']").find("input").type("Project 2")
		cy.get("[data-cy='projectDescription']").find("textarea").type("Project 2 description")
		cy.get("[data-cy='addUsers']")
			.click()
			.get("[title='John Doe 1']").click()
			.get("[title='John Doe 4']").click()
			cy.get("[data-cy='addUsers']").click()
		cy.get("[data-cy='dueDateSelector']").find('input')
			.click()
			.get('.ant-picker-content').contains("23")
			.click()
		cy.get("[data-cy='billingSelector']")
			.click()
			.get("[title='Billing 1']")
			.click()
		cy.get("[data-cy='newProjectSubmitButton']").find("button").click()
   })

	 it("Ensure form validation works for all req fields", () => {
		cy.get("[data-cy='newProjectSubmitButton']").find("button").click()
		cy.get("[data-cy='projectTitle']").contains("Please input the title of your project!").should("be.visible")
		cy.get("[data-cy='projectDescription']").contains("Please add a project description!").should("be.visible")
		cy.get("[data-cy='addUsers']").contains("Please add at lease one user to your project!").should("be.visible")
		cy.get("[data-cy='dueDateSelector']").contains("Please add a due date for your project!").should("be.visible")
		cy.get("[data-cy='billingSelector']").contains("Please select a billing option!").should("be.visible")
	 })
})

