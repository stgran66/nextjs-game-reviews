import Heading from '../../components/Heading';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <>
      <Heading>About</Heading>
      <section>
        <h2 className='font-bold text-lg pb-2'>Our Mission</h2>
        <p>
          At <strong>Indie Gamer</strong>, our mission is simple: to shine a
          spotlight on indie games and the talented developers behind them. We
          believe that indie games are a treasure trove of creativity,
          innovation, and unique experiences waiting to be discovered. Our goal
          is to provide a platform where indie games receive the attention and
          recognition they deserve.
        </p>
      </section>
      <section>
        <h2 className='font-bold text-lg pb-2 pt-2'>What Sets Us Apart</h2>
        <ul>
          <li>
            <strong>Unbiased Reviews:</strong> Our reviews are honest,
            impartial, and focused solely on the merits of each game. We believe
            in providing fair and constructive feedback to help both gamers and
            developers.
          </li>
          <li>
            <strong>Passion for Indie Games:</strong> We are not just reviewers;
            we are indie game enthusiasts. We understand the dedication and
            passion that indie developers pour into their projects, and we
            celebrate their achievements.
          </li>
          <li>
            <strong>Diverse Selection:</strong> From pixel art adventures to
            experimental narratives, our reviews cover a wide spectrum of indie
            games. We appreciate the diversity of indie titles and aim to
            explore them all.
          </li>
        </ul>
      </section>
      <section>
        <h2 className='font-bold text-lg pb-2 pt-2'>Meet Our Team</h2>
        <p>
          Our team is made up of gamers, writers, and developers who share a
          deep love for indie games. We come from various backgrounds and bring
          diverse perspectives to our reviews. Get to know our team and discover
          the unique voices behind our reviews.
        </p>
      </section>
      <section>
        <h2 className='font-bold text-lg pb-2 pt-2'>Join Our Community</h2>
        <p>
          We invite you to become part of our indie game-loving community.
          Whether you&apos;re a developer looking for exposure or a gamer
          seeking your next indie gem, <strong>Indie Gamer</strong> is the place
          to be. Connect with us on social media, share your thoughts, and
          let&apos;s embark on this indie game journey together.
        </p>
      </section>
    </>
  );
}
