import "../styles/style.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { fetchMovieData } from "../api/movieApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [movie, setMovie] = useState([{}]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchMovieData();
      setMovie([...response.data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <Header />
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
                  <span>Đang chiếu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-page spad">
          <div className="container">
            <div className="row">
              <div className="product__page__content">
                <div className="product__page__title">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-6">
                      <div className="section-title">
                        <h4>Đang chiếu</h4>
                      </div>
                    </div>
                    <div  className="col-lg-4 col-md-4 col-sm-6">
                                    <div  className="product__page__filter">
                                        <p>Order by:</p>
                                        <select>
                                            <option value="">A-Z</option>
                                            <option value="">Mới nhất</option>
                                            <option value="">Xem nhiều</option>
                                        </select>
                                    </div>
                                </div>
                  </div>
                </div>
                <div className="row">
                  {movie.map((film) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 movie"
                      key={film.id}
                    >
                      <div className="product__item film">
                        <div
                          className="product__item__pic set-bg"
                          style={{ backgroundImage: `url(${film.imageUrls})` }}
                        >
                          <div className="ep">{film.rated}</div>
                        </div>
                        <div className="product__item__text">
                          <ul>
                            <li>{film.genre}</li>
                          </ul>
                          <h5 onClick={() => navigate("/detail", {state: film.id})} style={{cursor: "pointer"}}>
                            {film.name}
                          </h5>
                          <h6>
                            Thời lượng: <span>{film.duration}</span>
                          </h6>
                          <h6>
                            Khởi chiếu: <span>{film.premiere}</span>
                          </h6>
                        </div>
                      </div>
                      <div className="btn-buy-ticket" >
                          <div className="buy-ticket" onClick={() => navigate("/detail",{state: film.id})}>
                            <span>Detail</span>
                          </div>
                        <div
                          className="buy-ticket"
                          onClick={() =>
                            navigate(`/buyticket`, { state: film.name })
                          }
                        >
                          <span>Booking</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
