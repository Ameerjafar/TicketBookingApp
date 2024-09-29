import { useState } from "react"
import axios from "axios";
const FilterComponent = () => {
    const [ genreParams, setGenereParams ] = useState([[]]);
    const [ language, setLanguage ] = useState([[]]);
    const valueLanguage = ['Tamil', 'English', 'Malayalam', 'Hindi', 'Telugu'];
    const valueGenre = ['Drama', 'Comedy', 'Thriller', 'Action', 'Sci-fi'];
    const [ movies, setMovies ] = useState([[]]);
    const filter = async () => {
        const response = await axios.get('http://localhost:3000/allmovies');
        const allMovies = response.data.message;
        console.log(allMovies)
        const filteredData = allMovies.filter((val: any) => {
            return language.includes(val.language) || genreParams.includes(val.genre);
        })
        console.log(filteredData);
        if(!filteredData) {
            setMovies(allMovies);
        }
        else {
            setMovies(filteredData);
        }
    }
    const formHandler = (e: any) => {
        const { value, checked } = e.target;
        if(['Tamil', 'English', 'Hindi', 'Malayalam', 'Telugu'].includes(value)) {
            setLanguage(prev => [...prev, value]);
            console.log(language);
        } else {
            setGenereParams(prev => [...prev, value]);
            console.log(genreParams)
        }
        console.log(value, checked);
        filter();
    }
    return (
        <div>
            <div>
                <form onChange = { formHandler }>
                    {valueGenre.map((val: string, ind: number) => {
                        return <div key = { ind }>
                            <input type = 'checkbox' value = { val } />
                            <p>{ val }</p>
                        </div>
                    })}

                    {valueLanguage.map((val: string, ind: number) => {
                        return <div key = { ind }>
                            <input type = 'checkbox' value = { val }/>
                            <p>{ val }</p>
                        </div>
                    })}
                </form>
                <button onClick = { () => {
                    setLanguage([[]]);
                    setGenereParams([[]]);
                }}>clear</button>
            </div>
            <div>{ movies.map((val: any) => {return <div>{val.genre}</div>}) } </div>

        </div>
    )
}

export default FilterComponent;