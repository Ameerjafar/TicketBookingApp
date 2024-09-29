import axios from "axios";
import { useState } from "react";
import FilterComponent from "./FilterComponent";
const Hero = () => {
    const gettingMovies = async () => {
        const allMovies = await axios.get('http://localhost:3000/allmovies');

        return allMovies.data.message;
    }
    const response: any = gettingMovies();
    const [ search, setSearch ] = useState("");
    const sumbitHander = async () => {
        if(!search) return;
        try {
            const originalData = response.data.message;
            console.log(originalData);
            const filteredData: any = await originalData.filter((data: any) => {
                return data.title.toLowerCase().includes(search.toLowerCase())
            });
            console.log(filteredData);
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
        </div>
    )
}


export default Hero;