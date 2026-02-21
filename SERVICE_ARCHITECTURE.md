# Service Architecture Diagram

## Service Layer Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        Components Layer                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │ login.vue    │  │ register.vue │  │ profile.vue  │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │profile-      │  │ dashboard.vue│  │add-student   │            │
│  │edit.vue      │  │              │  │.vue          │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                   │
│  ┌──────────────┐                                                │
│  │list-student  │                                                │
│  │.vue          │                                                │
│  └──────────────┘                                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
              ↓ Imports services ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Service Layer                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         src/services/index.js                            │   │
│  │  Centralized exports for all services                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│       ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓                                            │
│                                                                   │
│  ┌────────────────────┐  ┌────────────────────┐                 │
│  │ authService        │  │ studentService     │                 │
│  │ ├─ signin()        │  │ ├─ getStudents()   │                 │
│  │ ├─ register()      │  │ ├─ getStudentById()│                 │
│  │ ├─ logout()        │  │ ├─ createStudent() │                 │
│  │ └─ isAuth()        │  │ ├─ updateStudent() │                 │
│  └────────────────────┘  │ └─ deleteStudent() │                 │
│                           └────────────────────┘                 │
│  ┌────────────────────┐  ┌────────────────────┐                 │
│  │ profileService     │  │ dashboardService   │                 │
│  │ ├─ getProfile()    │  │ ├─ getStats()      │                 │
│  │ ├─ updateProfile() │  │ ├─ getRecentStudents()             │
│  │ ├─ uploadPicture() │  │ ├─ getUpcomingEvents()             │
│  │ └─ changePassword()│  │ └─ getOverview()   │                 │
│  └────────────────────┘  └────────────────────┘                 │
│                                                                   │
│  ┌────────────────────┐  ┌────────────────────┐                 │
│  │ validationService  │  │ errorHandler       │                 │
│  │ ├─ isValidEmail()  │  │ ├─ handleApiError()│                 │
│  │ ├─ validatePassword│  │ ├─ isValidError()  │                 │
│  │ └─ validateForm()  │  │ └─ is401Error()    │                 │
│  └────────────────────┘  └────────────────────┘                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
              ↓ Uses ↓
┌─────────────────────────────────────────────────────────────────┐
│                     API Layer (api.js)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Axios Instance with:                                            │
│  ├─ Base URL: VITE_API_BASE_URL                                 │
│  ├─ Timeout: 10 seconds                                          │
│  ├─ Request Interceptor: Auto token injection                    │
│  └─ Response Interceptor: Error handling & 401 redirect         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
              ↓ Makes HTTP Calls ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Backend API                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Base URL: http://localhost:8080/api/v1                         │
│                                                                   │
│  Endpoints:                                                       │
│  ├─ POST   /auth/signin                                          │
│  ├─ POST   /auth/signup                                          │
│  ├─ GET    /students                                             │
│  ├─ POST   /students                                             │
│  ├─ GET    /profile/me                                           │
│  ├─ PUT    /profile                                              │
│  ├─ GET    /dashboard/stats                                      │
│  └─ ... more endpoints                                           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Example: Login

```
User enters credentials
        ↓
login.vue component
        ↓
handleLogin() method calls authService.signin()
        ↓
authService.signin() makes API call using api.js
        ↓
api.js request interceptor adds Authorization header
        ↓
GET http://localhost:8080/api/v1/auth/signin → Backend
        ↓
Backend returns {jwtToken, username, email}
        ↓
api.js response interceptor checks status
        ↓
Data returned to component
        ↓
Component stores token in localStorage
        ↓
Router redirects to /dashboard
```

---

## Data Flow Example: Load Students

```
User navigates to /students
        ↓
list-student.vue component created
        ↓
created() hook calls loadStudents()
        ↓
loadStudents() calls studentService.getStudents({page: 1})
        ↓
studentService makes api.get('/students') call
        ↓
api.js request interceptor adds token header
        ↓
GET http://localhost:8080/api/v1/students → Backend
        ↓
Backend returns array of students
        ↓
api.js response interceptor processes response
        ↓
Data returned to component
        ↓
Component updates this.students
        ↓
Template re-renders with student list
```

---

## Error Handling Flow

```
API call made with try-catch
        ↓
Error occurs (4xx or 5xx)
        ↓
api.js response interceptor catches it
        ↓
For 401: localStorage.removeItem('authToken') + redirect /login
        ↓
For other errors: pass error to catch block
        ↓
Component catch block calls handleApiError(error)
        ↓
handleApiError() returns {message, code, statusCode}
        ↓
Component displays user-friendly error message
```

