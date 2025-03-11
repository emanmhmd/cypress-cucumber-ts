Feature: Shopping cart and Checkout process

    Rule: Shopping cart and Checkout functionality

        Scenario: Verify that user can add items to the cart
            Given You are logged in as "Standard User"
            When You add an item to the cart
            And You click on the cart button
            Then You should see the item in the cart

        Scenario: Verify that user can remove items from the cart
            Given You are logged in as "Standard User"
            And You add an item to the cart
            And You click on the cart button
            And You click on remove button
            Then You should see the item removed from the cart

        Scenario: Verify that user can checkout successfully
            Given You are logged in as "Standard User"
            When You add an item to the cart
            And You click on the cart button
            And You click on checkout button
            And You fill out the checkout form
            And You click on continue button
            And You click on finish button
            Then You should see the order confirmation page

        Scenario: Verify that user can't checkout without adding items to the cart
            Given You are logged in as "Standard User"
            When You click on the cart button
            And You click on checkout button
            And You click on continue button
            Then You should see an error message "Error: First Name is required"

        Scenario: Verify that user can't checkout without login
            Given You navigate to products page
            Then You should be redirected to login page

    Rule: Edge Cases

        Scenario: Verify that checkout form requires first name
            Given You are logged in as "Standard User"
            When You add an item to the cart
            And You click on the cart button
            And You click on checkout button
            And You leave the first name field empty and enter "User" in the last name field and "12345" in the postal code field
            And You click on continue button
            Then You should see an error message "Error: First Name is required"

        Scenario: Verify that checkout form requires last name
            Given You are logged in as "Standard User"
            When You add an item to the cart
            And You click on the cart button
            And You click on checkout button
            And You enter "Standard" in the first name field and leave the last name field empty and enter "12345" in the postal code field
            And You click on continue button
            Then You should see an error message "Error: Last Name is required"

        Scenario: Verify that checkout form requires zip code
            Given You are logged in as "Standard User"
            When You add an item to the cart
            And You click on the cart button
            And You click on checkout button
            And You enter "John" in the first name field, "Doe" in the last name field, and leave the postal code field empty
            And You click on continue button
            Then You should see an error message "Error: Postal Code is required"