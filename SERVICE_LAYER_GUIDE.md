# Service Layer Documentation

## Overview

This application uses a centralized service layer with axios for all API interactions. This ensures consistent error handling, authentication management, and cleaner component code.

## Service Files

### 1. **api.js** - Base Configuration
Configures axios with:
- Base URL from environment variables
- Request timeout (10 seconds)
- Authentication token injection via interceptors
- Automatic 401 error handling (redirects to login)

```javascript
import { api } from '@/services';

// The api instance automatically includes the auth token
```

### 2. **authService.js** - Authentication
Handles user authentication operations:

```javascript
import { authService } from '@/services';

// Sign in
const { data } = await authService.signin(username, password);
localStorage.setItem('authToken', data.jwtToken);

// Register
await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securePassword123',
});

// Check authentication
const isAuth = authService.isAuthenticated();

// Logout
authService.logout();

// Get current user token
const token = authService.getToken();

// Get current username
const username = authService.getCurrentUsername();
```

### 3. **studentService.js** - Student Management
Handles all student-related operations:

```javascript
import { studentService } from '@/services';

// Get all students with pagination
const { data } = await studentService.getStudents({
  page: 1,
  pageSize: 20,
  search: 'John'
});

// Get specific student by ID
const { data: student } = await studentService.getStudentById(studentId);

// Create new student
await studentService.createStudent({
  name: 'Jane Doe',
  email: 'jane@example.com',
  className: 'Grade 10',
  rollNo: 42,
  phone: '1234567890',
});

// Update student
await studentService.updateStudent(studentId, {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
});

// Delete student
await studentService.deleteStudent(studentId);

// Bulk operations
await studentService.bulkCreateStudents([
  { name: 'Student 1', email: 'student1@example.com' },
  { name: 'Student 2', email: 'student2@example.com' },
]);

await studentService.bulkDeleteStudents([id1, id2, id3]);
```

### 4. **profileService.js** - User Profile Management
Handles profile operations:

```javascript
import { profileService } from '@/services';

// Get specific user profile
const { data: profile } = await profileService.getProfile('username');

// Get current user profile
const { data: myProfile } = await profileService.getCurrentProfile();

// Update profile
await profileService.updateProfile({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
});

// Upload profile picture
const formData = new FormData();
formData.append('image', imageFile);
await profileService.uploadProfilePicture(imageFile);

// Change password
await profileService.changePassword(
  'oldPassword123',
  'newPassword456'
);

// Get user activity
const { data: activity } = await profileService.getActivity();
```

### 5. **dashboardService.js** - Dashboard Data
Handles dashboard statistics and data:

```javascript
import { dashboardService } from '@/services';

// Get stats
const { data } = await dashboardService.getStats();
// Returns: { studentCount, teacherCount, classCount }

// Get recent students
const { data: students } = await dashboardService.getRecentStudents({
  limit: 5
});

// Get events
const { data: events } = await dashboardService.getUpcomingEvents({
  limit: 10
});

// Get overview
const { data: overview } = await dashboardService.getOverview();

// Get user activity
const { data: activity } = await dashboardService.getUserActivity();
```

### 6. **errorHandler.js** - Error Handling Utilities
Provides consistent error handling:

```javascript
import { 
  handleApiError, 
  isValidationError, 
  isUnauthorizedError,
  isForbiddenError,
  isNotFoundError,
} from '@/services';

try {
  const { data } = await studentService.getStudents();
} catch (error) {
  const errorInfo = handleApiError(error);
  console.log(errorInfo.message); // User-friendly message
  console.log(errorInfo.code);    // Error code
  console.log(errorInfo.statusCode); // HTTP status code
  
  // Check error type
  if (isValidationError(error)) {
    // Handle validation error
  }
  if (isUnauthorizedError(error)) {
    // Handle unauthorized (401)
  }
  if (isNotFoundError(error)) {
    // Handle not found (404)
  }
}
```

## Component Examples

### Example 1: Login Component
```javascript
import { authService, handleApiError } from '@/services';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      isLoading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      try {
        const { data } = await authService.signin(this.username, this.password);
        localStorage.setItem('authToken', data.jwtToken);
        this.$router.push('/dashboard');
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.error = errorInfo.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
```

### Example 2: Student List Component
```javascript
import { studentService, handleApiError } from '@/services';

export default {
  data() {
    return {
      students: [],
      isLoading: true,
      error: '',
    };
  },
  created() {
    this.loadStudents();
  },
  methods: {
    async loadStudents() {
      try {
        const { data } = await studentService.getStudents({ page: 1 });
        this.students = data;
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.error = errorInfo.message;
      } finally {
        this.isLoading = false;
      }
    },
    
    async deleteStudent(studentId) {
      try {
        await studentService.deleteStudent(studentId);
        this.students = this.students.filter(s => s.id !== studentId);
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.error = errorInfo.message;
      }
    }
  }
};
```

### Example 3: Profile Edit Component
```javascript
import { profileService, handleApiError } from '@/services';

export default {
  data() {
    return {
      profile: { name: '', email: '' },
      isLoading: true,
      isSaving: false,
      message: '',
    };
  },
  created() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      try {
        const { data } = await profileService.getCurrentProfile();
        this.profile = data;
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.message = errorInfo.message;
      } finally {
        this.isLoading = false;
      }
    },
    
    async saveProfile() {
      this.isSaving = true;
      try {
        await profileService.updateProfile(this.profile);
        this.message = 'Profile updated successfully!';
      } catch (error) {
        const errorInfo = handleApiError(error);
        this.message = errorInfo.message;
      } finally {
        this.isSaving = false;
      }
    }
  }
};
```

## Environment Configuration

Create a `.env` file in the project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api/v1

# Other settings
VITE_APP_NAME=School Management
VITE_APP_VERSION=1.0.0
```

## Key Features

### ✅ Automatic Token Injection
- Auth token is automatically added to all requests
- No need to manually include Authorization header

### ✅ Error Handling
- Consistent error responses across all services
- Automatic 401 redirect to login
- User-friendly error messages

### ✅ Timeout Protection
- Default 10-second timeout for all requests
- Prevents hanging requests

### ✅ Centralized Configuration
- Single source of truth for API configuration
- Easy to switch between environments

## Best Practices

1. **Always use services** - Don't use fetch() or axios directly
2. **Handle errors properly** - Use handleApiError() utility
3. **Check authentication** - Use authService.isAuthenticated()
4. **Cache locally** - Store important data in localStorage
5. **Show loading states** - Let users know when data is loading
6. **Validate input** - Validate form data before submission
7. **Use environment variables** - Never hardcode API URLs

## Migration from Fetch to Services

### Before:
```javascript
const res = await fetch('http://localhost:8080/api/v1/students', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  }
});
const data = await res.json();
```

### After:
```javascript
import { studentService } from '@/services';

const { data } = await studentService.getStudents();
```

## Troubleshooting

### 401 Unauthorized
- Check if token is stored: `localStorage.getItem('authToken')`
- Token may be expired - user will be redirected to login automatically

### CORS Issues
- Ensure backend allows CORS
- Check API base URL in .env

### Network Timeout
- Increase timeout in api.js if needed
- Check backend server status

### Missing Error Messages
- Use handleApiError() to get proper error info
- Check network tab in DevTools

---

For more information, refer to the individual service files in `src/services/`.
