import { FunctionComponent } from "react";

// interface AboutProps {}

const About: FunctionComponent = () => {
  return (
    <div className="container m-auto flex max-w-screen-md flex-col gap-4 text-lg font-medium">
      <h1 className="mb-4 text-center text-3xl font-bold underline">
        About AlgoLang.
      </h1>
      <p>
        Welcome to AlgoLang, a unique community for those with a passion for
        mathematics and algorithms. We&apos;ve created a space where enthusiasts
        can share their creations, learn from others, and engage in meaningful
        discussions.
      </p>
      <p>
        What sets AlgoLang apart is our commitment to interactive learning.
        Here, you&apos;ll find posts that not only discuss mathematical concepts
        and algorithms but also demonstrate them in action. Our integrated
        CodeSandBox iFrames allow users to share their code along with a live
        preview, making learning a dynamic and engaging experience.
      </p>
      <p>
        At AlgoLang, we believe in the power of shared knowledge. Whether
        you&apos;re a seasoned coder, a math enthusiast, or a curious learner,
        we invite you to join our community, explore the wealth of information,
        and contribute to the collective learning. Welcome aboard!
      </p>
    </div>
  );
};

export default About;
