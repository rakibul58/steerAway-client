import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img1 from '@/assets/headerImg1.jpg'
import img2 from '@/assets/headerImg2.jpg'
import img3 from '@/assets/headerImg3.jpg'
import { Button } from "../ui/button";

const featuredCars = [
  {
    id: 1,
    name: 'Toyota Corolla',
    description: 'Reliable and fuel-efficient sedan.',
    price: '৳3,500/day',
    imageUrl: img1
  },
  {
    id: 2,
    name: 'Honda Civic',
    description: 'Sporty and comfortable.',
    price: '৳4,000/day',
    imageUrl: img2
  },
  {
    id: 3,
    name: 'BMW X5',
    description: 'Luxury SUV with all the features.',
    price: '৳12,000/day',
    imageUrl: img3
  },
  // Add more cars as needed
];

const Featured = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">Featured Cars</h2>
          <p className="text-lg text-foreground mt-4">
            Explore our range of top-rated vehicles, ready for your next adventure.
          </p>
        </div>

        {/* Carousel */}
        <Slider {...settings}>
          {featuredCars.map(car => (
            <div key={car.id} className="p-4">
              <div className="bg-secondary rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{car.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{car.description}</p>
                  <p className="text-orange-500 font-bold">{car.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="text-center mt-12">
          <Button  className="px-8 py-3 text-lg rounded">Show All</Button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
