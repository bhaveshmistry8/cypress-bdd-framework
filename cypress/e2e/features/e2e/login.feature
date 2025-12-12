Feature: User Authentication
  As a user
  I want to be able to login to the application
  So that I can access secure features

  Background:
    Given I am on the login page

  @smoke @regression
  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should be redirected to the products page
    And I should see the page title "Products"

  @regression
  Scenario: Login fails with invalid credentials
    When I enter username "invalid_user"
    And I enter password "wrong_password"
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @regression
  Scenario: Login fails with locked out user
    When I enter username "locked_out_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should see an error message containing "locked out"

  @regression
  Scenario Outline: Login with multiple users
    When I enter username "<username>"
    And I enter password "<password>"
    And I click the login button
    Then the login result should be "<result>"

    Examples:
      | username                | password     | result  |
      | standard_user          | secret_sauce | success |
      | problem_user           | secret_sauce | success |
      | performance_glitch_user| secret_sauce | success |
      | locked_out_user        | secret_sauce | failure |