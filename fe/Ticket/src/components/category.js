import "../styles/style.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { fetchMovieData } from "../api/movieApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  styled,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { getAllScreen } from "../api/screenApi";

const Category = () => {
  const [movie, setMovie] = useState([{}]);
  const [screens, setScreens] = useState([{}]);
  const [movieFilter, setMovieFilter] = useState([{}])
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchMovieData();
      setMovie([...response.data]);
      
      const res = await getAllScreen ();
      setMovieFilter([...response.data.filter((film) => res.data.filter((screen) => screen.movieId === film.id).length > 0)]);
      setScreens([...res.data]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const navigate = useNavigate();
  const [type, setType] = useState(1);
  useEffect(() => {
    type === 1 ? setMovieFilter([...movie.filter((film) => screens.filter((screen) => screen.movieId === film.id).length > 0)]) :
    setMovieFilter([...movie.filter((film) => screens.filter((screen) => screen.movieId === film.id).length === 0)]);
  },[type]);
  return (
    <>
      <Header />
      <div className="main-content">
        <div
          className="breadcrumb-option"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="container"
            style={{ margin: "0 50px", width: "100%", maxWidth: "1500px" }}
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__links">
                  <a href="#">
                    <i className="fa fa-home"></i> Home
                  </a>
                  <a href="#">Phim</a>
                  <span>{type === 1 ? "Đang" : "Sắp"} chiếu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="product-page spad"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="container"
            style={{ margin: "0 50px", width: "100%", maxWidth: "1500px" }}
          >
            <div className="row">
              <div className="product__page__content" style={{width: "100%"}}>
                <div className="product__page__title">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-6">
                      <div className="product__page__filter">
                        <SelectOutlined
                          variant="outlined"
                          style={{ width: "20%",float: "left",background: "white",borderRadius: "10%" }}
                        >
                          
                          <Select
                            label="Type"
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                            <MenuItem value={1}>Đang chiếu</MenuItem>
                            <MenuItem value={0}>Sắp chiếu</MenuItem>
                          </Select>
                        </SelectOutlined>
                      </div>
                    </div>
                  </div>
                </div>
                {movieFilter.length > 0 ? (
                  <div className="row">
                  {movieFilter.map((film) => (
                    <div
                      className="col-lg-3 movie"
                      key={film.id}
                      style={{width: "25%"}}
                    >
                      <div className="product__item film">
                        <div
                          className="product__item__pic set-bg"
                          style={{
                            backgroundImage: `url(${film.imageUrls})`,
                            margin: "0 50px",
                          }}
                        >
                          <div className="ep">{film.rated}</div>
                        </div>
                        <div
                          className="product__item__text"
                          style={{ margin: "0 50px" }}
                        >
                          <ul>
                            <li>{film.genre}</li>
                          </ul>
                          <h5
                            onClick={() =>
                              navigate("/detail", { state: film.id })
                            }
                            style={{ cursor: "pointer" }}
                          >
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
                      <div className="btn-buy-ticket">
                        <div
                          className="buy-ticket"
                          onClick={() =>
                            navigate("/detail", { state: film.id })
                          }
                        >
                          <span>Detail</span>
                        </div>

                        <div
                          className="buy-ticket"
                          onClick={() =>
                            navigate(`/buyticket`, { state: film.id })
                          }
                        >
                          <span>Booking</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                ) : (
                  <h1>Chưa có loại phim này</h1>
                )}
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

const DialogTextField = styled(TextField)({
  width: "100%",
});

const SelectOutlined = styled(FormControl)({
  width: "30%",
  marginBottom: "10px",
});
