import { test, expect } from '@playwright/test';

/**
 * ReqRes.in API Test Suite - Astronauts QA Technical Assessment
 * Framework: Playwright Test with TypeScript
 * Author: Bagas Gizkara
 * Total Cases: 11 (Positive, Negative, Edge across GET, POST, PUT, DELETE)
 */

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface SingleUserResponse {
  data: User;
  support: {
    url: string;
    text: string;
  };
}

interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

interface CreateUserResponse {
  name?: string;
  job?: string;
  id: string;
  createdAt: string;
}

interface RegisterSuccessResponse {
  id: number;
  token: string;
}

interface ErrorResponse {
  error: string;
}

interface UpdateUserResponse {
  name?: string;
  job?: string;
  updatedAt: string;
}

test.describe('ReqRes API Automation Test Suite', () => {

  // ==========================================
  // 1. GET Requests
  // ==========================================
  test('TC-API-001: Get Single User by Valid ID (Positive 200)', async ({ request }) => {
    const response = await request.get('/api/users/2');
    expect(response.status()).toBe(200);

    const body: SingleUserResponse = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.first_name).toBe('Janet');
    expect(body.data.email).toBe('janet.weaver@reqres.in');
  });

  test('TC-API-002: Get Single User Not Found (Negative 404)', async ({ request }) => {
    const response = await request.get('/api/users/23');
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body).toEqual({});
  });

  test('TC-API-003: Get User List with Pagination (Positive 200)', async ({ request }) => {
    const response = await request.get('/api/users?page=1');
    expect(response.status()).toBe(200);

    const body: UserListResponse = await response.json();
    expect(body.page).toBe(1);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);
  });

  // ==========================================
  // 2. POST Requests
  // ==========================================
  test('TC-API-004: Create New User (Positive 201)', async ({ request }) => {
    const payload = {
      name: 'morpheus',
      job: 'leader'
    };

    const response = await request.post('/api/users', { data: payload });
    expect(response.status()).toBe(201);

    const body: CreateUserResponse = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
  });

  test('TC-API-005: Create User with Empty Payload (Edge 201)', async ({ request }) => {
    const response = await request.post('/api/users', { data: {} });
    expect(response.status()).toBe(201);

    const body: CreateUserResponse = await response.json();
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
  });

  test('TC-API-006: Register User Successful (Positive 200)', async ({ request }) => {
    const payload = {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    };

    const response = await request.post('/api/register', { data: payload });
    expect(response.status()).toBe(200);

    const body: RegisterSuccessResponse = await response.json();
    expect(body.id).toBeDefined();
    expect(body.token).toBeTruthy();
  });

  test('TC-API-007: Register User Missing Password (Negative 400)', async ({ request }) => {
    const payload = {
      email: 'sydney@fife'
    };

    const response = await request.post('/api/register', { data: payload });
    expect(response.status()).toBe(400);

    const body: ErrorResponse = await response.json();
    expect(body.error).toBe('Missing password');
  });

  test('TC-API-008: Register User Missing Email (Negative 400)', async ({ request }) => {
    const payload = {
      password: 'pistol'
    };

    const response = await request.post('/api/register', { data: payload });
    expect(response.status()).toBe(400);

    const body: ErrorResponse = await response.json();
    expect(body.error).toBe('Missing email or username');
  });

  // ==========================================
  // 3. PUT Requests
  // ==========================================
  test('TC-API-009: Update User Details (Positive 200)', async ({ request }) => {
    const payload = {
      name: 'morpheus',
      job: 'zion resident'
    };

    const response = await request.put('/api/users/2', { data: payload });
    expect(response.status()).toBe(200);

    const body: UpdateUserResponse = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body.updatedAt).toBeTruthy();
  });

  test('TC-API-010: Update User Partial Field (Positive - Edge 200)', async ({ request }) => {
    const payload = {
      job: 'developer'
    };

    const response = await request.put('/api/users/2', { data: payload });
    expect(response.status()).toBe(200);

    const body: UpdateUserResponse = await response.json();
    expect(body.job).toBe('developer');
    expect(body.updatedAt).toBeTruthy();
  });

  // ==========================================
  // 4. DELETE Requests
  // ==========================================
  test('TC-API-011: Delete User by Valid ID (Positive 204)', async ({ request }) => {
    const response = await request.delete('/api/users/2');
    expect(response.status()).toBe(204);
  });

});
