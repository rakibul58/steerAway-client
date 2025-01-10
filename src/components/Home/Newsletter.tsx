import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSubscribeNewsletterMutation } from "@/redux/features/newsletter/newsletterApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
export default function Newsletter() {
  const [subscribeNewsletter] = useSubscribeNewsletterMutation();
  const { register, handleSubmit, reset } = useForm<{ email: string }>();

  const handleSubscribe = async (data: { email: string }) => {
    const toastId = toast.loading("subscribing in", { duration: 3000 });
    try {
      const res = await subscribeNewsletter(data?.email).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      reset();
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary/5 rounded-2xl p-8 md:p-12"
            >
              <div className="max-w-3xl mx-auto text-center">
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Stay Updated with Our Latest Offers
                </h2>
                <p className="text-muted-foreground mb-8">
                  Subscribe to our newsletter and get exclusive deals, new car
                  alerts, and insider tips delivered straight to your inbox.
                </p>
                <form
                  onSubmit={handleSubmit(handleSubscribe)}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                    placeholder="Enter your email"
                    className="flex-grow"
                  />
                  <Button type="submit" className="group">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
}
