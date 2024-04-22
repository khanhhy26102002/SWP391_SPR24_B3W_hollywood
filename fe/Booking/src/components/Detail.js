import React, { useEffect, useState } from 'react'
import { fetchMovieData } from '../api/movieApi';
import { Header } from './Header';
import { useLocation } from 'react-router-dom';
import { getMovieDetail } from '../api/movieApi';
import { Footer } from './Footer';

const Moviedetail = () => {
    const [movie, setMovie] = useState({});
    const location = useLocation();

    const movieId = location.state;

      useEffect(() => {
        fetchData()
      },[])

      const fetchData = async () => {
        try {
            const response = await getMovieDetail(movieId);
            setMovie(response.data)
        } catch (error){
            console.error("Error fetching movie:", error);
        }
      }
return (
        <>
            <Header/>
            <div className="main-content">
            <div className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__links">
                  <a href="#">
                    <i className="fa fa-home"></i> Home
                  </a>
                  <a href="#">Phim</a>
                  <span>Chi tiết</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="anime-details spad">
        <div class="container">
            <div class="anime__details__content">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="anime__details__pic set-bg" style={{backgroundImage: `url(${movie.imageUrls})`}}>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="anime__details__text">
                            <div class="anime__details__title">
                                <h3>{movie.name}</h3>
                            </div>
                            <p></p>
                            <div class="anime__details__widget">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6">
                                        <ul>
                                            <li><strong>Đạo diễn:</strong> {movie.director}</li>
                                            <li><strong>Diễn viên:</strong> {movie.actor}</li>
                                            <li><strong>Thể loại:</strong> {movie.genre}</li>
                                            <li><strong>Khởi chiếu: </strong>{movie.premiere}</li>
                                            <li><strong>Thời lượng: </strong>{movie.duration}</li>
                                            <li><strong>Ngôn ngữ:</strong> {movie.language}</li>
                                            <li><strong>Rated: </strong>{movie.rated}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="anime__details__btn">
                                <a href={`${movie.trailer}`} class="watch-btn"><span>Watch Trailer</span> 
                                <i class="fa fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{fontSize: "20px"}}>"{movie.description}"</p>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
    }

    export default Moviedetail;
