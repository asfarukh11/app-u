import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



function Profile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8000/profiles/${id}`);
                if (!response.ok) throw new Error('Profile could not be fetched');
                const data = await response.json();
                setProfile(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!profile) return <p>No profile found</p>;

    return (
        <div>
            <Link to="/" className="back-to-home">
                <FontAwesomeIcon icon={faArrowLeft}/>
            </Link>
            <img src={profile.profilePage} alt={`${profile.firstName} ${profile.lastName}`} className="profile-picture" />
        </div>
    );
}

export default Profile;
