import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { HeroSection } from 'components/HeroSection';
import { InfoSectionWithImage } from 'components/InfoSectionWithImage';
import { GiftInKindForm } from 'components/GiftInKindForm';
import { Gift, Gamepad2, Plane, Ticket, ShoppingBag, Utensils, Sparkles, Heart } from 'lucide-react';

// Gift categories we'd love to receive
const giftCategories = [
  { icon: Gamepad2, title: "Technology & Gaming", description: "Consoles, tablets, VR headsets" },
  { icon: Plane, title: "Travel Experiences", description: "Flights, hotel stays, theme parks" },
  { icon: Ticket, title: "Event Tickets", description: "Sports, concerts, attractions" },
  { icon: Gift, title: "Toys & Games", description: "Board games, outdoor equipment" },
  { icon: ShoppingBag, title: "Gift Vouchers", description: "Retail, entertainment, dining" },
  { icon: Utensils, title: "Experiences", description: "Cooking classes, adventure activities" },
  { icon: Sparkles, title: "Special Items", description: "Costumes, party supplies, decorations" },
  { icon: Heart, title: "Services", description: "Professional services, entertainment" },
];

const DonateGiftInKind = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          title="Donate a Gift in Kind"
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/fundraisingatschool.webp"
          imageAlt="Children enjoying special experiences"
          buttonText="Donate a Gift"
          buttonLink="#donation-form"
          buttonBgColor="bg-destructive"
          buttonTextColor="text-white"
        />

        {/* What are gifts in kind? */}
        <InfoSectionWithImage
          title="What are gifts in kind?"
          text="<p>A Gift in Kind is a non-monetary donation of goods, services or experiences. This could be anything from VIP seats at a rugby match, accommodation for a family during their wish trip, or a special dining experience at a local restaurant.</p><p>The generosity of New Zealand businesses and community supporters makes our wish-granting possible. From technology and travel to unique experiences, your contribution - big or small - can help create magical moments for wish children across Aotearoa.</p>"
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/Jaspers-Wish.webp"
          imageAlt="Child receiving a special gift"
          reverseLayout={false}
        />

        {/* How to donate */}
        <InfoSectionWithImage
          title="How to donate a gift in kind"
          text="<p>Ready to make a difference? Simply fill out our donation form below and our team will get back to you. We welcome gifts from both individuals and organisations.</p><p>Every wish child is unique, so we may not always have a wish that matches your specific offer right away. If that's the case, we'll work with you to explore other meaningful ways you can support Make-A-Wish New Zealand.</p>"
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/fundraiseimage.webp"
          imageAlt="Make-A-Wish team member"
          reverseLayout={true}
          backgroundColor="bg-gray-50"
        />

        {/* Gifts we'd love to receive */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
              Gifts we would love to receive!
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Certain items, services and experiences are particularly helpful for granting wishes.
              Here are some of the things we're often looking for:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {giftCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors"
                >
                  <category.icon className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality control framework */}
        <InfoSectionWithImage
          title="Quality control framework"
          text="<p>The safety and wellbeing of our wish children is our top priority. We have established quality guidelines to ensure every Gift in Kind meets our standards and creates a positive wish experience.</p><p>Depending on your donation, we may need the following documentation:</p>"
          bulletPointsText={`Proof of being a registered company/sole trader/charity - Any company or small business providing services on a wish must be registered with the New Zealand Companies Office and provide us with their New Zealand Business Number (NZBN). Charities must be registered with Charities Services NZ and provide their registration number.
Public Liability Insurance - Any tradesperson, venue etc. must have public liability insurance and provide us with a copy of their certificate.
Evidence of the normal cost of your gift - In order for us to report on your donation for any audit purposes, we need written confirmation from you (e.g., an email) of how much you would normally charge for the goods or services that you are offering Make-A-Wish New Zealand.
Proof of purchase - If you are donating items, tickets or experiences that you have purchased, you will need to provide us with proof of purchase to show where and how it was purchased, along with official booking details.`}
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/fundraisingatwork.webp"
          imageAlt="Quality assurance process"
          reverseLayout={false}
          backgroundColor="bg-gray-50"
        />

        {/* Donation Form */}
        <GiftInKindForm />

        {/* Story/Testimonial Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Your generosity creates lasting memories
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Every Gift in Kind helps us create special moments for wish children across New Zealand.
                Whether it's tickets to see their favourite team play, a family meal at a special restaurant,
                or technology that brings joy during treatment - your donation becomes part of a child's
                wish story. These contributions allow families to focus on what matters most: being together
                and creating happy memories.
              </p>
              <a
                href="/wish-stories"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-full transition duration-300"
              >
                Read Wish Stories
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DonateGiftInKind;
