/**
 * @jest-environment node
 */

import * as api from '../../services/apiConnector';

describe("Testing login() function", () => {
  test("with wrong login and password", async () => {
    const response = await api.login("Random_login", "Random_password");
    const reference = {
      status_code: -1,
      error: "Wrong login or password"
    };
    expect(response.status_code).toBe(reference.status_code);
    expect(response.error).toBe(reference.error);
    expect(response.token).toBeUndefined();
  });

  test("with correct login and password", async () => {
    const response = await api.login("Andrey", "123");
    expect(response.status_code).toBe(0);
    expect(response.error).toBe("");
    expect(response.token).toBeDefined();
  });
});

describe("Testing getListOfMessages() function", () => {
  test("without token", async () => {
    const response = await api.getListOfMessages();
    const reference = {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };

    expect(response.status_code).toBe(reference.status_code);
    expect(response.error).toBe(reference.error);
  });

  test("with testing token", async () => {
    const response = await api.getListOfMessages("VGhpcyBpcyB0b2tlbg==");

    expect(response.status_code).toBe(0);
    expect(response.error).toBe("");
    expect(response.list).toBeDefined();
  });
});
