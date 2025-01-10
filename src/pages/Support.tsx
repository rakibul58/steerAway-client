import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare, FileText, Shield, HelpCircle } from "lucide-react";

const SupportPage = () => {
  const faqs = [
    {
      question: "How do I rent a car?",
      answer:
        "To rent a car, simply browse our available vehicles, select your desired dates, and complete the booking process. You'll need a valid driver's license and credit card.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel your reservation up to 24 hours before the pickup time for a full refund. Cancellations within 24 hours may be subject to a fee.",
    },
    {
      question: "Do you offer insurance?",
      answer:
        "Yes, we offer various insurance options including basic coverage and premium protection packages. You can select your preferred coverage during booking.",
    },
    {
      question: "What documents do I need to rent a car?",
      answer:
        "You'll need a valid driver's license, credit card in the renter's name, and proof of insurance. International renters may need additional documentation.",
    },
  ];

  const helpCategories = [
    {
      title: "Booking Support",
      icon: <MessageSquare className="h-6 w-6" />,
      description: "Get help with reservations and bookings",
      content: (
        <div className="mt-6 space-y-4 text-left">
          <h4 className="font-semibold">Reservation Process</h4>
          <p>
            Our booking system allows you to reserve vehicles 24/7. Follow these
            steps:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Choose your preferred vehicle from our available fleet</li>
            <li>Select insurance and additional options</li>
            <li>Complete payment information</li>
            <li>Receive confirmation with booking details</li>
          </ul>

          <h4 className="font-semibold mt-6">Modification & Cancellation</h4>
          <p>
            Reservations can be modified or canceled through your account or by
            contacting our support team. Remember our 24-hour cancellation
            policy for full refunds.
          </p>
        </div>
      ),
    },
    {
      title: "Account Help",
      icon: <Shield className="h-6 w-6" />,
      description: "Manage your account settings and preferences",
      content: (
        <div className="mt-6 space-y-4 text-left">
          <h4 className="font-semibold">Account Management</h4>
          <p>Your account provides access to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Booking history and upcoming reservations</li>
            <li>Personal information and documents</li>
          </ul>

          <h4 className="font-semibold mt-6">Security Features</h4>
          <p>
            We implement industry-standard security measures to protect your
            account, including two-factor authentication and encrypted data
            storage.
          </p>
        </div>
      ),
    },
    {
      title: "Technical Support",
      icon: <HelpCircle className="h-6 w-6" />,
      description: "Resolve technical issues and get assistance",
      content: (
        <div className="mt-6 space-y-4 text-left">
          <h4 className="font-semibold">Common Technical Issues</h4>
          <p>Here are solutions to frequent technical challenges:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>App crashes: Ensure you have the latest version installed</li>
            <li>
              Payment issues: Verify your card information and billing address
            </li>
            <li>Location services: Enable GPS for accurate pickup/drop-off</li>
          </ul>

          <h4 className="font-semibold mt-6">System Requirements</h4>
          <p>
            Our platform supports all major browsers and mobile devices running
            recent operating systems.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="md:mt-24 mt-12 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">
          How can we help you?
        </h1>
        <p className="text-muted-foreground mb-8">
          Find answers to your questions and get the support you need
        </p>
      </motion.div>

      {/* Help Center Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Help Center</h2>
        <div className="grid grid-cols-1 gap-8">
          {helpCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="text-primary mr-4">{category.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
              {category.content}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Terms & Privacy Section */}
      <section className="mb-16 space-y-8">
        <div className="bg-card rounded-lg p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-primary mr-4" />
            <h2 className="text-2xl font-semibold">Terms & Conditions</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">
                1. Rental Agreement
              </h3>
              <p className="text-muted-foreground">
                This rental agreement constitutes a contract between you ("the
                renter") and SteerAway ("the company"). By completing a
                reservation, you agree to the terms outlined in this document.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                2. Eligibility Requirements
              </h3>
              <p className="text-muted-foreground">
                Renters must be at least 21 years of age and possess a valid
                driver's license. Additional requirements may apply for luxury
                vehicles or international rentals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">3. Payment Terms</h3>
              <p className="text-muted-foreground">
                Payment is required at the time of reservation. We accept major
                credit cards and digital payment methods. A security deposit may
                be required.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">4. Vehicle Usage</h3>
              <p className="text-muted-foreground">
                Vehicles must be used in accordance with local laws and
                regulations. Unauthorized use, including off-road driving or
                international travel without permission, is prohibited.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary mr-4" />
            <h2 className="text-2xl font-semibold">Privacy Policy</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Data Collection</h3>
              <p className="text-muted-foreground">
                We collect personal information necessary for providing our
                service, including but not limited to name, contact details,
                driver's license information, and payment details.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Data Usage</h3>
              <p className="text-muted-foreground">
                Your information is used to process reservations, verify
                identity, communicate about your rental, and improve our
                services. We do not sell personal information to third parties.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Data Protection</h3>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your
                data. This includes encryption, secure servers, and regular
                security audits.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Your Rights</h3>
              <p className="text-muted-foreground">
                You have the right to access, correct, or delete your personal
                information. Contact our privacy team to exercise these rights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
