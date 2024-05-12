import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = ({ profile }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
        >
            <img src={profile.profilePicture} alt={`${profile.firstName} ${profile.lastName}`} style={{ width: '100%', height: '70%' }} />
            <Link to={`/profiles/${profile.id}`} className="profile-link">Batafsil</Link>
        </motion.div>
    );
};

export default Card;
