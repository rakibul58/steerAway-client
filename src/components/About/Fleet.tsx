import { FleetCategories } from "@/Constants/FleetCategories";
import { useState } from "react";

const Fleet = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="py-16 px-2">
      <div className="mb-16">
        <div className="">
          <h1 className="text-4xl font-bold mb-6">Explore Our Fleet</h1>
          <p className="text-foreground max-w-2xl lg:mx-0">
            From fuel-efficient economy cars to luxurious sedans and powerful
            SUVs, we offer a diverse selection of vehicles to suit every need
            and preference. Discover the perfect vehicle for your next journey.
          </p>
        </div>
      </div>
      <div className="w-full mx-auto flex flex-col-reverse lg:flex-row gap-5">
        <div className="lg:w-1/2 flex flex-col justify-center gap-5">
          {FleetCategories.map((category, index) => (
            <div
              key={index}
              className={`p-6 cursor-pointer transition-all duration-300 ease-in-out rounded-md border ${
                activeCategory === index ? "shadow-2xl" : "opacity-50"
              }`}
              onMouseEnter={() => setActiveCategory(index)}
            >
              <h3
                className={`text-3xl font-bold ${
                  activeCategory === index ? "text-primary" : ""
                }`}
              >
                {category.title}
              </h3>
              <p className="mt-2 text-foreground">{category.description}</p>
            </div>
          ))}
        </div>
        <div className="lg:w-1/2 h-96 lg:h-auto overflow-hidden rounded">
          <img
            loading="lazy"
            src={FleetCategories[activeCategory].imageUrl}
            alt={FleetCategories[activeCategory].title}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out transform rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default Fleet;
