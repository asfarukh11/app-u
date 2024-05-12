import React, { useState } from 'react';
import Slider from 'react-slick';
import Card from '../components/Card';
import useFetch from '../hooks/useFetch';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import videoBg from '../assets/videoBg.mp4';

function Home() {
  const { data: profiles, loading } = useFetch('http://localhost:8000/profiles');
  const [search, setSearch] = useState("");

  if (loading) return <div>Loading...</div>;

  const filteredProfiles = search.trim() ? profiles.filter(profile =>
    profile.firstName.toLowerCase() === search.toLowerCase().trim() ||
    profile.lastName.toLowerCase() === search.toLowerCase().trim()
  ) : profiles;

  

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "goldenrod", objectFit: "cover" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "goldenrod", objectFit: "cover" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: filteredProfiles.length > 1, // Prevent infinite loop for single or no item
    speed: 300,
    fade: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: filteredProfiles.length>4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    rows: 2,
    slidesPerRow: 5,
  };

  return (
    <div>
      
      <div className="search-input-container">
        <input
          className="search-input"
          type="text"
          placeholder="Qidiruv"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {filteredProfiles.map((profile, index) => (
            <Card key={index} profile={profile} />
          ))}
        </Slider>
      </div>
      <video src={videoBg} autoPlay loop muted />
      <div className="overlay"></div>
    </div>
  );
}

export default Home;
