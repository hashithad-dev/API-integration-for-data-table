import emailjs from "@emailjs/browser";

interface EmailData {
  [key: string]: any;
}

interface EmailConfig {
  serviceId?: string;
  templateId: string;
  publicKey?: string;
}

export const sendEmail = async (data: EmailData, config: EmailConfig): Promise<void> => {
  const serviceId = config.serviceId || import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const publicKey = config.publicKey || import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !publicKey) {
    throw new Error("EmailJS not configured. Please set up your EmailJS credentials in .env file.");
  }

  await emailjs.send(serviceId, config.templateId, data, publicKey);
};