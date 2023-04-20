import React, { useEffect, useState } from 'react'
import "./movies.css"
import { collection, addDoc, doc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db, storage } from '../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';

const Movies = () => {


    // state variables to store movie data
    const [movieList, setMovieList] = useState([]);
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newReleaseDate, setNewReleaseDate] = useState('');
    const [newMovieDesc, setNewMovieDesc] = useState('');
    const [isNewMovieHasOscar, setisNewMovieHasOscar] = useState(false);

    // A reference to the "movies" collection in the Firestore database
    const movieCollectionRef = collection(db, 'movies');

    //  State variable to store updated movie description
    const [updateMovieDesc, setUpdateMovieDesc] = useState('');

    // State variables to upload files 
    const [uploadFile, setUploadFile] = useState(null);

    // use Firebase onSnapshot() to get movie data from database and update state
    useEffect(() => {
        const unsubscribe = onSnapshot(movieCollectionRef, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            setMovieList(data);
        });
        return unsubscribe;
        // eslint-disable-next-line
    }, []);

    // handle form submission to add new movie data to the Firestore database
    const handleSubmit = async () => {
        try {
            await addDoc(movieCollectionRef, {
                title: newMovieTitle,
                releaseDate: newReleaseDate,
                receivedAnOscar: isNewMovieHasOscar,
                desc: newMovieDesc,
                userId: auth?.currentUser?.uid
            })
            alert("movies submitted")
        } catch (err) {
            console.error(err);
        }
    }

    // handle deletion of movie data from the Firestore database
    const handleDelete = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id)
            await deleteDoc(movieDoc, id)
        } catch (err) {
            console.log(err)
        }
    }

    // handle updating the description of a movie in the Firestore database
    const handleUpdateDesc = async (id) => {
        const movieDoc = await doc(db, "movies", id);
        await updateDoc(movieDoc, {
            desc: updateMovieDesc
        })
    }


    // handle upload file to firebase storage
    const handleUploadFile = async () => {
        if (!uploadFile) return;
        const filesFolderRef = ref(storage, `projectFiles/${uploadFile.name}`)
        try {
            await uploadBytes(filesFolderRef, uploadFile)
        } catch (err) {
            console.error(err)
        }

    }


    //  Movie List component
    return (
        <>
            <main className="movie-list-container">
                <header className="movie-list-title">Movie List</header>

                {/* Section to add movies */}
                <section className="add-movies">
                    <div className="input-container">
                        <label htmlFor="movie-title">Enter Movie</label>
                        {/* Input field to add a new movie title */}
                        <input
                            type="text"
                            id="movie-title"
                            className="input"
                            placeholder="Movie Title"
                            onChange={(e) => setNewMovieTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="movie-desc">Enter Description</label>
                        {/* Input field to add a new movie description */}
                        <input
                            type="text"
                            id="movie-desc"
                            className="input"
                            placeholder="Movie Description"
                            onChange={(e) => setNewMovieDesc(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="release-year">Release Year</label>
                        {/* Input field to add a new movie release year */}
                        <input
                            type="number"
                            id="release-year"
                            className="input"
                            placeholder="Movie Year"
                            value={newReleaseDate}
                            required
                            onChange={(e) => setNewReleaseDate(e.target.value)}
                        />
                        {/* The value is set to null when the input is empty or 0 */}
                    </div>

                    <div className="input-container">
                        <label htmlFor="has-oscar">Received an Oscar?</label>
                        {/* Checkbox to indicate if a new movie has received an Oscar or not */}
                        <input
                            type="checkbox"
                            id="has-oscar"
                            onChange={(e) => setisNewMovieHasOscar(e.target.value)}
                        />
                    </div>

                    {/* Button to submit the new movie */}
                    <button className="btn" onClick={handleSubmit}>Submit Movie</button>
                </section>


                {/*  */}


                {/* List of movies */}
                <div className="movie-list">
                    {movieList.map((movie) => (
                        <div className='list-items' key={movie.title}>
                            {/* Movie title */}
                            <h2 style={{ color: 'green' }} >
                                <span>{movie.title}</span>
                            </h2>

                            {/* Movie release year */}
                            <div>
                                <span> Year: {movie.releaseDate}</span>
                            </div>

                            {/* Indicates if the movie received an Oscar */}
                            <div>
                                <span>
                                    Received an Oscar: {movie.receivedAnOscar ? "Yes" : "No"}
                                </span>
                            </div>

                            {/* Section to update movie description */}
                            <div className="input-desc">
                                <span>Description: {movie.desc}</span>
                                <div>
                                    <label htmlFor="">Edit Description : </label>
                                    {/* Input field to update the movie description */}
                                    <input type="text" onChange={e => setUpdateMovieDesc(e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <span>Upload file </span>
                                <div>
                                    <input type="file" onChange={e => setUploadFile(e.target.files[0])} />
                                    <button onClick={handleUploadFile}  > upload file</button>
                                </div>
                            </div>

                            {/* Button to delete the movie */}
                            <button className="btn btn-red" onClick={() => handleDelete(movie.id)}>Delete</button>

                            {/* Button to update the movie description */}
                            <button className="btn" onClick={() => handleUpdateDesc(movie.id)}>Update</button>
                        </div>
                    ))}
                </div>
            </main>

        </>
    );
}

export default Movies