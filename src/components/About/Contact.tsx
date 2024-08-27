import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const Contact = () => {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 px-2 mx-auto md:grid-cols-2 md:divide-x">
        <div className="py-6">
          <h1 className="text-4xl font-bold">Get in touch</h1>
          <p className="pt-2 pb-4 text-foreground">
            Fill in the form to start a conversation
          </p>
          <div className="space-y-4 text-foreground">
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 sm:mr-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Fake address, 9999 City</span>
            </p>
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 sm:mr-6"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <span>1-800-123-4567</span>
            </p>
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 sm:mr-6"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span>support@steer_away.com</span>
            </p>
          </div>
        </div>
        <form className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
          <div className="flex flex-col gap-3">
            <Label className="">Full name</Label>
            <Input
              type="text"
              placeholder="John Doe"
              className="block w-full rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="">Email address</Label>
            <Input
              type="email"
              placeholder="john@doe.com"
              className="block w-full rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="">Phone</Label>
            <Input
              type="tel"
              placeholder="+880"
              className="block w-full rounded-md shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="">Address</Label>
            <Textarea placeholder="Mirpur, Dhaka" rows={3} className="block w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="">Message</Label>
            <Textarea placeholder="message..." rows={3} className="block w-full" />
          </div>
          <Button className="px-8 py-3 text-lg">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
