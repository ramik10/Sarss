const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = "campus_konnect_secret_key_143";

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/');
    console.log("MongoDB Successfully Connected");
  } catch (err) {
    console.log("MongoDB Connection Error: ", err);
    process.exit(1);
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'college', 'company'], required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Student Profile Schema
const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  year: { type: String },
  cgpa: { type: Number, default: 0 },
  attendance: { type: Number, default: 0 },
  contactInformation: { type: String },
  currentSubjects: [{
    name: String,
    grade: String,
    progress: Number,
    credits: Number
  }],
  achievements: [{
    title: String,
    date: Date,
    description: String
  }],
  blogPosts: [{
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [{ 
      text: String, 
      date: { type: Date, default: Date.now },
      author: String 
    }]
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Company Schema
const companySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  industry: { type: String },
  hrName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  address: { type: String },
  jobPostings: [{
    title: String,
    description: String,
    requirements: [String],
    salary: String,
    location: String,
    type: { type: String, enum: ['full-time', 'part-time', 'internship'] },
    postedDate: { type: Date, default: Date.now },
    deadline: Date,
    isActive: { type: Boolean, default: true }
  }],
  appliedStudents: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile' },
    jobId: String,
    appliedDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['applied', 'shortlisted', 'rejected', 'selected'], default: 'applied' }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
const Company = mongoose.model('Company', companySchema);

// Initialize default users
async function initializeDefaultUsers() {
  try {
    const defaultUsers = [
      { username: 'sayantan', password: 'sayan123', role: 'student', email: 'sayantan@student.gcelt.ac.in' },
      { username: 'gcelt', password: 'gceltadmin', role: 'college', email: 'admin@gcelt.ac.in' },
      { username: 'tcs', password: 'tcs123', role: 'company', email: 'hr@tcs.com' }
    ];

    for (let userData of defaultUsers) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({ ...userData, password: hashedPassword });
        await user.save();
        console.log(`Default ${userData.role} user created: ${userData.username}`);
      }
    }
  } catch (error) {
    console.log('Error initializing default users:', error);
  }
}

// Authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  
  if (!token) {
    return res.status(401).json({ message: 'No authorization token provided' });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error during authentication' });
    }
  });
}

// Role authorization middleware
function authorize(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied for this role' });
    }
    next();
  };
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Campus Konnect Backend is running',
    timestamp: new Date().toISOString()
  });
});

// AUTH ROUTES
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { username, password, role, email } = req.body;

    if (!username || !password || !role || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role, email });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// STUDENT ROUTES
app.get('/student/profile', authenticate, authorize(['student']), async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/student/profile', authenticate, authorize(['student']), async (req, res) => {
  try {
    const profileData = { ...req.body, userId: req.user._id, updatedAt: new Date() };
    
    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user._id },
      profileData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating student profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/student/dashboard', authenticate, authorize(['student']), async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.json({
        message: 'Profile not found',
        profileExists: false,
        user: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          role: req.user.role
        }
      });
    }

    const dashboardData = {
      profileExists: true,
      student: profile,
      recentAchievements: profile.achievements.slice(-3),
      upcomingAssignments: [],
      notifications: []
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// COLLEGE ADMIN ROUTES
app.get('/college/dashboard', authenticate, authorize(['college']), async (req, res) => {
  try {
    const students = await StudentProfile.find({}).populate('userId', 'username email');
    const totalStudents = students.length;
    
    const departmentStats = {};
    const yearStats = {};
    
    students.forEach(student => {
      if (student.department) {
        departmentStats[student.department] = (departmentStats[student.department] || 0) + 1;
      }
      
      if (student.year) {
        yearStats[student.year] = (yearStats[student.year] || 0) + 1;
      }
    });

    const studentInfo = students.map(student => ({
      id: student._id,
      fullName: student.fullName,
      studentId: student.studentId,
      department: student.department,
      year: student.year,
      semester: student.semester,
      cgpa: student.cgpa,
      attendance: student.attendance,
      email: student.email
    }));

    res.json({
      totalStudents,
      departmentStats,
      yearStats,
      studentInfo,
      recentRegistrations: students.slice(-5)
    });
  } catch (error) {
    console.error('Error fetching college dashboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/college/students', authenticate, authorize(['college']), async (req, res) => {
  try {
    const studentData = req.body;
    
    const hashedPassword = await bcrypt.hash(studentData.password || 'student123', 10);
    const user = new User({
      username: studentData.username || studentData.studentId,
      password: hashedPassword,
      role: 'student',
      email: studentData.email
    });
    await user.save();

    const studentProfile = new StudentProfile({
      ...studentData,
      userId: user._id
    });
    await studentProfile.save();

    res.status(201).json({ 
      message: 'Student added successfully', 
      student: studentProfile 
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/college/students', authenticate, authorize(['college']), async (req, res) => {
  try {
    const students = await StudentProfile.find({}).populate('userId', 'username email');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// COMPANY ROUTES
app.get('/company/dashboard', authenticate, authorize(['company']), async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.json({
        message: 'Company profile not found',
        profileExists: false,
        user: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          role: req.user.role
        }
      });
    }

    const totalJobs = company.jobPostings.length;
    const activeJobs = company.jobPostings.filter(job => job.isActive).length;
    const totalApplications = company.appliedStudents.length;
    
    res.json({
      profileExists: true,
      company,
      stats: {
        totalJobs,
        activeJobs,
        totalApplications
      },
      recentJobs: company.jobPostings.slice(-5),
      recentApplications: company.appliedStudents.slice(-10)
    });
  } catch (error) {
    console.error('Error fetching company dashboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/company/profile', authenticate, authorize(['company']), async (req, res) => {
  try {
    const companyData = { ...req.body, userId: req.user._id };
    
    const company = await Company.findOneAndUpdate(
      { userId: req.user._id },
      companyData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ message: 'Company profile updated successfully', company });
  } catch (error) {
    console.error('Error updating company profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/company/jobs', authenticate, authorize(['company']), async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company profile not found' });
    }

    const jobData = {
      ...req.body,
      postedDate: new Date()
    };

    company.jobPostings.push(jobData);
    await company.save();

    res.status(201).json({ message: 'Job posted successfully', job: jobData });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/company/students', authenticate, authorize(['company']), async (req, res) => {
  try {
    const students = await StudentProfile.find({})
      .populate('userId', 'username email')
      .select('fullName studentId department year cgpa email achievements');
    
    res.json(students);
  } catch (error) {
    console.error('Error fetching students for company:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
async function startServer() {
  try {
    await connectDB();
    await initializeDefaultUsers();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log('Default users created successfully');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();