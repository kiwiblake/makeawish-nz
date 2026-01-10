import React from 'react';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { HeroSection } from 'components/HeroSection'; // Replaced SecondaryHeroSection
import { FundraiseOptionsCards } from 'components/FundraiseOptionsCards';
import { InfoSectionWithImage } from 'components/InfoSectionWithImage'; // Renamed import
import { CTASection } from 'components/CTASection'; // Renamed import
// We will import other components here as we build the sections

const Fundraise = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection 
          title="Fundraise in your Community"
          text="When you fundraise for Make-A-Wish, you're helping to bring the transformative power of a wish to children when they need it most. Whether it's a school event, a personal challenge, or a community gathering, your support helps create life-changing wishes for children with critical illnesses."
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/fundraiseimage.webp"
          imageAlt="Children drawing and crafting for fundraising"
          primaryButtonText="Start Fundraising"
          primaryButtonLink="/contact" // Links to contact page
          secondaryButtonText="Fundraising Ideas"
          secondaryButtonLink="#" // Placeholder link for now
        />
        <FundraiseOptionsCards />
        <InfoSectionWithImage 
          title="Fundraising at Work"
          paragraphs={[
            "Raising money with your customers and co-workers isn’t only a good way to help – it’s good for business.",
            "Whether you get the team together (in person or virtually!) for a morning tea, or take the challenge outside the office, our Fundraising team has got your back.",
            "Charity fundraising at work could include:"
          ]}
          listItems={[
            "Run a trivia or quiz night",
            "Host a bake sale, morning tea, or afternoon tea for your colleagues",
            "Encourage your team to participate in one of our fundraising events",
            "Hold a team-building event to raise funds",
            "Get involved in a state or city event like Ride For Wishes, or the City2Surf run.",
            "Place charity collection tins in the office",
            "Hold a raffle or sweepstakes"
          ]}
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/fundraisingatwork.webp"
          imageAlt="Colleagues fundraising at work"
          reverseLayout={false} // Text on left, Image on right
        />
        <InfoSectionWithImage 
          title="Fundraising at School"
          paragraphs={[
            "Kids love helping other kids – and they definitely love wishes – which makes fundraising with Make-A-Wish a great fit for your school.",
            "There are so many ways kids can get involved and challenge themselves while learning about helping others. Whatever you choose, we can help.",
            "Fundraising ideas for schools could include:"
          ]}
          listItems={[
            "Holding an art show, talent show or music event",
            "Hosting a spelling bee",
            "Hold a bake sale at your school fair",
            "Arrange a gold coin dress-up day",
            "Organise a school movie night",
            "You can also explore wish stories online and via our YouTube channel."
          ]}
          imageUrl="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/fundraisingatschool.webp"
          imageAlt="Children participating in a school fundraising event"
          reverseLayout={true} // Image on left, Text on right
        />
        <CTASection 
          title="Register now for fundraising"
          text="You can fundraise anywhere! At home, in the office, at school. Sign up today!"
          buttonText="Sign up today!"
          buttonLink="/register-fundraiser" // Placeholder link
          // Uses default pink background and white text
        />
        {/* Placeholder removed */}
      </main>
      <Footer />
    </div>
  );
};

export default Fundraise;
