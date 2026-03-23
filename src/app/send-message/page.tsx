"use client";
import CustomButton from "@/components/custom-button";
import { SideBar } from "@/components/sidebar";
import { Spotlight } from "@/components/ui/spotlight";
import { TextRandomizerEffect } from "@/components/ui/text-randomizer";
import { IoSend } from "react-icons/io5";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slide, toast } from "react-toastify";

import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";
import { SocialMediaLinks } from "@/components/ui/social-media";
import { ViewCVButton } from "@/components/ui/curriculum-vitae";
import { ThemeChanger } from "@/components/ui/theme-changer";
import { AuroraBackground } from "@/components/ui/aurora-bg";
import { GridBackground } from "@/components/ui/grid-background";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const SendMessagePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (!serviceID || !templateID || !userID) {
        throw new Error("Missing EmailJS configuration");
      }

      await emailjs.send(serviceID, templateID, data, userID);
      reset();
      toast.success(
        "Thank you for your message! We will get back to you soon.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Slide,
        }
      );
      setTimeout(() => {
        router.push("/");
      }, 200);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Oops, something went wrong. Please try again.");
    }
  };

  return (
    <main className="w-full h-fit overflow-hidden">
      <AuroraBackground />
      <GridBackground />
      <SocialMediaLinks />
      <ViewCVButton />
      <ThemeChanger />
      <SideBar />
      <div className="flex flex-col items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-xl px-6"
        >
          <TextRandomizerEffect
            words="Send me a Message"
            className="text-3xl font-semibold mb-10 text-header"
            placeholder
          />

          <form className="space-y-6 font-inter" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Your name"
                aria-label="Your name"
                {...register("name")}
                className="w-full bg-transparent border-0 border-b border-header text-cfgray placeholder-zinc-400 focus:outline-none focus:border-secondary transition-colors py-3"
              />
              {errors.name && (
                <p className="text-orange-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Your email"
                aria-label="Your email"
                {...register("email")}
                className="w-full bg-transparent border-0 border-b border-header text-cfgray placeholder-zinc-400 focus:outline-none focus:border-secondary transition-colors py-3"
              />
              {errors.email && (
                <p className="text-orange-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Your message"
                aria-label="Your message"
                rows={5}
                {...register("message")}
                className="w-full bg-transparent border-0 border-b border-header text-cfgray placeholder-zinc-400 focus:outline-none focus:border-secondary transition-colors py-3 resize-y"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className="pt-2">
              <CustomButton type="submit" disabled={isSubmitting}>
                <div className="flex items-center justify-center gap-2">
                  <IoSend className="text-xl" />
                  <div>{isSubmitting ? "Sending..." : "Send"}</div>
                </div>
              </CustomButton>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default SendMessagePage;
