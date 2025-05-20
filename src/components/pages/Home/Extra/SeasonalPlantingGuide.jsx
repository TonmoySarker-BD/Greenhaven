import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { FaCalendarAlt, FaSun, FaCloudRain, FaLeaf } from 'react-icons/fa';

const plantingGuide = {
  January: [
    { plant: 'Onions', action: 'Plant', icon: '🧅' },
    { plant: 'Leeks', action: 'Sow', icon: '🧄' },
  ],
  February: [
    { plant: 'Broccoli', action: 'Start Indoors', icon: '🥦' },
    { plant: 'Peas', action: 'Sow', icon: '🌱' },
  ],
  March: [
    { plant: 'Tomatoes', action: 'Start Indoors', icon: '🍅' },
    { plant: 'Cabbage', action: 'Sow', icon: '🥬' },
  ],
  April: [
    { plant: 'Lettuce', action: 'Plant Outdoors', icon: '🥬' },
    { plant: 'Radishes', action: 'Sow', icon: '🌶️' },
  ],
  May: [
    { plant: 'Peppers', action: 'Transplant', icon: '🌶️' },
    { plant: 'Beans', action: 'Plant', icon: '🫘' },
  ],
  June: [
    { plant: 'Cucumbers', action: 'Plant', icon: '🥒' },
    { plant: 'Basil', action: 'Harvest', icon: '🌿' },
  ],
  July: [
    { plant: 'Zucchini', action: 'Harvest', icon: '🥒' },
    { plant: 'Fall Lettuce', action: 'Plant', icon: '🥬' },
  ],
  August: [
    { plant: 'Pumpkins', action: 'Monitor', icon: '🎃' },
    { plant: 'Garlic', action: 'Prepare', icon: '🧄' },
  ],
  September: [
    { plant: 'Spinach', action: 'Plant', icon: '🍃' },
    { plant: 'Carrots', action: 'Harvest', icon: '🥕' },
  ],
  October: [
    { plant: 'Spring Bulbs', action: 'Order', icon: '🌷' },
    { plant: 'Chard', action: 'Sow', icon: '🥬' },
  ],
  November: [
    { plant: 'Cover Crops', action: 'Sow', icon: '🌾' },
    { plant: 'Garlic', action: 'Plant', icon: '🧄' },
  ],
  December: [
    { plant: 'Planning', action: 'Prepare', icon: '📝' },
    { plant: 'Tool Maintenance', action: 'Clean', icon: '🧰' },
  ],
};

const SeasonalPlantingGuide = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-base-content flex items-center justify-center">
            <FaCalendarAlt className="text-primary mr-3" />
            Seasonal Planting Guide
          </h2>
          <p className="text-lg text-base-content/80 mt-2">
            What to plant and harvest in {currentMonth}
          </p>
        </div>

        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 20,
            depth: 150,
            modifier: 2.5,
            slideShadows: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
          }}
          className="!pb-12"
        >
          {Object.entries(plantingGuide).map(([month, plants]) => (
            <SwiperSlide key={month} className="flex justify-center">
              <div className="card w-full max-w-[90vw] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] bg-base-200 shadow-xl rounded-2xl p-6 mx-auto transition-all duration-300 ease-in-out">
                <h3 className="text-2xl font-semibold text-base-content flex items-center justify-between">
                  {month}
                  {month === currentMonth && (
                    <span className="badge badge-primary ml-2">Current</span>
                  )}
                </h3>
                <ul className="mt-6 space-y-4">
                  {plants.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-2xl mr-3">{item.icon}</span>
                      <div>
                        <p className="font-medium">{item.plant}</p>
                        <span
                          className={`badge mt-1 ${
                            item.action.includes('Plant') || item.action === 'Sow'
                              ? 'badge-success'
                              : item.action === 'Harvest'
                              ? 'badge-warning'
                              : 'badge-info'
                          }`}
                        >
                          {item.action}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  <button className="btn btn-sm btn-outline">
                    <FaSun className="mr-1" /> Sun Needs
                  </button>
                  <button className="btn btn-sm btn-outline">
                    <FaCloudRain className="mr-1" /> Water Tips
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-10">
          <button className="btn btn-primary">
            <FaLeaf className="mr-2" /> Full Year Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeasonalPlantingGuide;
