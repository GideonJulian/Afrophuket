import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Sample images
import Img1 from "../../assets/images/events/event1.png";
import Img2 from "../../assets/images/events/event2.png";
import Img3 from "../../assets/images/events/event3.png";

const EventCarousel = () => {
    const images = [Img1, Img2, Img3, Img1, Img2, Img3];
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Group images into sets of 3
  const groupedImages = [];
  for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
  }

  return (
    <div className="w-full  max-w-7xl mx-auto py-10 px-4">
      <Slider {...settings}>
        {groupedImages.map((group, index) => (
          <div key={index} className="flex justify-between gap-4">
            {group.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Event ${index * 3 + i + 1}`}
                className="w-1/3 h-[500px] object-cover rounded-xl"
              />
            ))}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;
