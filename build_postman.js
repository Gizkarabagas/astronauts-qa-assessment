const fs = require('fs');
const path = require('path');

const postmanDir = path.join(__dirname, 'postman');
if (!fs.existsSync(postmanDir)) {
  fs.mkdirSync(postmanDir, { recursive: true });
}

// 1. Postman Environment (Simple & Clean)
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
    }
  ],
  _postman_variable_scope: "environment",
  _postman_exported_at: new Date().toISOString(),
  _postman_exported_using: "Postman/11.0.0"
};

// 2. Postman Collection (Human, Clean, and Easy to Explain)
const collection = {
  info: {
    _postman_id: "8c352a10-fa9d-4731-897c-astronauts-qa",
    name: "Astronauts QA Assessment - ReqRes API Automation",
    description: "API Test Collection for ReqRes covering GET, POST, PUT, and DELETE methods.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  item: [
    {
      name: "1. GET Requests",
      item: [
        {
          name: "TC-API-001: Get Single User (Valid ID)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// 1. Cek status code 200 OK",
                  "pm.test('Status code is 200', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "// 2. Cek apakah user yang dikembalikan benar ID 2",
                  "pm.test('User ID is 2', function () {",
                  "    var jsonData = pm.response.json();",
                  "    pm.expect(jsonData.data.id).to.eql(2);",
                  "    pm.expect(jsonData.data.first_name).to.eql('Janet');",
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
            }
          }
        },
        {
          name: "TC-API-002: Get Single User Not Found (Negative)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// Cek status code 404 Not Found",
                  "pm.test('Status code is 404', function () {",
                  "    pm.response.to.have.status(404);",
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
              raw: "{{baseUrl}}/api/users/23",
              host: ["{{baseUrl}}"],
              path: ["api", "users", "23"]
            }
          }
        },
        {
          name: "TC-API-003: Get User List with Pagination",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// 1. Cek status 200",
                  "pm.test('Status code is 200', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "// 2. Cek data page 1",
                  "pm.test('Page is 1 and data is not empty', function () {",
                  "    var jsonData = pm.response.json();",
                  "    pm.expect(jsonData.page).to.eql(1);",
                  "    pm.expect(jsonData.data.length).to.be.above(0);",
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
              raw: "{{baseUrl}}/api/users?page=1",
              host: ["{{baseUrl}}"],
              path: ["api", "users"],
              query: [
                {
                  key: "page",
                  value: "1"
                }
              ]
            }
          }
        }
      ]
    },
    {
      name: "2. POST Requests",
      item: [
        {
          name: "TC-API-004: Create New User",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// 1. Cek status 201 Created",
                  "pm.test('Status code is 201', function () {",
                  "    pm.response.to.have.status(201);",
                  "});",
                  "",
                  "// 2. Cek data yang dibuat",
                  "pm.test('User name is morpheus', function () {",
                  "    var jsonData = pm.response.json();",
                  "    pm.expect(jsonData.name).to.eql('morpheus');",
                  "    pm.expect(jsonData.job).to.eql('leader');",
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
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"name\": \"morpheus\",\n    \"job\": \"leader\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/users",
              host: ["{{baseUrl}}"],
              path: ["api", "users"]
            }
          }
        },
        {
          name: "TC-API-005: Create User with Empty Payload",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// Cek status 201",
                  "pm.test('Status code is 201', function () {",
                  "    pm.response.to.have.status(201);",
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
            }
          }
        },
        {
          name: "TC-API-006: Register User Successful",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// 1. Cek status 200",
                  "pm.test('Status code is 200', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "// 2. Cek token ada",
                  "pm.test('Response contains token', function () {",
                  "    var jsonData = pm.response.json();",
                  "    pm.expect(jsonData.token).to.not.be.null;",
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
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"email\": \"eve.holt@reqres.in\",\n    \"password\": \"pistol\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/register",
              host: ["{{baseUrl}}"],
              path: ["api", "register"]
            }
          }
        },
        {
          name: "TC-API-007: Register User Missing Password (Negative)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// 1. Cek status 400 Bad Request",
                  "pm.test('Status code is 400', function () {",
                  "    pm.response.to.have.status(400);",
                  "});",
                  "",
                  "// 2. Cek pesan error",
                  "pm.test('Error message is Missing password', function () {",
                  "    var jsonData = pm.response.json();",
                  "    pm.expect(jsonData.error).to.eql('Missing password');",
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
            }
          }
        },
        {
          name: "TC-API-008: Register User Missing Email (Negative)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// 1. Cek status 400 Bad Request",
                  "pm.test('Status code is 400', function () {",
                  "    pm.response.to.have.status(400);",
                  "});",
                  "",
                  "// 2. Cek pesan error",
                  "pm.test('Error message is Missing email or username', function () {",
                  "    var jsonData = pm.response.json();",
                  "    pm.expect(jsonData.error).to.eql('Missing email or username');",
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
            }
          }
        }
      ]
    },
    {
      name: "3. PUT Requests",
      item: [
        {
          name: "TC-API-009: Update User Details",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// 1. Cek status 200",
                  "pm.test('Status code is 200', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "// 2. Cek data terupdate",
                  "pm.test('User job updated to zion resident', function () {",
                  "    var jsonData = pm.response.json();",
                  "    pm.expect(jsonData.job).to.eql('zion resident');",
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
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"name\": \"morpheus\",\n    \"job\": \"zion resident\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/users/2",
              host: ["{{baseUrl}}"],
              path: ["api", "users", "2"]
            }
          }
        },
        {
          name: "TC-API-010: Update User Partial Field",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// 1. Cek status 200",
                  "pm.test('Status code is 200', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "",
                  "// 2. Cek job baru",
                  "pm.test('Job updated to developer', function () {",
                  "    var jsonData = pm.response.json();",
                  "    pm.expect(jsonData.job).to.eql('developer');",
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
              }
            ],
            body: {
              mode: "raw",
              raw: "{\n    \"job\": \"developer\"\n}"
            },
            url: {
              raw: "{{baseUrl}}/api/users/2",
              host: ["{{baseUrl}}"],
              path: ["api", "users", "2"]
            }
          }
        }
      ]
    },
    {
      name: "4. DELETE Requests",
      item: [
        {
          name: "TC-API-011: Delete User by Valid ID",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "// Cek status 204 No Content",
                  "pm.test('Status code is 204', function () {",
                  "    pm.response.to.have.status(204);",
                  "});"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "DELETE",
            header: [],
            url: {
              raw: "{{baseUrl}}/api/users/2",
              host: ["{{baseUrl}}"],
              path: ["api", "users", "2"]
            }
          }
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(postmanDir, 'astronauts-reqres-environment.json'), JSON.stringify(environment, null, 2), 'utf8');
fs.writeFileSync(path.join(postmanDir, 'astronauts-reqres-collection.json'), JSON.stringify(collection, null, 2), 'utf8');

console.log('Simplified Postman collection and environment generated!');
