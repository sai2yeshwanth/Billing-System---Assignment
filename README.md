# Billing-System---Assignment
Billing system:
- The project should have 4 separate components apart from the app component
- First, the user should able to add items to the Database with name and price data
- Any new/edited items added should notify the new bill component and update the item selection dropdown
- All the four components are interconnected and should bind data with each other.
- These are the connections
  - Once the item is added/edited the item data in the new bill component is updated
  - Once the bill is generated it should update the My bills component and Sales component
- The add item and select item in the new bill component are dialogs with validations.
  - Item name cannot be empty and price cannot be less than 1
  - Quantity cannot be less than 1
- On click of checkout new component should be reset and the bill to be generated and my bills component would get updated. This would indeed update the sales component.
- There must be two tables in the database. One for bills and one for items.
