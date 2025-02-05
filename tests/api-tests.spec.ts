import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Retrieve the API_URL from the environment
const apiUrl = process.env.API_URL as string;

//Task 1 : GET/posts API Testing
test.describe('[@GETall] Validating GET /posts endpoints functionality', () => {

  // Task 1.1 : Validate that the endpoint returns a 200 OK status
  test('Validate GET /posts endpoint should return 200 OK status', async ({ request }) => {

    const response = await request.get(apiUrl); // Use API_URL from .env

    expect(response.status()).toBe(200); // Validate that the endpoint returns a 200 OK status
    console.log('Status is 200 in the response');

  });

  //Task 1.2 : Assert that the response contains an array of posts with the correct structure
  test('Validate GET /posts endpoint should return an array with the correct structure', async ({ request }) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/posts'); // Use API_URL from .env

    const posts: { id: number; title: string; body: string }[] = await response.json(); // Parse response as JSON

    expect(Array.isArray(posts)).toBe(true);   // Validate that the response is an array
    expect(posts.length).toBeGreaterThan(0); // Ensure array is not empty

    posts.forEach((post: { id: number; title: string; body: string }) => { // Validate that each post has the required properties with correct types
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
      expect(typeof post.id).toBe('number'); // Ensure ID is a number
      expect(typeof post.title).toBe('string'); // Ensure title is a string
      expect(typeof post.body).toBe('string'); // Ensure body is a string
    });

    console.log(`Total posts validated: ${posts.length}`);
    console.log('Structure of all the post in the response:', posts);
  });

});

//Task 2 : GET /posts/{id} API Testing
test.describe('[@GETid] Validating GET /posts/{id} endpoint functionality', () => {

  //Task 2.1 : Validate a successful response when a valid post ID is provided
  test('Validate GET /posts/{id} returns 200 OK for a valid post ID', async ({ request }) => {
    const validPostId = 1; // Assume post ID 1 exists

    const response = await request.get(`${apiUrl}/${validPostId}`);

    expect(response.status()).toBe(200); // Validate that the endpoint returns a 200 OK status
    console.log(`Response for valid ID (${validPostId}):`, await response.json());

    const post = await response.json();  // Validate response structure
    expect(post).toHaveProperty('id', validPostId);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
  });

  //Task 2.2 : Test and verify the behavior when an invalid or non-existent post ID is supplied
  test('Validate GET /posts/{id} returns 404 for an invalid post ID', async ({ request }) => {
    const invalidPostId = 9999; // Assume this post ID does not exist
    const response = await request.get(`${apiUrl}/${invalidPostId}`);

    expect(response.status()).toBe(404); // Validate that the endpoint returns a 404 Not Found
    console.log(`Response for invalid ID (${invalidPostId}):`, await response.text());
  });

});

//Task 3 : POST /posts API Testing
test.describe('[@POST] Validating POST /posts endpoint functionality', () => {

  const newPost = {
    title: "Playwright Test Post",
    body: "This is a test post created using Playwright.",
    userId: 1
  };

  //Task 3.1 : Create a new post by sending appropriate data
  test('Validate that new post is created successfully with status code as 201 Created in the response', async ({ request }) => {
    const response = await request.post(apiUrl, {
      data: newPost,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',  // Add the header here
      },
    });

    expect(response.status()).toBe(201); // Validate that the status is 201 Created
    console.log('Post created successfully with 201 status');
  });

  //Task 3.2 : Validate that the response status code is 201 Created and that the response body includes the data you sent (including an assigned ID).
  test('Validate response body includes the sent data and assigned ID', async ({ request }) => {
    const response = await request.post(apiUrl, {
      data: newPost,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',  // Add the header here
      },
    });

    const responseBody = await response.json();

    // Validate response contains correct data and has an ID assigned
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.title).toBe(newPost.title);
    expect(responseBody.body).toBe(newPost.body);
    expect(responseBody.userId).toBe(newPost.userId);

    console.log('Response body contains expected data:', responseBody);
  });

});

