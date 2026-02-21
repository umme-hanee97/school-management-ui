# API Endpoints Reference

## Base URL
```
http://localhost:8080/api/v1
```

---

## Authentication Endpoints

### Sign In
```javascript
POST /auth/signin
Body: { username, password }
Returns: { jwtToken, username, email }

Usage:
const { data } = await authService.signin(username, password);
```

### Sign Up / Register
```javascript
POST /auth/signup
Body: { name, email, password }
Returns: { id, username, email, createdAt }

Usage:
const { data } = await authService.register({ name, email, password });
```

---

## Student Endpoints

### Get All Students
```javascript
GET /students?page=1&pageSize=20&search=...
Returns: [{ id, name, email, className, rollNo, status }, ...]

Usage:
const { data } = await studentService.getStudents({ 
  page: 1, 
  pageSize: 20,
  search: 'John'
});
```

### Get Student by ID
```javascript
GET /students/{studentId}
Returns: { id, name, email, className, rollNo, phone, status, createdAt }

Usage:
const { data } = await studentService.getStudentById(123);
```

### Create Student
```javascript
POST /students
Body: { 
  name, 
  email, 
  classId, 
  sectionId, 
  rollNo, 
  phone?, 
  photo?
}
Returns: { id, name, email, createdAt }

Usage:
const { data } = await studentService.createStudent({
  name: 'John Doe',
  email: 'john@example.com',
  classId: 1,
  sectionId: 1,
  rollNo: 42
});
```

### Update Student
```javascript
PUT /students/{studentId}
Body: { name, email, classId, sectionId, rollNo, phone, ... }
Returns: { id, name, email, updatedAt }

Usage:
const { data } = await studentService.updateStudent(123, {
  name: 'Jane Doe',
  email: 'jane@example.com'
});
```

### Delete Student
```javascript
DELETE /students/{studentId}
Returns: { success: true, message: 'Student deleted' }

Usage:
const { data } = await studentService.deleteStudent(123);
```

### Bulk Create Students
```javascript
POST /students/bulk
Body: [{ name, email, classId, ... }, { ... }, ...]
Returns: { created: 5, failed: 0, details: [...] }

Usage:
const { data } = await studentService.bulkCreateStudents([
  { name: 'Student 1', email: '...' },
  { name: 'Student 2', email: '...' }
]);
```

### Bulk Delete Students
```javascript
POST /students/bulk-delete
Body: { ids: [1, 2, 3, ...] }
Returns: { deleted: 3, failed: 0 }

Usage:
const { data } = await studentService.bulkDeleteStudents([1, 2, 3]);
```

---

## Profile Endpoints

### Get Profile by Username
```javascript
GET /profile/{username}
Returns: { id, name, email, phone, role, bio, avatar, createdAt }

Usage:
const { data } = await profileService.getProfile('john_doe');
```

### Get Current User Profile
```javascript
GET /profile/me
Headers: Authorization: Bearer <token>
Returns: { id, name, email, phone, role, bio, avatar }

Usage:
const { data } = await profileService.getCurrentProfile();
```

### Update Profile
```javascript
PUT /profile
Headers: Authorization: Bearer <token>
Body: { 
  firstName?, 
  lastName?, 
  email?, 
  phone?, 
  bio?, 
  ... 
}
Returns: { id, name, email, updatedAt }

Usage:
const { data } = await profileService.updateProfile({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890'
});
```

### Upload Profile Picture
```javascript
POST /profile/picture
Headers: Authorization: Bearer <token>
        Content-Type: multipart/form-data
Body: FormData with 'image' field
Returns: { url, uploadedAt }

Usage:
const { data } = await profileService.uploadProfilePicture(imageFile);
```

### Change Password
```javascript
POST /profile/change-password
Headers: Authorization: Bearer <token>
Body: { currentPassword, newPassword }
Returns: { success: true, message: 'Password changed' }

Usage:
const { data } = await profileService.changePassword('oldPass123', 'newPass456');
```

### Get User Activity
```javascript
GET /profile/activity
Headers: Authorization: Bearer <token>
Returns: [{ action, timestamp, details }, ...]

Usage:
const { data } = await profileService.getActivity();
```

---

## Dashboard Endpoints

### Get Statistics
```javascript
GET /dashboard/stats
Headers: Authorization: Bearer <token>
Returns: { 
  studentCount: 1250,
  teacherCount: 58,
  classCount: 32,
  totalClasses: 32,
  totalEnrollments: 1250
}

Usage:
const { data } = await dashboardService.getStats();
```

### Get Recent Students
```javascript
GET /dashboard/recent-students?limit=10
Headers: Authorization: Bearer <token>
Returns: [
  { id, name, email, className, status, enrolledDate },
  ...
]

Usage:
const { data } = await dashboardService.getRecentStudents({ limit: 5 });
```

