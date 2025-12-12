Feature: Shopping Cart
  As a customer
  I want to add products to my cart
  So that I can purchase them

  Background:
    Given I am logged in as a standard user
    And I am on the products page

  @smoke @regression
  Scenario: Add single product to cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1 item
    And the product should have a "Remove" button

  @regression
  Scenario: Add multiple products to cart
    When I add the following products to cart:
      | Sauce Labs Backpack      |
      | Sauce Labs Bike Light    |
      | Sauce Labs Bolt T-Shirt  |
    Then the cart badge should show 3 items

  @regression
  Scenario: Remove product from cart
    When I add "Sauce Labs Backpack" to the cart
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart badge should not be visible
    And the product should have an "Add to cart" button

  @smoke @regression
  Scenario: Complete checkout process
    When I add "Sauce Labs Backpack" to the cart
    And I click on the cart icon
    Then I should be on the cart page
    When I click the checkout button
    And I enter checkout information:
      | firstName | John    |
      | lastName  | Doe     |
      | zipCode   | 12345   |
    And I click continue
    Then I should see the checkout overview
    When I click finish
    Then I should see the order confirmation
    And the confirmation message should contain "Thank you"

  @regression
  Scenario: Cart persists across pages
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the product details of "Sauce Labs Backpack"
    Then the cart badge should still show 1 item