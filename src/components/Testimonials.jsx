import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonials.css'; 

const testimonials = [
  {
    name: 'Nadia Rahman',
    role: 'Web Developer',
    photo: 'https://i.pravatar.cc/100?img=1',
    review: 'Creative Hut helped me land my first international client. The interface is smooth, and payment is always on time!',
  },
  {
    name: 'Sajid Hossain',
    role: 'Graphic Designer',
    photo: 'https://i.pravatar.cc/100?img=2',
    review: 'I’ve worked on multiple gigs here. The lower commission rate is a game changer for freelancers in Bangladesh.',
  },
  {
    name: 'Ayesha Kabir',
    role: 'Digital Marketer',
    photo: 'https://i.pravatar.cc/100?img=3',
    review: 'Being able to withdraw through bKash and Nagad is so convenient. I feel at home while freelancing.',
  },
  {
    name: 'Rafiul Hasan',
    role: 'App Developer',
    photo: 'https://i.pravatar.cc/100?img=4',
    review: 'The support team is super responsive. I always feel heard and respected.',
  },
  {
    name: 'Fatema Jannat',
    role: 'UI/UX Designer',
    photo: 'https://i.pravatar.cc/100?img=5',
    review: 'Finally, a Bangladeshi platform that actually understands freelancers’ needs.',
  },
  {
    name: 'Mizanur Rahman',
    role: 'SEO Expert',
    photo: 'https://i.pravatar.cc/100?img=6',
    review: 'The dashboard is clean and intuitive. Finding jobs and getting paid is seamless.',
  },
  {
    name: 'Shanta Akter',
    role: 'Translator',
    photo: 'https://i.pravatar.cc/100?img=7',
    review: 'Thanks to Creative Hut, I’ve built a consistent income source while staying home.',
  },
  {
    name: 'Tanvir Islam',
    role: 'Content Writer',
    photo: 'https://i.pravatar.cc/100?img=8',
    review: 'I love how I can showcase my portfolio and get discovered without competing globally.',
  },
];

const Testimonials = () => {
  return (
    <motion.section
      className="bg-white py-20 px-6 md:px-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          What Freelancers Are Saying
        </motion.h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Real reviews from real people building careers through Creative Hut.
        </p>

        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ el: '.custom-swiper-pagination', clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  className="bg-gray-50 p-6 rounded-xl shadow-md h-full flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-blue-600 text-sm mb-2">{testimonial.role}</p>
                  <p className="text-gray-600 text-sm">"{testimonial.review}"</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom pagination container under the cards */}
          <div className="custom-swiper-pagination mt-8 flex justify-center"></div>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
