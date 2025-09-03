import React, { useEffect, useState } from 'react';
import { fetchPhotos } from '../services/api';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const fetchedPhotos = await fetchPhotos();
                setPhotos(fetchedPhotos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPhotos();
    }, []);

    if (loading) {
        return <div>Loading photos...</div>;
    }

    if (error) {
        return <div>Error loading photos: {error}</div>;
    }

    return (
        <div className="photo-gallery">
            {photos.map(photo => (
                <div key={photo.id} className="photo-item">
                    <img src={photo.url} alt={photo.title} />
                    <h3>{photo.title}</h3>
                    <p>{photo.description}</p>
                    <button>Purchase</button>
                </div>
            ))}
        </div>
    );
};

export default PhotoGallery;