import { Values } from "@/Constants/ValuesCommitment";

const ValuesCommitment = () => {
  return (
    <section className="py-16">
      <div className="mx-auto px-2">
        <h2 className="text-4xl font-bold mb-6">Our Values & Commitment</h2>
        <p className="text-foreground mb-12 max-w-2xl">
          We are driven by our core values, which shape our commitment to our
          customers, our community, and the planet. Discover what motivates us
          to continually deliver excellence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {Values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-secondary rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-full"
            >
              <img
                src={value.icon}
                alt={value.title}
                className="w-16 h-16 mb-4"
              />
              <div>
                <h3 className="text-2xl font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-foreground">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesCommitment;
