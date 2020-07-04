@baseUrl @baseUrl-reqres
Feature: REST API Examples covering Create,Read,Update and Delete

  Scenario: Making a POST request with json data
    Given The json request data
    """json
    {
      "name": "morpheus",
      "job": "leader"
    }
    """
    When I make a POST request to "/api/users"
    Then The response property "name" should be "morpheus"
    And The response property "job" should be "leader"
    Then The response status code should be "201"


  Scenario Outline: Submit a GET request to fetch existing users
    When I make a GET request to "/api/users/<id>"
    Then The response status code should be "200"
    Then The response property "data.id" should be "<id>"
    And The response property "data.email" should be "<email>"
    And The response property "data.first_name" should be "<first_name>"
    And The response property "data.last_name" should be "<last_name>"
    And The response property "ad.company" should be "<company>"
    Examples:
      | id | email                  |first_name|last_name|company|
      | 1  | george.bluth@reqres.in |George    |Bluth    |StatusCode Weekly|
      | 2  | janet.weaver@reqres.in |Janet     |Weaver   |StatusCode Weekly|


  Scenario: DELETE request to delete an existing user
    When I make a DELETE request to "/api/users/2"
    Then The response status code should be "204"


  Scenario: POST request to verify a bad requet response
    Given The json request data
    """json
    {
      "email": "peter@klaven"
    }
    """
    When I make a POST request to "/api/login"
    Then The response status code should be "400"


  Scenario: Making a UPDATE request with json data
    Given The json request data
    """json
    {
      "name": "morpheus",
      "job": "zion resident"
    }
    """
    When I make a PUT request to "/api/users/2"
    Then The response property "name" should be "morpheus"
    And The response property "job" should be "zion resident"
    And The response status code should be "200"