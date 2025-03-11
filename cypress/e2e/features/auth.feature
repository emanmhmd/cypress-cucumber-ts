Feature: Login and Logout
  
  Scenario: Verify that users can successfully log in with valid credentials
    Given You navigate to login page
    When You type valid credentials of "standard_user"
    And You click on login button
    Then You should be redirected to products page

  Scenario: Verify that the system displays an error message with invalid credentials
    Given You navigate to login page
    When You type invalid credentials
    And You click on login button
    Then You should see an error message

  Scenario: Verify that locked out users cannot access the system
    Given You navigate to login page
    When You type valid credentials of "locked_out_user"
    And You click on login button
    Then You should see an error message that the user is locked out

  Scenario: Verify that user redirected to products page after successful login
    Given You navigate to login page
    When You type valid credentials of "standard_user"
    And You click on login button
    Then You should be redirected to products page

  Scenario: Verify that user with no permission can't add items to the cart
    Given You navigate to login page
    When You type valid credentials of "error_user"
    And You click on login button
    And You add the 4th item to the cart
    Then You should see a server side error

  Scenario: Verify that user can log out successfully
    Given You navigate to login page
    When You type valid credentials of "standard_user"
    And You click on login button
    And You click on logout button
    Then You should be redirected to login page

  Scenario: Verify that user can't access any page without login
    Given You navigate to products page
    Then You should be redirected to login page
    And You should see an error message that you need to login first