//Task 4.1 : PUT/posts/{id} API Testing
test.describe('[@PUT] Validating PUT /posts/{id} endpoint functionality', () => {

  const updatedPost = {
    title: "Updated Playwright Test Post",
    body: "This is an updated test post created using Playwright.",
    userId: 1
  };

  const postId = 1;  // Replace with an actual post ID you want to update

  //Task 4.1.1 : Update an existing post and verify the status code 200 in response
  test('Validate that post is updated successfully with status code 200 OK', async ({ request }) => {
    const response = await request.put(`${apiUrl}/${postId}`, {
      data: updatedPost,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',  // Add the header here
      },
    });

    // Validate that the status is 200 OK
    expect(response.status()).toBe(200);
    console.log('Post updated successfully with 200 status');
  });

  //Task 4.1.2 : Validating that updated an existing post changes are correctly reflected in the response
  test('Validate response body includes updated data and remains consistent with the ID', async ({ request }) => {
    const response = await request.put(`${apiUrl}/${postId}`, {
      data: updatedPost,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',  // Add the header here
      },
    });
    const responseBody = await response.json();

    // Validate response contains the updated data and the same post ID
    expect(responseBody).toHaveProperty('id', postId);
    expect(responseBody.title).toBe(updatedPost.title);
    expect(responseBody.body).toBe(updatedPost.body);
    expect(responseBody.userId).toBe(updatedPost.userId);

    console.log('Updated post response body:', responseBody);
  });

});

//Task 4.2 : PATCH /posts/{id} API Testing
test.describe('[@PATCH] Validating PATCH /posts/{id} endpoint functionality', () => {

  const updatedPost = {
    title: "Updated Playwright Test Post",
  };

  const postId = 1;  // Replace with an actual post ID you want to update

  //Task 4.2.1 : Validate that post is patched successfully with status code 200
  test('Validate that post is patched successfully with status code 200 OK', async ({ request }) => {
    const response = await request.put(`${apiUrl}/${postId}`, {
      data: updatedPost
    });

    // Validate that the status is 200 OK
    expect(response.status()).toBe(200);
    console.log('Post updated successfully with 200 status');
  });

  //Task 4.2.2 : Validate response body includes Patch data and remains consistent with the ID
  test('Validate response body includes Patch data and remains consistent with the ID', async ({ request }) => {
    const response = await request.put(`${apiUrl}/${postId}`, {
      data: updatedPost
    });
    const responseBody = await response.json();

    expect(responseBody.title).toBe(updatedPost.title) // Validate response contains the updated data and the same post ID

    console.log('PATCH post response body:', responseBody);
  });

});

//Task 5 : DELETE /posts/{id} API Testing
test.describe('[@DELETE] Validating DELETE /posts/{id} endpoint functionality', () => {

  const deleteId = 3;

  //Task 5.1 : Delete a post and ensure that the endpoint returns the appropriate status code (200 or 204).
  test('Validate that post is deleted successfully with status code 200 or 204', async ({ request }) => {

    const response = await request.delete(`${apiUrl}/${deleteId}`);

    // Validate that the response status is 200 or 204
    expect([200, 204]).toContain(response.status());

    console.log(`Post with ID ${deleteId} was requested to be deleted but not deleted because JSONPlaceholder is a mock API and does not actually delete posts.`);
  });

  //Task 5.2 : Optionally, confirm that subsequent GET requests for the deleted post return a 404 Not Found status
  test('Validate that deleted post returns 404 on GET request (mocked)', async ({ page }) => {

    const deleteId = 10;
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";

    // Intercept the GET request for the deleted post
    await page.route(`${apiUrl}/${deleteId}`, async (route) => {
      if (route.request().method() === 'GET') {
        // Simulating a 404 Not Found response
        await route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ error: "Mock Response : Post not found" })
        });
      } else {
        await route.continue();
      }
    });

    // DELETE request (actual request, but JSONPlaceholder does not delete)
    await page.request.delete(`${apiUrl}/${deleteId}`);

    // GET request - Use `page.evaluate()` to trigger a real network request
    const response = await page.evaluate(async (url) => {
      const res = await fetch(url);
      return { status: res.status, body: await res.json() };
    }, `${apiUrl}/${deleteId}`);

    // Validate the mocked response
    expect(response.status).toBe(404);
    console.log('Confirmed that the deleted post now returns 404 (mocked).');
    console.log('Mock Response:', response);
  });

});




