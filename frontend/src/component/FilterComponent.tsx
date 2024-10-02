import { useState } from "react"
import axios from "axios";
const FilterComponent = () => {
    const [ genreParams, setGenereParams ] = useState<string[]>([]);
    const [ language, setLanguage ] = useState<string[]>([]);
    const valueLanguage = ['Tamil', 'English', 'Malayalam', 'Hindi', 'Telugu'];
    const valueGenre = ['Drama', 'Comedy', 'Thriller', 'Action', 'Sci-fi'];
    const [ movies, setMovies ] = useState([[]]);
    const filter = async () => {
        const response = await axios.get('http://localhost:3000/allmovies');
        const allMovies = response.data.message;
        const filteredData = await allMovies.filter((val: any) => {
            const lan = val.language.split(",");
            const gen = val.genre.split(",");
            console.log(val.language);
            console.log(lan)
            const ans1 = language.some(item => lan.includes(item));
            const ans2 = genreParams.some(item => gen.includes(item));
            return ans1 || ans2;
        })
        if(!filteredData) {
            setMovies(allMovies);
        }
        else {
            setMovies(filteredData);
        }
    }
    const formHandler = (e: any) => {
        const { value, checked } = e.target;
        if(value.includes(valueLanguage)) {
            setLanguage(prev => [...prev, value])
        } else {
            setGenereParams(prev => [...prev, value]);
        }
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
                    setLanguage([]);
                    setGenereParams([]);
                }}>clear</button>
            </div>
            <div>{ movies.map((val: any) => {return <div>{val.genre}</div>}) } </div>

        </div>
    )
}

export default FilterComponent;