### Get Upcoming Events
```javascript
GET /dashboard/events?limit=10
Headers: Authorization: Bearer <token>
Returns: [
  { id, title, description, date, time, location },
  ...
]

Usage:
const { data } = await dashboardService.getUpcomingEvents({ limit: 10 });
```

### Get System Overview
```javascript
GET /dashboard/overview
Headers: Authorization: Bearer <token>
Returns: {
  totalStudents: 1250,
  totalTeachers: 58,
  totalClasses: 32,
  averageAttendance: 95.5,
  systemHealth: 'good'
}

Usage:
const { data } = await dashboardService.getOverview();
```

### Get User Activity
```javascript
GET /dashboard/activity
Headers: Authorization: Bearer <token>
Returns: [
  { id, action, userEmail, timestamp, details },
  ...
]

Usage:
const { data } = await dashboardService.getUserActivity();
```

---

## Error Response Format

All error responses follow this format:

```javascript
{
  "message": "User-friendly error message",
  "code": "ERROR_CODE",
  "statusCode": 400,
  "timestamp": "2024-12-21T10:30:45Z",
  "path": "/api/v1/students"
}
```

### Common Status Codes
- **200** - OK
- **201** - Created
- **400** - Bad Request (validation error)
- **401** - Unauthorized (token missing or invalid)
- **403** - Forbidden (user doesn't have permission)
- **404** - Not Found
- **409** - Conflict (duplicate entry)
- **500** - Internal Server Error

---

## Success Response Format

All successful responses follow this format:

```javascript
{
  "data": { /* response data */ },
  "success": true,
  "timestamp": "2024-12-21T10:30:45Z"
}
```

Or for array responses:

```javascript
{
  "data": [ /* array of items */ ],
  "page": 1,
  "pageSize": 20,
  "total": 100,
  "hasMore": true
}
```

---

## Authentication Header

All authenticated endpoints require:

```
Authorization: Bearer <jwtToken>
```

The JWT token is stored in localStorage:

```javascript
localStorage.getItem('authToken')
```

**Automatic Injection:** The axios instance automatically adds this header to all requests. No need to manually add it.

---

## Rate Limiting

- Default: 100 requests per minute
- Burst: 1000 requests per hour
- Headers will include: `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Pagination

List endpoints support pagination:

```javascript
GET /endpoint?page=1&pageSize=20

Query Parameters:
- page: 1-based page number (default: 1)
- pageSize: number of items per page (default: 20, max: 100)
- sort: field name (e.g., 'name', '-createdAt' for desc)
- search: search query string
```

---

## Filtering

Endpoints support filtering:

```javascript
GET /students?className=Grade10&status=Active&rollNo=42

Common filters:
- status: 'Active', 'Inactive', 'Pending'
- className: 'Grade 9', 'Grade 10', etc.
- sector: 'A', 'B', 'C'
```

---

## Sorting

Response can be sorted:

```javascript
GET /students?sort=name          // Ascending
GET /students?sort=-name         // Descending
GET /students?sort=-createdAt    // Latest first

Common sort fields:
- name
- email
- createdAt
- updatedAt
- className
```

---

## CORS & Headers

Required headers:

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token> (if authenticated)
```

---

## Webhook Endpoints (Optional)

Some endpoints may support webhooks:

```javascript
POST /webhooks/register
Body: {
  url: 'https://your-domain.com/webhook',
  events: ['student.created', 'student.deleted'],
  active: true
}
```

---

## Testing Endpoints

### Using cURL
```bash
# Sign in
curl -X POST http://localhost:8080/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# Get students (with token)
curl -X GET http://localhost:8080/api/v1/students \
  -H "Authorization: Bearer eyJhbGc..."
```

### Using Axios (in component)
```javascript
import { studentService } from '@/services';

const { data } = await studentService.getStudents({ page: 1 });
console.log(data);
```

### Using Service Layer (Recommended)
```javascript
import { studentService, handleApiError } from '@/services';

try {
  const { data } = await studentService.getStudents();
  console.log(data);
} catch (error) {
  const errorInfo = handleApiError(error);
  console.error(errorInfo.message);
}
```

---

## API Documentation

For backend API documentation, refer to:
- Backend service documentation
- Postman collection (if available)
- Swagger/OpenAPI docs (if enabled)

---

## Deprecated Endpoints

None currently. All endpoints are active and supported.

---

## Versioning

Current API Version: **v1**
Base URL: `http://localhost:8080/api/v1`

Future versions will use:
- `http://localhost:8080/api/v2` (if needed)

---

## Environment Variables

```env
# Required
VITE_API_BASE_URL=http://localhost:8080/api/v1

# Optional
VITE_API_TIMEOUT=10000          # milliseconds
VITE_MAX_RETRIES=3              # number of retries
VITE_RETRY_DELAY=1000           # milliseconds
```

---

**Last Updated:** February 21, 2026
**API Version:** v1
**Status:** Stable
