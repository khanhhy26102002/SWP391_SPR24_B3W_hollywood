import { useEffect, useState } from "react";
import {fetchMovieData} from '../api/movieApi';
import { Header } from "./Header";
// import "./css/style.css"
const Moviedetail = () => {
const [movie, setMovie] = useState([{}]);
useEffect(() => {
fetchData();
}, []);
const fetchData = async () => {
try {
const response = await fetchMovieData();
setMovie([...response.data]);
} catch (error){
console.error("Error fetching posts:", error);
}
}
return (
    <Header>
<section class="anime-details spad">
    <div class="container">
        <div class="anime__details__content">
            <div class="row">
                {movie.map((users)=>(
                <>
                <div class="col-lg-3">
                    <div class="anime__details__pic set-bg" style={{backgroundImage:`url(${users.imageUrls})`}}>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="anime__details__text">
                        <div class="anime__details__title">
                            <h3></h3>
                        </div>
                        <p></p>
                        <div class="anime__details__widget">
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <ul>
                                        <li><span>Đạo diễn:</span>{users.director}</li>
                                        <li><span>Diễn viên:</span>{users.actor}</li>
                                        <li><span>Thể loại:</span>{users.genre}</li>
                                        <li><span>Khởi chiếu: </span>{users.premiere}</li>
                                        <li><span>Thời lượng: </span>{users.duration}</li>
                                        <li><span>Ngôn ngữ:</span>{users.language}</li>
                                        <li><span>Rated: </span>{users.rated}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="anime__details__btn">
                            <a href={users.trailer} class="watch-btn"><span>Watch Trailer</span><i
                                    class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                </>
                ))}
            </div>
        </div>
    </div>
</section>
</Header>
);
};

export default Moviedetail;