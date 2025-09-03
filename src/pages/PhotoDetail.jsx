import React from 'react';
import { useParams } from 'react-router-dom';

const PhotoDetail = () => {
    const { photoId } = useParams();
    const [photo, setPhoto] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPhotoDetail = async () => {
            try {
                const response = await fetch(`/api/photos/${photoId}`);
                const data = await response.json();
                setPhoto(data);
            } catch (error) {
                console.error('Error fetching photo details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotoDetail();
    }, [photoId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!photo) {
        return <div>Photo not found.</div>;
    }

    return (
        <div>
            <h1>{photo.title}</h1>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.description}</p>
            <button onClick={() => alert('Purchase functionality to be implemented.')}>
                Purchase Photo
            </button>
        </div>
    );
};

export default PhotoDetail;