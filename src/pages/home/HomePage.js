import React, {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "../../components/searchbar/SearchBar";
import FormatDate from "../../helpers/FormatDate";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Main from "../../components/main/Main";


const apiCarKey = process.env.REACT_APP_OVIO_API_KEY;
const accessImageKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function HomePage() {
    const [carData, setCarData] = useState({});
    const [kenteken, setKenteken] = useState("6-XXH-68");
    const [imageData, setImageData] = useState({});
    const [tradeName, setTradeName] = useState("");
    const [headerPicture, setHeaderPicture] = useState("");
    const [errorLicensePlate, toggleErrorLicensePlate] = useState(false);
    const [errorImage, toggleErrorImage] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        if (kenteken) {

            fetchCarData();

        }
    }, [kenteken]);

    useEffect(() => {

            fetchImageData();

    }, [tradeName]);


    async function fetchCarData() {
        toggleErrorLicensePlate(false);
        toggleLoading(true);


        try {
            const response = await axios.get(`https://api.overheid.io/voertuiggegevens/${kenteken}`, {
                mode: "onSubmit",
                headers: {
                    "Content-Type": "application/json",
                    "ovio-api-key": apiCarKey,
                }
            });
            setCarData(response.data);
            const imageTradeNameRaw = [response.data.merk, response.data.handelsbenaming];
            const imageTradeNameFormatted = imageTradeNameRaw.join(" ");
            setTradeName(imageTradeNameFormatted.replaceAll("-", " "));
        } catch (e) {
            console.error(e);
            toggleErrorLicensePlate(true);
        }
        toggleLoading(false);
    }


    async function fetchImageData() {
        toggleErrorImage(false);
        toggleLoading(true);

        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos/?client_id=${accessImageKey}`, {
                headers: {
                    "Accept-Version": "v1",
                    "Content-Type": "application/json",
                },
                params: {
                    query: tradeName,
                    orientation: "landscape",
                    order_by: "relevant",
                }
            });

            setImageData(response.data.results);
            setHeaderPicture(response.data.results[0].urls.full);
        } catch (e) {
            console.error(e);
            toggleErrorImage(true);
        }
        toggleLoading(false);
    }

    return (
        <div className="outer-container">
            <header className="header-container" style={{backgroundImage: `url("${headerPicture}"`}}>
                <SearchBar setKentekenHandler={setKenteken} setImageHandler={setTradeName}/>
                {loading && <p className="loading-message">Searching...</p>}
                {errorLicensePlate &&
                <div className="error-message-container"><p className="error-message">Invalid: Fill in a valid license plate number and try again</p></div>}
                {errorImage &&
                    <div className="error-message-container"><p className="error-message">No images found for this type of vehicle</p></div>}

            </header>
            <main className="main-container">
                {Object.keys(carData).length > 0 &&
                    <div className="car_info-card">
                        <div>
                            <h4>trade name</h4>
                            <h2>{carData.merk} {carData.handelsbenaming}</h2>
                        </div>
                        <div>
                            <h4>date of first admission</h4>
                            <h2>{FormatDate(carData.datum_eerste_toelating)}</h2>
                        </div>
                        <div>
                            <h4>fuel description</h4>
                            <h2>{carData.brandstof[0].brandstof_omschrijving}</h2>
                        </div>
                    </div>
                }
            </main>

          {/*  <Main
                objectKeys={carData}
                className="main-container"
                foundBrand={carData.merk}
                foundTradeName={carData.handelsbenaming}
                foundDate={carData.datum_eerste_toelating}
                foundFuel={carData.brandstof[0].brandstof_omschrijving}
            />*/}

            <footer className="swiper-wrapper footer-container" id="swiper-wrapper">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    navigation={true}
                    className="mySwiper"
                    id="mySwiper"
                    breakpoints={{
                        576: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1500: {
                            slidesPerView: 4
                        },
                        1800: {
                            slidesPerView: 5
                        }
                    }}
                >
                    {Object.keys(imageData).length > 0 && imageData.map((image) => (
                        <SwiperSlide key={image.blur_hash}>
                            <div className="swiper_img-wrapper">
                                <img
                                    className="swiper_img"
                                    src={image.urls.full}
                                    alt="Car image"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </footer>
        </div>
    )
}

export default HomePage;