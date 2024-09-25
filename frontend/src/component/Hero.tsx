import axios from "axios";
import { useState } from "react";

interface Movie {
    id: number;
    userId: number;
    title: string;
    description: string;
    genre: string;
    language: string;
    duration: number;
    release_date: string;
    rating: number;
}
const Hero = () => {
    const [ search, setSearch ] = useState("");
    const [searchResult, setSearchResult ] = useState<Movie>({
        id: 0,
        userId: 0,
        title: '',
        description: '',
        genre: '',
        language: '',
        duration: 0,
        release_date: '',
        rating: 0
    });
    const sumbitHander = async () => {
        if(!search) return;
        try {
            const allMovies = await axios.get('http://localhost:3000/allmovies');
            const originalData: any = allMovies.data.message;
            const filteredData: any = originalData.filter((data: any) => {
                return data.title.toLowerCase() === search.toLowerCase();
            });
            setSearchResult(filteredData);
            console.log(filteredData.title)
        }catch(error) {
            console.log(error);
        }
    }
    return (
        <div className = 'flex justify-center'>
            <input onChange={(e: any) => {
                setSearch(e.target.value);
            }}/>
            <button onClick = { sumbitHander }>search</button>
            <div> { searchResult.description }</div>
        </div>
    )
}


export default Hero;