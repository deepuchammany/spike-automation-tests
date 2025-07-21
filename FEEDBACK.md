
# FEEDBACK.md

## Feedback on Automation Exercise API Testing

### 1. Account Deletion API Exists
- Contrary to initial assumption, a working `DELETE /api/deleteAccount` endpoint is available.
- It correctly accepts form data (`email` and `password`) and responds with a success message.

👍 *Commendation:* It's great that Automation Exercise provides this endpoint, allowing clean test cycles without polluting the user database.

🛠️ *Suggestion:* Document this endpoint clearly in the [API documentation](https://automationexercise.com/api_list) as it's not explicitly listed there.

### 2. API Consistency & Documentation
- Some API responses are plain strings instead of JSON (e.g., `POST /api/verifyLogin`), requiring manual parsing via `JSON.parse()`.

🛠️ *Suggestion:* Standardize all responses as JSON to simplify client handling and parsing.

### 3. Unclear Email Validation Logic
- Email uniqueness constraint is not documented, but test failures imply it’s enforced silently.

📌 *Suggestion:* Add explicit email uniqueness validation in documentation or error responses.

### 4. Error Handling Could Be Clearer
- When login or registration fails, the response code is `200` with a plain text error message, which is misleading.

🛠️ *Suggestion:* Return appropriate HTTP status codes like `400` or `409` with structured JSON error bodies.
