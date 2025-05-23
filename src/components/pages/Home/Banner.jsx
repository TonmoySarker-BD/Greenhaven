import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Swal from 'sweetalert2';

const Banner = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://garden-heaven-server.vercel.app/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      }
      )
      .catch(err => {
        setLoading(false);
        Swal.fire('Error', 'Failed to load ', err);
      }
      );
  }, []);

    if (loading) {
    return (
      <div className="min-h-screen flex  justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <div
              className="relative min-h-screen md:h-[32rem] w-full bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${event.image})`,
              }}
            >
              <div className="container mx-auto px-6 md:px-12 z-10 text-white">
                <div className="max-w-2xl bg-black/30 backdrop-blur-sm p-8 rounded-lg">
                  <span className="text-primary font-semibold">{event.date}</span>

                  <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                    <Typewriter
                      words={[event.title]}
                      loop={0}
                      cursor
                      cursorStyle="_"
                      typeSpeed={70}
                      deleteSpeed={70}
                      delaySpeed={2000}
                    />
                  </h2>

                  <p className="text-lg mb-6">{event.description}</p>
                  <div className="flex items-center mb-6">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{event.location}</span>
                  </div>
                  <button className="btn btn-primary px-8 py-3 rounded-lg font-medium">
                    {event.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
