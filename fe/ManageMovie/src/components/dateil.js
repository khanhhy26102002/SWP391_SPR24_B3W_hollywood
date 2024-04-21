import React, { useEffect, useState } from 'react'
import { fetchMovieData } from '../api/movieApi';
export default function Moviedetail() {
    const [movie, setMovie] = useState([{}]);
    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
            const response = await fetchMovieData();
            setMovie([...response.data])
        } catch (error){
            console.error("Error fetching posts:", error);
        }
      }
return (
    <div>
    <section class="anime-details spad">
        <div class="container">
            <div class="anime__details__content">
                <div class="row">
                {movie.map((movie) => (
                    <>
                    <div class="col-lg-3">
                        <div class="anime__details__pic set-bg" style={{backgroundImage:`url(${movie.imageUrls})`}}>
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
                                             <li><span>Description: {movie.description}</span></li>
                                             <li><span>duration</span></li>
                                             <li><span>director</span></li>
                                             <li><span>actor</span></li>
                                             <li><span>genre</span></li>
                                             <li><span>premiere</span></li>
                                             <li><span>languagge</span></li>
                                             <li><span>rated:</span></li>
                                             <li><span>user_id</span></li>
                                             <li><span>created_date</span></li>
                                             <li><span>updated_date</span></li>
                                             <li><span>status</span></li>
                                         </ul>
                                     </div>
                                 </div>
                             </div>
                           
                            <div class="anime__details__btn">
                                <a href="" class="watch-btn"><span>Watch Trailer</span> <i
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
  </div>
    )
    }
