import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css'
import { supabase } from '../client'
const Home = (props) => {

    const [sortTime, setSortTime] = useState(true);
    const [sortPopularity, setSortPopularity] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [allData, setAllData] = useState([]);
    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);

    const convertTime = (timeStamp) => {
        const timeDiff = ~~((Date.now() - timeStamp) / 60000)
        if (~~(timeDiff / 3679200) != 0)
            return ~~(timeDiff / 3679200) + (~~(timeDiff / 3679200) == 1 ? " year ago" : " years ago")
        if (~~(timeDiff / 306600) != 0)
            return ~~(timeDiff / 306600) + (~~(timeDiff / 306600) == 1 ? " month ago" : " months ago")
        if (~~(timeDiff / 1440) != 0)
            return ~~(timeDiff / 1440) + (~~(timeDiff / 1440) == 1 ? " day ago" : " days ago")
        if (~~(timeDiff / 60) != 0)
            return ~~(timeDiff / 60) + (~~(timeDiff / 60) == 1 ? " hour ago" : " hours ago")
        else {
            return timeDiff + (timeDiff == 1 ? " minute ago" : " minutes ago")
        }
    }

    useEffect(() => {
        if (sortPopularity) {
            allData.sort(sortByUpvotes)
        }
        else {
            allData.sort(sortByTime)
        }

        const newData = allData.filter((post) =>
            post.title.toLowerCase().startsWith(searchInput.toLowerCase())
        );
        setFilteredData(newData);
        // sort()
    }, [searchInput]);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const sortByTime = (a, b) => {
        return b.timeStamp - a.timeStamp
    }
    const sortByUpvotes = (a, b) => {
        return b.upvotes - a.upvotes
    }

    useEffect(() => {
        const parse = async () => {

            let { data, error } = await supabase
                .from('Posts')
                .select('*')

            if (error) {
                console.error('Error fetching data:', error)
            } else {
                console.log('Fetched data:', data)
                setPosts(data)
            }
        };
        parse();
        setAllData(posts);
        setFilteredData(posts);
        handleSortTimeChange()
    }, []); // Only does this on the initial render

    const handleSortTimeChange = () => {
        setSortTime(!sortTime);
        setSortPopularity(false);
    };

    const handleSortPopularityChange = () => {
        setSortPopularity(!sortPopularity);
        setSortTime(false);
    };

    const sort = () => {
        if (sortPopularity) {
            setFilteredData([...filteredData].sort(sortByUpvotes))
        }
        else {
            setFilteredData([...filteredData].sort(sortByTime))
        }
    }

    useEffect(() => {
        sort()
    }, [sortTime, sortPopularity]);

    useEffect(() => {
        setAllData(posts);
        setFilteredData(posts);
        handleSortTimeChange()
    }, [posts])


    return (
        <div className='content'>
            <h1 className='header'>Home Feed</h1>
            <fieldset className="Sorting">
                <div>
                    <input type="radio" id="Most Recent" name="Sorting" value="Most Recent" onChange={handleSortTimeChange} checked={sortTime} />
                    <label htmlFor="Most Recent">Most Recent</label>
                </div>
                <div>
                    <input type="radio" id="Most Popular" name="Sorting" value="Most Popular" onChange={handleSortPopularityChange} checked={sortPopularity} />
                    <label htmlFor="Most Popular">Most Popular</label>
                </div>
                <input
                    type="text"
                    placeholder="Search by Post Title"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    className="search-input"
                />
            </fieldset>
            <div className="mainContent">
                {filteredData.map((dataPoint) => (
                    <div className="displayCrew" key={dataPoint.id
                    }
                        onClick={() =>
                            navigate(
                                `/post?id=${dataPoint.id}`
                            )
                        }
                    >
                        <p>Posted {convertTime(dataPoint.timeStamp)}</p>
                        <h1>{dataPoint.title}</h1>
                        <p>{dataPoint.upvotes} Upvotes</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;