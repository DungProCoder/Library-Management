import { memo } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const banners = [
        "assets/img/banner1.jpg",
        "assets/img/banner2.jpg",
        "assets/img/banner3.jpg"
    ];

    return (
        <Box sx={{ width: "100%", overflow: "hidden" }}>
            <Slider {...settings}>
                {banners.map((img, idx) => (
                    <Box key={idx}>
                        <img
                            src={img}
                            alt={`Banner ${idx + 1}`}
                            style={{ width: "100%", maxHeight: 350, objectFit: "cover" }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default memo(Banner);