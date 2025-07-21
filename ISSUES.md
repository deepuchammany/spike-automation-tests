# 🐛 Issues Found During Testing

This document lists any issues or inconsistencies observed while working with the AutomationExercise site.

---

## 1. `POST /api/createAccount` - Content-Type Mismatch
- This endpoint requires `application/x-www-form-urlencoded`.
- Sending JSON causes a `400 Bad Request`.

✅ *Workaround:* Form-encoded data was used in the request.

---

## 2. `GET /api/getUserDetailByEmail` - Response is not auto-parsed
- The API returns `text/plain` instead of `application/json`.
- Cypress does not automatically parse such responses.

✅ *Workaround:* Used `JSON.parse(response.body)` manually to parse and assert.

---

## 3. Undocumented But Working Account Deletion API
- While not listed clearly in the public API docs, the `DELETE /api/deleteAccount` endpoint **works correctly** for removing test users after execution.

📌 *Note:* Tests use this endpoint for cleanup to ensure backend stays uncluttered.

---

## 4. UI Elements Sometimes Require Extra Waits
- Some UI elements (like form inputs, modals) appear with a slight delay.

✅ *Mitigation:* Added assertions (`.should('be.visible')`) and appropriate waits where necessary.

---

## 5. Checkout Flow Has Hardcoded Defaults
- Country, address, and other details are not prefilled or saved across sessions.
- All info must be re-entered after each registration.
