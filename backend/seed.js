// ============================================
// SAMPLE DATA SEEDING SCRIPT
// ============================================

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Challenge from './models/Challenge.js';
import connectDB from './config/database.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Challenge.deleteMany({});

        console.log('📝 Seeding sample data...');

        // Sample challenges
        const challenges = [
            {
                title: 'Build Your First Website',
                description: 'Create a responsive personal portfolio website using HTML and CSS',
                difficulty: 'Easy',
                category: 'Web Dev',
                requiredSkills: ['HTML', 'CSS'],
                points: 50,
            },
            {
                title: 'JavaScript DOM Manipulation',
                description: 'Master DOM manipulation and event handling in JavaScript',
                difficulty: 'Easy',
                category: 'Web Dev',
                requiredSkills: ['JavaScript'],
                points: 75,
            },
            {
                title: 'React Todo App',
                description: 'Build a fully functional todo application with React',
                difficulty: 'Medium',
                category: 'Web Dev',
                requiredSkills: ['React', 'JavaScript'],
                points: 150,
            },
            {
                title: 'Node.js REST API',
                description: 'Create a complete REST API using Node.js and Express',
                difficulty: 'Medium',
                category: 'Web Dev',
                requiredSkills: ['Node.js', 'Express', 'REST'],
                points: 150,
            },
            {
                title: 'MongoDB CRUD Operations',
                description: 'Master database operations with MongoDB and Mongoose',
                difficulty: 'Medium',
                category: 'Mobile',
                requiredSkills: ['MongoDB', 'Database'],
                points: 120,
            },
            {
                title: 'Full Stack MERN Project',
                description: 'Build a complete full-stack application using MongoDB, Express, React, and Node.js',
                difficulty: 'Hard',
                category: 'Web Dev',
                requiredSkills: ['MERN', 'Full Stack'],
                points: 300,
            },
            {
                title: 'Machine Learning Image Classification',
                description: 'Build an image classification model using TensorFlow',
                difficulty: 'Hard',
                category: 'ML/AI',
                requiredSkills: ['Python', 'TensorFlow', 'ML'],
                points: 250,
            },
            {
                title: 'Docker Containerization',
                description: 'Containerize your application using Docker and Docker Compose',
                difficulty: 'Medium',
                category: 'DevOps',
                requiredSkills: ['Docker', 'DevOps'],
                points: 150,
            },
            {
                title: 'AWS Cloud Deployment',
                description: 'Deploy your application on AWS using EC2 and S3',
                difficulty: 'Hard',
                category: 'Cloud',
                requiredSkills: ['AWS', 'Cloud', 'DevOps'],
                points: 200,
            },
            {
                title: 'Data Analysis with Python',
                description: 'Analyze datasets using Pandas and Matplotlib',
                difficulty: 'Medium',
                category: 'Data Science',
                requiredSkills: ['Python', 'Pandas', 'Data Analysis'],
                points: 120,
            },
        ];

        const createdChallenges = await Challenge.insertMany(challenges);
        console.log(`✓ Created ${createdChallenges.length} challenges`);

        // Sample users
        const users = [
            {
                name: 'Alex Johnson',
                email: 'alex@example.com',
                password: 'Password123',
                bio: 'Full-stack developer passionate about building amazing products',
                skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
                rank: 'Advanced',
                points: 850,
                activity: 15,
                challenges: [createdChallenges[0]._id, createdChallenges[1]._id, createdChallenges[2]._id],
            },
            {
                name: 'Sarah Chen',
                email: 'sarah@example.com',
                password: 'Password123',
                bio: 'AI/ML enthusiast and data scientist',
                skills: ['Python', 'TensorFlow', 'Data Analysis', 'ML'],
                rank: 'Expert',
                points: 1200,
                activity: 20,
                challenges: [createdChallenges[6]._id],
            },
            {
                name: 'Mike Williams',
                email: 'mike@example.com',
                password: 'Password123',
                bio: 'DevOps engineer with cloud expertise',
                skills: ['AWS', 'Docker', 'Kubernetes', 'DevOps'],
                rank: 'Advanced',
                points: 950,
                activity: 18,
                challenges: [createdChallenges[7]._id, createdChallenges[8]._id],
            },
            {
                name: 'Emma Rodriguez',
                email: 'emma@example.com',
                password: 'Password123',
                bio: 'Mobile app developer and UI enthusiast',
                skills: ['React Native', 'Flutter', 'UI/UX'],
                rank: 'Intermediate',
                points: 450,
                activity: 10,
                challenges: [createdChallenges[4]._id],
            },
            {
                name: 'James Park',
                email: 'james@example.com',
                password: 'Password123',
                bio: 'Just starting my coding journey!',
                skills: ['HTML', 'CSS', 'JavaScript'],
                rank: 'Beginner',
                points: 125,
                activity: 5,
                challenges: [createdChallenges[0]._id],
            },
        ];

        const createdUsers = await User.insertMany(users);
        console.log(`✓ Created ${createdUsers.length} users`);

        // Update challenges with completedBy data
        await Challenge.findByIdAndUpdate(createdChallenges[0]._id, {
            completedBy: [createdUsers[0]._id, createdUsers[4]._id],
        });
        await Challenge.findByIdAndUpdate(createdChallenges[1]._id, {
            completedBy: [createdUsers[0]._id],
        });

        console.log('');
        console.log('✅ Database seeding completed successfully!');
        console.log('');
        console.log('📝 Sample Users:');
        console.log('───────────────────────────────────────');
        createdUsers.forEach(user => {
            console.log(`Email: ${user.email}`);
            console.log(`Password: Password123`);
            console.log(`Name: ${user.name}`);
            console.log('');
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();
