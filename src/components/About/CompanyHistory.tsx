const CompanyHistory = () => {
  return (
    <section className="py-16">
      <div className="">
        <div className="grid gap-4 mx-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-3">
            <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-primary before:bg-primary">
              <h3 className="text-4xl font-bold">Our Journey</h3>
              <span className="text-sm font-bold tracking-uppercase text-foreground">
                Founded in 2024
              </span>
            </div>
          </div>
          <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
            <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-primary before:bg-primary">
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-primary before:bg-primary">
                <h3 className="text-xl font-semibold tracking-wide">
                  Our Founding
                </h3>
                <time className="text-xs tracking-uppercase dark:text-gray-400">
                  January 2024
                </time>
                <p className="mt-3">
                  Steer Away was founded in January 2024 with a vision to
                  transform the car rental industry. Our mission is to provide a
                  seamless, user-friendly experience while offering a diverse
                  fleet of well-maintained vehicles.
                </p>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-primary before:bg-primary">
                <h3 className="text-xl font-semibold tracking-wide">
                  Our Mission
                </h3>
                <time className="text-xs tracking-uppercase dark:text-gray-400">
                  2024 - Present
                </time>
                <p className="mt-3">
                  Our mission is to offer exceptional car rental services that
                  prioritize customer satisfaction and reliability. We strive to
                  make every rental experience smooth and enjoyable through
                  innovative technology and dedicated support.
                </p>
              </div>
              <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-primary before:bg-primary">
                <h3 className="text-xl font-semibold tracking-wide">
                  Our Vision
                </h3>
                <time className="text-xs tracking-uppercase dark:text-gray-400">
                  Looking Ahead
                </time>
                <p className="mt-3">
                  We envision a future where Steer Away is the leading choice
                  for car rentals, known for our commitment to quality,
                  innovation, and customer-centric solutions. We aim to expand
                  our reach and continuously enhance our services to meet
                  evolving customer needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