---

## Service Dependency Graph

```
All Components
    ↓
index.js (Centralized Exports)
    ↓
    ├─→ authService     ─→ api
    ├─→ studentService  ─→ api
    ├─→ profileService  ─→ api
    ├─→ dashboardService─→ api
    ├─→ validationService (standalone)
    └─→ errorHandler (standalone)
        ↓
    api.js (Axios with interceptors)
        ↓
    HTTP Requests to Backend
```

---

## File Relationships

```
src/
├── services/
│   ├── index.js ──────────────────── Exports all services
│   ├── api.js ─────────────────────── Base axios config
│   ├── authService.js
│   │   └─ uses api.js
│   ├── studentService.js
│   │   └─ uses api.js
│   ├── profileService.js
│   │   └─ uses api.js
│   ├── dashboardService.js
│   │   └─ uses api.js
│   ├── validationService.js (standalone)
│   └── errorHandler.js (standalone)
│
├── components/
│   └── security/
│       ├── login.vue ────────────────→ uses authService, handleApiError
│       └── register.vue ─────────────→ uses authService, handleApiError
│
└── views/
    ├── dashboard.vue ───────────────→ uses dashboardService, handleApiError
    ├── profile.vue ──────────────────→ uses profileService, handleApiError
    ├── profile-edit.vue ────────────→ uses profileService, handleApiError
    └── student/
        ├── add-student.vue ────────→ uses studentService, handleApiError
        └── list-student.vue ───────→ uses studentService, handleApiError
```

---

## Component to Service Mapping

| Component | Services Used |
|-----------|---------------|
| login.vue | authService |
| register.vue | authService |
| profile.vue | profileService |
| profile-edit.vue | profileService |
| dashboard.vue | dashboardService |
| add-student.vue | studentService, validationService |
| list-student.vue | studentService, handleApiError |

---

## Request/Response Cycle

```
┌─────────────────────────────────────────────────────┐
│ Component (e.g., login.vue)                         │
│ ├─ Import: authService, handleApiError              │
│ └─ Call: authService.signin(username, password)     │
└────┬────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────────┐
│ Service (authService.js)                            │
│ ├─ Receives: username, password                     │
│ ├─ Format: POST request data                        │
│ └─ Call: api.post('/auth/signin', {...})            │
└────┬────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────────┐
│ Request Interceptor (api.js)                        │
│ ├─ Read: authToken from localStorage                │
│ ├─ Add: Authorization: Bearer <token>               │
│ └─ Send: HTTP request                               │
└────┬────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────────┐
│ Backend API                                         │
│ POST /auth/signin                                   │
│ Returns: {jwtToken, username, email}                │
└────┬────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────────┐
│ Response Interceptor (api.js)                       │
│ ├─ Check: response.status                           │
│ ├─ If 401: logout & redirect                        │
│ └─ Return: response data                            │
└────┬────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────────┐
│ Service Handler                                     │
│ ├─ Receive: response data                           │
│ ├─ Format: if needed                                │
│ └─ Return: promise.resolve(response)                │
└────┬────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────────┐
│ Component (Component.vue)                           │
│ ├─ Receive: data in then/await                      │
│ ├─ Store: token in localStorage                     │
│ ├─ Update: component state                          │
│ └─ Render: updated UI                               │
└─────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
┌──────────────────────┐
│ User at Login Page   │
└──────────┬───────────┘
           ↓
┌──────────────────────────────────────┐
│ user inputs credentials              │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ component: handleLogin()              │
│ validates form                        │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ authService.signin(user, pass)       │
│ makes POST /auth/signin              │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Backend validates & returns JWT      │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Component receives jwtToken          │
│ localStorage.setItem(authToken, ...)  │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ router.push('/dashboard')             │
└──────────┬───────────────────────────┘
           ↓
┌──────────────────────────────────────┐
│ Dashboard loads                      │
│ api automatically includes token     │
│ in all subsequent requests           │
└──────────────────────────────────────┘
```

---

## Bootstrap Summary

1. **User navigates** to app
2. **Router guard** checks localStorage for authToken
3. **If authenticated:**
   - Allow access to protected routes
   - Services auto-include token in requests
4. **If not authenticated:**
   - Redirect to login page
5. **On logout:**
   - Storage cleared
   - Redirect to login
6. **On 401 error:**
   - Auto-redirect to login
   - Token cleared

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Reusable service methods
- ✅ Consistent error handling
- ✅ Easy to test
- ✅ Easy to scale
- ✅ Type-safe endpoint definitions
