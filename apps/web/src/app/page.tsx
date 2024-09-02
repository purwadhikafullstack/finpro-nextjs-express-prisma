// project-imports
import Hero from 'sections/landing/Hero';
// import Technologies from 'sections/landing/Technologies';
import Combo from 'sections/landing/Combo';
import Apps from 'sections/landing/Apps';
import Testimonial from 'sections/landing/Testimonial';
import Partner from 'sections/landing/Partner';
import ContactUs from 'sections/landing/ContactUs';
import SimpleLayout from 'layout/SimpleLayout';

// ==============================|| LANDING PAGE ||============================== //

export default function Landing() {
  return (
    <SimpleLayout>
      <Hero />
      {/* <Technologies /> */}
      <Combo />
      <Apps />
      <Testimonial />
      <Partner />
      <ContactUs />
    </SimpleLayout>
  );
}
