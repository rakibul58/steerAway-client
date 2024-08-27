import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { SellingPoints } from "@/Constants/SellingPoints";
import { TSellingPoints } from "@/Types/Home";

const WhyChooseUs = () => {
  return (
    <section className="py-16">
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-left">
            <h2 className="text-3xl font-bold sm:text-4xl">Why Choose Us?</h2>

            <p className="mt-4 text-foreground">
              Discover the many advantages of choosing our car rental services.
              From unbeatable prices and a vast selection of vehicles to our
              24/7 customer support, we strive to provide you with a seamless
              and enjoyable experience every step of the way. Whether you’re
              planning a weekend getaway or a business trip, our dedicated team
              is here to ensure you find the perfect vehicle to suit your needs.
            </p>

            <Button className="mt-8 rounded px-12 py-6 text-sm transition focus:outline-none focus:ring font-bold">
              <Link to={"/signUp"}>Get Started Today</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {SellingPoints.map((item: TSellingPoints) => (
              <div key={item.id} className="block rounded-xl border p-4 shadow-lg hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
                <span className="inline-block rounded-lg bg-secondary p-3">
                  {
                        item.icon
                  }
                </span>

                <h2 className="mt-2 font-bold">{item.title}</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-xs text-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
