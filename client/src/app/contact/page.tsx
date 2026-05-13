import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: 'Contact Us | Rent Ride Luxury',
  description: 'Get in touch with our team for premium car rental inquiries, reservations, or general questions.',
};

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
    </main>
  );
}
