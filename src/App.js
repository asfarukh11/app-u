import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css'

// Define basic animation variants for a simple fade transition
const fadeVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3  // You can adjust the duration to make the transition slower or faster
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
};

const AnimatedRoutes = () => {
  const location = useLocation();  // Use the location hook to control the key of the route transitions

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div variants={fadeVariants} initial="initial" animate="animate" exit="exit">
            <Home />
          </motion.div>
        } />
        <Route path="/profiles/:id" element={
          <motion.div variants={fadeVariants} initial="initial" animate="animate" exit="exit">
            <Profile />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <AnimatedRoutes />
  );
};

export default App;
