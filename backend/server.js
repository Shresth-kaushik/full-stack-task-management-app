const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const path = require('path')


const app = express();
const PORT = process.env.PORT || 5002;

// CORS configuration
app.use(cors({
  origin: 'https://full-stack-task-management-app.onrender.com', // Replace with your frontend URL
  credentials: true
}));

app.use(express.json());

const _dirname = path.resolve()


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(express.static(path.join(_dirname , "/frontend/build")))
app.use('*' , (req, res)=>{
  res.sendFile(path.resolve(_dirname , "frontend" , "build" , "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

