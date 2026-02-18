"use client";
import { motion } from "framer-motion";
import ShinyText from "../ShinyText";
import { useRef, useState } from "react";
import Stepper, { Step } from "../Stepper";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ElasticSlider from "../ElasticSlider";
import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";
import Toast from "../Toast";

const VariableProximity = dynamic(() => import("../VariableProximity"), {
  ssr: false,
  loading: () => (
    <motion.div
      className="text-6xl text-violet-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      LET'S GET IN TOUCH!
    </motion.div>
  ),
});

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const sendEmail = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setToastMessage("Please fill in all fields.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    setIsSending(true);

    const serviceId = "service_pcb4zbv"; // Replace with your EmailJS Service ID
    const templateId = "template_yio25v7"; // Replace with your EmailJS Template ID
    const publicKey = "1jOQClSuhlIg5zknB"; // Replace with your EmailJS Public Key

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setToastMessage("Message sent successfully!");
          setToastType("success");
          setShowToast(true);
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          console.log("FAILED...", err);
          setToastMessage("Failed to send message. Please try again.");
          setToastType("error");
          setShowToast(true);
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="mx-40">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      <div ref={containerRef} className="mb-8 mt-36 relative">
        <VariableProximity
          label={"LET'S GET IN TOUCH!"}
          className={
            "text-6xl text-violet-300 hover:text-blue-300 transition-colors duration-100"
          }
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </div>
      <div className="flex my-10 ">
        <div className="w-3/5  p-4 space-y-4">
          <ShinyText
            text="Did my work spark your curiosity or make you smile?  
  If you enjoyed exploring my projects, why not get in touch? Send me a message and let's start a conversation!"
            className="text-xl font-bold"
          />
        </div>
        <div className="w-2/5  p-4">
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={sendEmail}
            backButtonText="Previous"
            nextButtonText="Next"
            finishButtonText={isSending ? "Sending..." : "Send"}
            stepCircleContainerClassName="bg-neutral-950"
          >
            <Step>
              <h2 className="mb-6 text-lg">Let's get connected!</h2>
              <div className={"flex w-full flex-col space-y-2"}>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Tyler"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </Step>
            <Step>
              <div className={"flex w-full flex-col space-y-2"}>
                <Label htmlFor="email">Your email</Label>
                <Input
                  id="email"
                  placeholder="Tyler@durden.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </Step>
            <Step>
              <h2 className="mb-6 text-lg">Any message for me?</h2>
              <div className={"flex w-full flex-col space-y-2"}>
                <Label htmlFor="message">Your Message</Label>
                <Input
                  id="message"
                  placeholder="We do not talk about ***** ****"
                  type="text"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </Step>
            <Step>
              <h2 className="mb-6 text-lg">
                That's it! Now hit the send button and I'll get back to you
                soon.
              </h2>
            </Step>
          </Stepper>
        </div>
      </div>
    </section>
  );
}
