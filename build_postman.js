const fs = require('fs');
const path = require('path');

const postmanDir = path.join(__dirname, 'postman');
if (!fs.existsSync(postmanDir)) {
  fs.mkdirSync(postmanDir, { recursive: true });
}

// 1. Postman Environment
const environment = {
  id: "e4a78129-9e8a-4993-9c98-astronauts-env",
  name: "ReqRes - Astronauts QA Environment",
  values: [
    {
      key: "baseUrl",
      value: "https://reqres.in",
      type: "default",
      enabled: true
    },
    {
      key: "userId",
      value: "2",
      type: "default",
      enabled: true
    },
    {
      key: "nonExistentUserId",
      value: "23",
      type: "default",
      enabled: true
    },
    {
      key: "page",
      value: "1",
      type: "default",
      enabled: true
    },
    {
      key: "registerEmail",
      value: "eve.holt@reqres.in",
      type: "default",
      enabled: true
    },
    {
      key: "registerPassword",
      value: "pistol",
      type: "secret",
      enabled: true
    }
  ],
  _postman_variable_scope: "environment",
  _postman_exported_at: new Date().toISOString(),
  _postman_exported_using: "Postman/11.0.0"
};

// 2. Postman Collection
const collection = {
  info: {
    _postman_id: "8c352a10-fa9d-4731-897c-astronauts-qa",
    name: "Astronauts QA Assessment - ReqRes API Automation",
    description: "Automated API Test Suite for ReqRes API covering GET, POST, PUT, and DELETE methods with Positive, Negative, and Edge test cases for Astronauts QA Technical Assessment.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  item: [
    {
      name: "1. GET Requests",
      item: [
        {
          name: "TC-API-001: Get Single User by Valid ID (Positive)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "pm.test('Response time is within acceptable SLA (< 1500ms)', function () {",
                  "    pm.expect(pm.response.responseTime).to.be.below(1500);",
                  "});",
                  "",
                  "pm.test('Header Content-Type contains application/json', function () {",
                  "    pm.expect(pm.response.headers.get('Content-Type')).to.include('application/json');",
                  "});",
                  "",
                  "pm.test('Response body schema and user details are valid', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData).to.be.an('object');",
                  "    pm.expect(jsonData).to.have.property('data');",
                  "    const user = jsonData.data;",
                  "    pm.expect(user.id).to.eql(Number(pm.environment.get('userId') || 2));",
                  "    pm.expect(user).to.have.property('email');",
                  "    pm.expect(user.email).to.match(/^.+@.+\\..+$/);",
                  "    pm.expect(user).to.have.property('first_name').that.is.a('string').and.not.empty;",
                  "    pm.expect(user).to.have.property('last_name').that.is.a('string').and.not.empty;",
                  "    pm.expect(user).to.have.property('avatar').that.is.a('string').and.not.empty;",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "GET",
            header: [
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/api/users/{{userId}}",
              host: ["{{baseUrl}}"],
              path: ["api", "users", "{{userId}}"]
            },
            description: "Retrieve single user information with valid existing ID."
          }
        },
        {
          name: "TC-API-002: Get Single User Not Found (Negative)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 404 Not Found', function () {",
                  "    pm.response.to.have.status(404);",
                  "});",
                  "",
                  "pm.test('Response time is within acceptable limit (< 1500ms)', function () {",
                  "    pm.expect(pm.response.responseTime).to.be.below(1500);",
                  "});",
                  "",
                  "pm.test('Response body is an empty JSON object', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData).to.be.an('object');",
                  "    pm.expect(Object.keys(jsonData).length).to.eql(0);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "GET",
            header: [
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/api/users/{{nonExistentUserId}}",
              host: ["{{baseUrl}}"],
              path: ["api", "users", "{{nonExistentUserId}}"]
            },
            description: "Attempt to retrieve non-existent user with ID 23."
          }
        },
        {
          name: "TC-API-003: Get User List with Pagination (Positive)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "pm.test('Pagination metadata is correct', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData.page).to.eql(Number(pm.environment.get('page') || 1));",
                  "    pm.expect(jsonData.per_page).to.be.a('number').above(0);",
                  "    pm.expect(jsonData.total).to.be.a('number').above(0);",
                  "    pm.expect(jsonData.total_pages).to.be.a('number').above(0);",
                  "});",
                  "",
                  "pm.test('Users list contains array of user items with valid schema', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData.data).to.be.an('array').that.is.not.empty;",
                  "    jsonData.data.forEach(function(user) {",
                  "        pm.expect(user).to.have.property('id').that.is.a('number');",
                  "        pm.expect(user).to.have.property('email').that.is.a('string');",
                  "        pm.expect(user).to.have.property('first_name').that.is.a('string');",
                  "        pm.expect(user).to.have.property('last_name').that.is.a('string');",
                  "        pm.expect(user).to.have.property('avatar').that.is.a('string');",
                  "    });",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "GET",
            header: [
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/api/users?page={{page}}",
              host: ["{{baseUrl}}"],
              path: ["api", "users"],
              query: [
                {
                  key: "page",
                  value: "{{page}}"
                }
              ]
            },
            description: "Retrieve paginated list of users."
          }
        }
      ]
    },
    {
      name: "2. POST Requests",
      item: [
        {
          name: "TC-API-004: Create New User (Positive)",
          event: [
            {
              listen: "prerequest",
              script: {
                exec: [
                  "pm.variables.set('testUserName', 'Astronauts QA Engineer');",
                  "pm.variables.set('testUserJob', 'SDET Specialist');"
                ],
                type: "text/javascript"
              }
            },
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 201 Created', function () {",
                  "    pm.response.to.have.status(201);",
                  "});",
                  "",
                  "pm.test('Created user matches submitted payload', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData.name).to.eql(pm.variables.get('testUserName'));",
                  "    pm.expect(jsonData.job).to.eql(pm.variables.get('testUserJob'));",
                  "    pm.expect(jsonData).to.have.property('id').that.is.not.empty;",
                  "    pm.expect(jsonData).to.have.property('createdAt').that.is.not.empty;",
                  "});",
                  "",
                  "pm.test('createdAt is a valid ISO 8601 date string', function () {",
                  "    const jsonData = pm.response.json();",
                  "    const date = new Date(jsonData.createdAt);",
                  "    pm.expect(!isNaN(date.getTime())).to.be.true;",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"name\": \"{{testUserName}}\",\n    \"job\": \"{{testUserJob}}\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/users",
              host: ["{{baseUrl}}"],
              path: ["api", "users"]
            },
            description: "Create a user with valid name and job role."
          }
        },
        {
          name: "TC-API-005: Create User with Empty Payload (Edge)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 201 Created', function () {",
                  "    pm.response.to.have.status(201);",
                  "});",
                  "",
                  "pm.test('System generates ID and createdAt even with empty payload', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData).to.have.property('id').that.is.not.empty;",
                  "    pm.expect(jsonData).to.have.property('createdAt').that.is.not.empty;",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: "{}"
            },
            url: {
              raw: "{{baseUrl}}/api/users",
              host: ["{{baseUrl}}"],
              path: ["api", "users"]
            },
            description: "Test boundary behavior when creating user with empty body."
          }
        },
        {
          name: "TC-API-006: Register User Successful (Positive)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "pm.test('Response contains generated ID and auth token', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData).to.have.property('id').that.is.a('number');",
                  "    pm.expect(jsonData).to.have.property('token').that.is.a('string').and.not.empty;",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"email\": \"{{registerEmail}}\",\n    \"password\": \"{{registerPassword}}\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/register",
              host: ["{{baseUrl}}"],
              path: ["api", "register"]
            },
            description: "Register new account with valid credentials."
          }
        },
        {
          name: "TC-API-007: Register User Missing Password (Negative)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 400 Bad Request', function () {",
                  "    pm.response.to.have.status(400);",
                  "});",
                  "",
                  "pm.test('Error message specifies missing password', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData).to.have.property('error').that.eql('Missing password');",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"email\": \"sydney@fife\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/register",
              host: ["{{baseUrl}}"],
              path: ["api", "register"]
            },
            description: "Attempt registration with email only and missing password."
          }
        },
        {
          name: "TC-API-008: Register User Missing Email (Negative)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 400 Bad Request', function () {",
                  "    pm.response.to.have.status(400);",
                  "});",
                  "",
                  "pm.test('Error message specifies missing email or username', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData).to.have.property('error').that.eql('Missing email or username');",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "POST",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"password\": \"pistol\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/register",
              host: ["{{baseUrl}}"],
              path: ["api", "register"]
            },
            description: "Attempt registration with password only and missing email."
          }
        }
      ]
    },
    {
      name: "3. PUT Requests",
      item: [
        {
          name: "TC-API-009: Update User Details (Positive)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "pm.test('Updated user data reflects changes', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData.name).to.eql('Astronauts Lead QA');",
                  "    pm.expect(jsonData.job).to.eql('Senior SDET Manager');",
                  "    pm.expect(jsonData).to.have.property('updatedAt').that.is.not.empty;",
                  "});",
                  "",
                  "pm.test('updatedAt is a valid ISO 8601 timestamp', function () {",
                  "    const jsonData = pm.response.json();",
                  "    const date = new Date(jsonData.updatedAt);",
                  "    pm.expect(!isNaN(date.getTime())).to.be.true;",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "PUT",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"name\": \"Astronauts Lead QA\",\n    \"job\": \"Senior SDET Manager\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/users/{{userId}}",
              host: ["{{baseUrl}}"],
              path: ["api", "users", "{{userId}}"]
            },
            description: "Update existing user full name and role."
          }
        },
        {
          name: "TC-API-010: Update User Partial Field (Positive / Edge)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "pm.test('Updated field is returned along with updatedAt', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData.job).to.eql('Principal Automation Architect');",
                  "    pm.expect(jsonData).to.have.property('updatedAt').that.is.not.empty;",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "PUT",
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              },
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"job\": \"Principal Automation Architect\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/users/{{userId}}",
              host: ["{{baseUrl}}"],
              path: ["api", "users", "{{userId}}"]
            },
            description: "Update only one field (job) on user."
          }
        }
      ]
    },
    {
      name: "4. DELETE Requests",
      item: [
        {
          name: "TC-API-011: Delete User by Valid ID (Positive)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 204 No Content', function () {",
                  "    pm.response.to.have.status(204);",
                  "});",
                  "",
                  "pm.test('Response body is empty', function () {",
                  "    pm.expect(pm.response.text()).to.eql('');",
                  "});",
                  "",
                  "pm.test('Response time is within acceptable limit (< 1500ms)', function () {",
                  "    pm.expect(pm.response.responseTime).to.be.below(1500);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "DELETE",
            header: [
              {
                key: "Accept",
                value: "application/json"
              }
            ],
            url: {
              raw: "{{baseUrl}}/api/users/{{userId}}",
              host: ["{{baseUrl}}"],
              path: ["api", "users", "{{userId}}"]
            },
            description: "Delete an existing user by ID."
          }
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(postmanDir, 'astronauts-reqres-environment.json'), JSON.stringify(environment, null, 2), 'utf8');
fs.writeFileSync(path.join(postmanDir, 'astronauts-reqres-collection.json'), JSON.stringify(collection, null, 2), 'utf8');

console.log('Postman collection and environment successfully generated in ./postman/');
