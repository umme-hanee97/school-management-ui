# Service Layer Quick Reference

## 🎯 Services Overview

### AuthService
**File:** `src/services/authService.js`

| Method | Purpose | Usage |
|--------|---------|-------|
| `signin(username, password)` | User login | `await authService.signin('user', 'pass')` |
| `register(userData)` | User registration | `await authService.register({...})` |
| `logout()` | Clear auth token | `authService.logout()` |
| `isAuthenticated()` | Check login status | `authService.isAuthenticated()` |
| `getToken()` | Get stored JWT token | `authService.getToken()` |
| `getCurrentUsername()` | Get current user | `authService.getCurrentUsername()` |

---

### StudentService
**File:** `src/services/studentService.js`

| Method | Purpose | Usage |
|--------|---------|-------|
| `getStudents(params)` | Fetch all students | `await studentService.getStudents({page: 1})` |
| `getStudentById(id)` | Get single student | `await studentService.getStudentById(123)` |
| `createStudent(data)` | Create new student | `await studentService.createStudent({...})` |
| `updateStudent(id, data)` | Update student info | `await studentService.updateStudent(123, {...})` |
| `deleteStudent(id)` | Remove student | `await studentService.deleteStudent(123)` |
| `bulkCreateStudents(data)` | Create multiple | `await studentService.bulkCreateStudents([...])` |
| `bulkDeleteStudents(ids)` | Delete multiple | `await studentService.bulkDeleteStudents([...])` |

---

### ProfileService
**File:** `src/services/profileService.js`

| Method | Purpose | Usage |
|--------|---------|-------|
| `getProfile(username)` | Get user profile | `await profileService.getProfile('john')` |
| `getCurrentProfile()` | Get own profile | `await profileService.getCurrentProfile()` |
| `updateProfile(data)` | Update profile | `await profileService.updateProfile({...})` |
| `uploadProfilePicture(file)` | Upload photo | `await profileService.uploadProfilePicture(file)` |
| `changePassword(old, new)` | Change password | `await profileService.changePassword('old', 'new')` |
| `getActivity()` | Get user activity | `await profileService.getActivity()` |

---

### DashboardService
**File:** `src/services/dashboardService.js`

| Method | Purpose | Usage |
|--------|---------|-------|
| `getStats()` | Get dashboard stats | `await dashboardService.getStats()` |
| `getRecentStudents(params)` | Get recent students | `await dashboardService.getRecentStudents({limit: 5})` |
| `getUpcomingEvents(params)` | Get events | `await dashboardService.getUpcomingEvents({limit: 10})` |
| `getOverview()` | Get system overview | `await dashboardService.getOverview()` |
| `getUserActivity()` | Get user activity | `await dashboardService.getUserActivity()` |

---

### ValidationService
**File:** `src/services/validationService.js`

| Method | Purpose | Usage |
|--------|---------|-------|
| `isValidEmail(email)` | Validate email | `validationService.isValidEmail('test@example.com')` |
| `validatePassword(pwd)` | Check password strength | `validationService.validatePassword('Pass123!')` |
| `isRequired(value)` | Check if not empty | `validationService.isRequired(value)` |
| `minLength(value, len)` | Minimum length | `validationService.minLength(value, 3)` |
| `maxLength(value, len)` | Maximum length | `validationService.maxLength(value, 50)` |
| `isValidPhone(phone)` | Validate phone | `validationService.isValidPhone('+1234567890')` |
| `isValidUrl(url)` | Validate URL | `validationService.isValidUrl('https://...')` |
| `isInRange(value, min, max)` | Check number range | `validationService.isInRange(5, 1, 10)` |
| `isValidFileSize(file, mb)` | Check file size | `validationService.isValidFileSize(file, 5)` |
| `isValidFileType(file, types)` | Check MIME type | `validationService.isValidFileType(file, ['image/jpeg'])` |
| `isValidDate(str)` | Validate date format | `validationService.isValidDate('2024-12-31')` |
| `isPastDate(date)` | Check if past | `validationService.isPastDate(date)` |
| `isFutureDate(date)` | Check if future | `validationService.isFutureDate(date)` |
| `validateForm(data, rules)` | Validate entire form | See example below |

---

### Error Handler Utilities
**File:** `src/services/errorHandler.js`

