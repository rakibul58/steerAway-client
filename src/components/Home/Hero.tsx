import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Clock, Car } from "lucide-react";
import img from "../../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="relative w-full h-[70vh] bg-cover bg-center overflow-hidden md:mt-24 mt-12" 
         style={{ backgroundImage: `url(${img})` }}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent pointer-events-none" />
      
      {/* Animated overlay effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none"
      />

      {/* Content container - moved above overlays in DOM */}
      <div className="relative z-10 container mx-auto h-full">
        <div className="flex items-center h-full max-w-2xl">
          <div className="space-y-6 px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Drive Your Dreams with{" "}
                <span className="text-primary">Steer Away</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg md:text-xl"
            >
              Experience luxury and reliability with our premium fleet. 
              Your perfect journey begins with the perfect car.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="group relative hover:scale-105 transition-transform"
              >
                <Link to="/car-listings">
                  Browse Cars
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="relative hover:scale-105 transition-transform"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/10"
            >
              <div className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Car className="h-5 w-5 text-primary" />
                <span className="text-sm">Premium Fleet</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;