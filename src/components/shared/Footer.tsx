/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

const Footer = () => {
  const handleNewsletterSubmit = (e: any) => {
    e.preventDefault();
    // Handle newsletter submission
  };

  return (
    <footer className="bg-secondary mt-20">
      {/* Newsletter Section */}
      <div className="container py-12">
        <div className="bg-primary text-primary-foreground p-8 rounded-xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Join Our Newsletter</h3>
              <p className="text-primary-foreground/80">
                Stay updated with our latest offers, new vehicles, and exclusive deals
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white text-foreground"
              />
              <Button variant="secondary">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">SteerAway</h2>
            <p className="text-muted-foreground">
              Your trusted partner in car rentals, providing premium vehicles and exceptional service since 2010.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>support@steeraway.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>123 Main St, City, State</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-muted-foreground hover:text-primary">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-muted-foreground hover:text-primary">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-muted-foreground hover:text-primary">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div>
            <h3 className="font-bold mb-4">Vehicle Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vehicles/luxury" className="text-muted-foreground hover:text-primary">
                  Luxury Cars
                </Link>
              </li>
              <li>
                <Link to="/vehicles/suv" className="text-muted-foreground hover:text-primary">
                  SUVs
                </Link>
              </li>
              <li>
                <Link to="/vehicles/electric" className="text-muted-foreground hover:text-primary">
                  Electric Vehicles
                </Link>
              </li>
              <li>
                <Link to="/vehicles/economy" className="text-muted-foreground hover:text-primary">
                  Economy Cars
                </Link>
              </li>
              <li>
                <Link to="/vehicles/premium" className="text-muted-foreground hover:text-primary">
                  Premium Cars
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 SteerAway. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;