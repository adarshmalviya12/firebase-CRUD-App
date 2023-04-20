import './App.css';
import Auth from './components/auth';
import Movies from './components/movies';


function App() {


  /// to get data with getDocs
  /*   useEffect(() => {
      const getMovieList = async () => {
        try {
          // to access firebase data 
          const data = await getDocs(movieCollectionRef);
          const fileredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
          setMovieList(fileredData)
        } catch (err) {
          console.log(err)
        }
      }
      console.log("rendered.....")
      getMovieList();
    }, [movieCollectionRef]) */

  // to get data with onSnapshot


  return (
    <div className="app">
      <Auth />
      <Movies />


    </div>
  );
}

export default App;