| Function | Purpose | Usage |
|----------|---------|-------|
| `handleApiError(error)` | Format API error | `handleApiError(error)` → `{message, code, statusCode}` |
| `isValidationError(error)` | Check if 400 error | `isValidationError(error)` |
| `isUnauthorizedError(error)` | Check if 401 error | `isUnauthorizedError(error)` |
| `isForbiddenError(error)` | Check if 403 error | `isForbiddenError(error)` |
| `isNotFoundError(error)` | Check if 404 error | `isNotFoundError(error)` |

---

## 💻 Common Usage Patterns

### Pattern 1: Load Data in Created Hook
```javascript
import { studentService, handleApiError } from '@/services';

export default {
  data() {
    return { students: [], isLoading: true, error: '' };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const { data } = await studentService.getStudents();
        this.students = data;
      } catch (error) {
        this.error = handleApiError(error).message;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
```

### Pattern 2: Submit Form
```javascript
async saveForm() {
  if (!this.validateForm()) return;
  
  this.isLoading = true;
  try {
    await studentService.createStudent(this.formData);
    this.successMsg = 'Saved!';
    setTimeout(() => this.$router.push('/students'), 1500);
  } catch (error) {
    this.errorMsg = handleApiError(error).message;
  } finally {
    this.isLoading = false;
  }
}
```

### Pattern 3: Form Validation
```javascript
import { validationService } from '@/services';

methods: {
  validateForm() {
    const rules = {
      name: ['required', 'minLength:3'],
      email: ['required', 'email'],
      password: ['required', 'minLength:6'],
    };
    
    const { isValid, errors } = validationService.validateForm(this.form, rules);
    this.errors = errors;
    return isValid;
  }
}
```

### Pattern 4: Delete with Confirmation
```javascript
async deleteItem(id) {
  if (!confirm('Are you sure?')) return;
  
  try {
    await studentService.deleteStudent(id);
    this.items = this.items.filter(i => i.id !== id);
  } catch (error) {
    this.error = handleApiError(error).message;
  }
}
```

### Pattern 5: Parallel Data Loading
```javascript
async loadDashboard() {
  try {
    const [stats, students, events] = await Promise.all([
      dashboardService.getStats(),
      dashboardService.getRecentStudents(),
      dashboardService.getUpcomingEvents(),
    ]);
    
    this.stats = stats.data;
    this.students = students.data;
    this.events = events.data;
  } catch (error) {
    this.error = handleApiError(error).message;
  }
}
```

---

## 🔧 Configuration

### .env File
```env
# Required - API base URL
VITE_API_BASE_URL=http://localhost:8080/api/v1

# Optional - App metadata
VITE_APP_NAME=School Management
VITE_APP_VERSION=1.0.0
```

---

## 📋 Refactored Components

### ✅ Updated Components
- **login.vue** - Uses authService.signin()
- **register.vue** - Uses authService.register()
- **profile.vue** - Uses profileService.getProfile() & profileService.getCurrentProfile()
- **profile-edit.vue** - Uses profileService.updateProfile()
- **dashboard.vue** - Uses dashboardService for stats & data
- **add-student.vue** - Uses studentService.createStudent()
- **list-student.vue** - Uses studentService.getStudents() & studentService.deleteStudent()

---

## 🎓 Best Practices

✅ **DO:**
- Import services at top of component
- Use try-catch for all API calls
- Use handleApiError() for error messages
- Check isLoading state before showing UI
- Validate input before submission
- Handle 401 errors (auto-redirects to login)

❌ **DON'T:**
- Use fetch() directly (use services)
- Hardcode API URLs in components
- Forget error handling
- Ignore loading states
- Store passwords in localStorage

---

## 🚀 API Response Examples

### getStudents Response
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "className": "Grade 10",
      "status": "Active"
    }
  ]
}
```

### signin Response
```json
{
  "data": {
    "jwtToken": "eyJhbGc...",
    "username": "john",
    "email": "john@example.com"
  }
}
```

### Error Response
```json
{
  "message": "Student not found",
  "code": "STUDENT_NOT_FOUND",
  "statusCode": 404
}
```

---

## 📞 Support

For more detailed documentation, see [SERVICE_LAYER_GUIDE.md](./SERVICE_LAYER_GUIDE.md)
