Feature: State Management

    Rule: Cart State Management

        Scenario: Verify that cart remembers items when refreshing the page
            Given You are logged in as "Standard User"
            And You add an item to the cart
            And You click on the cart button
            And You refresh the page
            Then You should see the item in the cart

        Scenario: Verify cart empties after order completes
            Given You are logged in as "Standard User"
            When You buy an item by completing checkout process
            And You return to the home page
            And You click on the cart button
            Then the cart should be empty

        