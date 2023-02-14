import React, {useEffect, useState} from "react";
import axios from "axios";
import "./HomePage.css";
import SearchBar from "../../components/searchbar/SearchBar";
import FormatDate from "../../helpers/FormatDate";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const apiCarKey = process.env.REACT_APP_OVIO_API_KEY;
const accessImageKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const secretImageKey = process.env.REACT_APP_UNSPLASH_SECRET_KEY;


function HomePage() {
    const [carData, setCarData] = useState({});
    const [kenteken, setKenteken] = useState("6-XXH-68");
    const [imageData, setImageData] = useState({});
    // const [sliderImage, setSliderImage] = useState([]);
    const [tradeName, setTradeName] = useState("");
    let [headerPicture, setHeaderPicture] = useState("");

    useEffect(() => {
        if (kenteken) {
            fetchCarData();

        }
    }, [kenteken]);

    useEffect(() => {
        if (tradeName) {
            fetchImageData();
        }
    }, [tradeName]);

    async function fetchCarData() {

        try {
            const response = await axios.get(`https://api.overheid.io/voertuiggegevens/${kenteken}`, {
                mode: "onSubmit",
                headers: {
                    "Content-Type": "application/json",
                    "ovio-api-key": apiCarKey,
                }
            });
            setCarData(response.data);
            const imageTradeName = [response.data.merk, response.data.handelsbenaming];
            setTradeName(imageTradeName.join(" "));
            console.log(tradeName);
            console.log(response.data);
            /*   console.log("Trade name:", response.data.merk, response.data.handelsbenaming);
               console.log("First admission:", response.data.datum_eerste_toelating);
               console.log("Fuel description:", response.data.brandstof[0].brandstof_omschrijving);*/
        } catch (e) {
            console.error(e);
        }
    }


    async function fetchImageData() {

        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=${accessImageKey}&query=${tradeName}`, {
                headers: {
                    "Accept-Version": "v1",
                    "Content-Type": "application/json",
                },
                params: {
                    // query: "volkswagen golf",
                    orientation: "landscape"
                }
            });
            console.log(response.data);
            setImageData(response.data.results);
            setHeaderPicture(response.data.results[0].urls.full);
            console.log("Results image id:", response.data.results.blur_hash);
            console.log("found tradename:", tradeName);
            // setSliderImage(response.data.slice(1, 6));
        } catch (e) {
            console.error(e);
        }
    }



    return (
        <div className="outer-container">
            <header>
                <div className="header_img-container">
                    <img className="header_img" src={headerPicture} alt="Car Header Image"/>
                </div>
                <h1>Please enter your license plate number</h1>
                <SearchBar setKentekenHandler={setKenteken} setImageHandler={tradeName}/>
            </header>
            <main className="inner-container">
                {Object.keys(carData).length > 0 &&
                    <div className="car_info">
                        <h4>trade name</h4>
                        <h2>{carData.merk} {carData.handelsbenaming}</h2>
                        <h4>date of first admission</h4>
                        <h2>{FormatDate(carData.datum_eerste_toelating)}</h2>
                        <h4>fuel description</h4>
                        <h2>{carData.brandstof[0].brandstof_omschrijving}</h2>
                    </div>
                }
            </main>
            <footer className="swiper-wrapper inner-container" id="swiper-wrapper">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar]}
                    spaceBetween={30}
                    slidesPerView={1}
                    // slidesPerGroup={9}
                    loop={true}
                    navigation={true}
                    // pagination={{clickable: true}}
                    // scrollbar={{draggable: true}}
                    className="mySwiper"
                    id="mySwiper"
                    breakpoints={{
                        576: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1600: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }

                        }
                    }

                >
                    {Object.keys(imageData).length > 0 && imageData.map((image) => (
                        <SwiperSlide key={image.blur_hash}>
                            <div>
                                <img
                                    className="swiper_img"
                                    src={image.urls.regular}
                                    alt="Car image"

                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/*<button type="button" onClick={fetchImageData}>Haal data op!</button>*/}

            </footer>

        </div>
    )
}

export default HomePage;