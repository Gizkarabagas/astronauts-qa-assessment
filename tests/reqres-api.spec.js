const { test, expect } = require('@playwright/test');

test.describe('ReqRes API Test Suite - Astronauts QA Assessment', () => {

  // ==========================================
  // 1. GET Requests
  // ==========================================
  test('TC-API-001: Get Single User by Valid ID', async ({ request }) => {
    const response = await request.get('/api/users/2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.first_name).toBe('Janet');
  });

  test('TC-API-002: Get Single User Not Found (Negative 404)', async ({ request }) => {
    const response = await request.get('/api/users/23');
    expect(response.status()).toBe(404);
  });

  test('TC-API-003: Get User List with Pagination', async ({ request }) => {
    const response = await request.get('/api/users?page=1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.page).toBe(1);
    expect(body.data.length).toBeGreaterThan(0);
  });

  // ==========================================
  // 2. POST Requests
  // ==========================================
  test('TC-API-004: Create New User (201)', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'morpheus',
        job: 'leader'
      }
    });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('morpheus');
    expect(body.job).toBe('leader');
  });

  test('TC-API-005: Create User with Empty Payload (Edge 201)', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {}
    });
    expect(response.status()).toBe(201);
  });

  test('TC-API-006: Register User Successful (200)', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.token).toBeTruthy();
  });

  test('TC-API-007: Register User Missing Password (Negative 400)', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: 'sydney@fife'
      }
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });

  test('TC-API-008: Register User Missing Email (Negative 400)', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        password: 'pistol'
      }
    });
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe('Missing email or username');
  });

  // ==========================================
  // 3. PUT Requests
  // ==========================================
  test('TC-API-009: Update User Details (PUT 200)', async ({ request }) => {
    const response = await request.put('/api/users/2', {
      data: {
        name: 'morpheus',
        job: 'zion resident'
      }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.job).toBe('zion resident');
  });

  test('TC-API-010: Update User Partial Field (PUT 200)', async ({ request }) => {
    const response = await request.put('/api/users/2', {
      data: {
        job: 'developer'
      }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.job).toBe('developer');
  });

  // ==========================================
  // 4. DELETE Requests
  // ==========================================
  test('TC-API-011: Delete User by Valid ID (DELETE 204)', async ({ request }) => {
    const response = await request.delete('/api/users/2');
    expect(response.status()).toBe(204);
  });

});
