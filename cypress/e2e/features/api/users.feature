Feature: User API
  As an API consumer
  I want to interact with user endpoints
  So that I can manage user data

  @api @smoke
  Scenario: Get list of users
    When I send a GET request to "/users"
    Then the response status should be 200
    And the response time should be less than 2000ms
    And the data array should not be empty
    And each user should have the following properties:
      | id       |
      | name     |
      | username |
      | email    |

  @api @regression
  Scenario: Get single user by ID
    When I send a GET request to "/users/1"
    Then the response status should be 200
    And the response should have property "id"
    And the response should have property "name"
    And the response should have property "email"
    And the user email should be valid format

  @api @regression
  Scenario: Get non-existent user returns 404
    When I send a GET request to "/users/999999"
    Then the response status should be 404

  @api @smoke
  Scenario: Create a new user
    Given I have the following user data:
      | name  | John Doe          |
      | email | john@example.com  |
    When I send a POST request to "/users"
    Then the response status should be 201
    And the response should have property "id"
    And the response "name" should be "John Doe"
    And the response "email" should be "john@example.com"

  @api @regression
  Scenario: Update user with PUT
    Given I have the following user data:
      | name  | Jane Smith         |
      | email | jane@example.com   |
    When I send a PUT request to "/users/1"
    Then the response status should be 200
    And the response "name" should be "Jane Smith"

  @api @regression
  Scenario: Update user with PATCH
    Given I have the following user data:
      | email | updated@example.com |
    When I send a PATCH request to "/users/1"
    Then the response status should be 200
    And the response "email" should be "updated@example.com"

  @api @regression
  Scenario: Delete user
    When I send a DELETE request to "/users/1"
    Then the response status should be 200

  @api @regression
  Scenario: Get list of posts
    When I send a GET request to "/posts"
    Then the response status should be 200
    And the data array should not be empty

  @api @regression
  Scenario: Get posts for specific user
    When I send a GET request to "/posts?userId=1"
    Then the response status should be 200
    And the data array should not be empty