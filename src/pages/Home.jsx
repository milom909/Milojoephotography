import React from 'react';
import PhotoGallery from '../components/PhotoGallery';
import SearchBar from '../components/SearchBar';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Photo Purchase Website</h1>
            <SearchBar />
            <PhotoGallery />
        </div>
    );
};

export default Home;