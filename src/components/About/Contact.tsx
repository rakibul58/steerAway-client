import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const Contact = () => {
  return (
    <section className="py-16 md:mt-24 mt-12">
      <div className="grid grid-cols-1 px-2 mx-auto md:grid-cols-2 md:divide-x">
        <div className="py-6">
          <h1 className="text-4xl font-bold">Get in touch</h1>
          <p className="pt-2 pb-4 text-foreground">
            Fill in the form to start a conversation
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              <span>(+880) 1850415714</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              <span>rhrahi14@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>Colonel Hat, Chittagong</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <span>24/7 Support Available</span>
            </div>
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
            <Textarea
              placeholder="Mirpur, Dhaka"
              rows={3}
              className="block w-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="">Message</Label>
            <Textarea
              placeholder="message..."
              rows={3}
              className="block w-full"
            />
          </div>
          <Button className="px-8 py-3 text-lg">Submit</Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
