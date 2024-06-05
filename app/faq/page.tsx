import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "../_components/PageHeader";
import { AccordionMobile } from "./_components/AccordionMobile";

export default function FaqPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading className="hidden md:block">
          Frequently Asked Question
        </PageHeaderHeading>
        <PageHeaderHeading className="md:hidden">FAQ</PageHeaderHeading>
        <PageHeaderDescription>
          <b>Welcome to the Cobra FAQ page!</b>
          <br></br>
          This section is here to help you find quick answers to common
          questions about our snake game and other related topics
        </PageHeaderDescription>
      </PageHeader>
      <section>
        <AccordionMobile>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Neo-Snake ?</AccordionTrigger>
            <AccordionContent>
              Neo-Snake is a speedrun game named after its creator,
              &quot;Neo&quot;, and symbolizes a new or revolutionary take on the
              classic Snake game. In Neo-Snake, players can create their own
              levels and share them with the community. The main objective is to
              complete these levels as quickly as possible. The term
              &quot;neo&quot;, meaning new, emphasizes that Neo-Snake aims to
              revolutionize the traditional gameplay experience. The game is
              currently in its beta phase.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What are the inspiration of the game?
            </AccordionTrigger>
            <AccordionContent>
              The game is inspired by the classic Snake game and the trackmania
              community. The speedrun is the main focus of the game.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              A &quot;snake speedrun&quot;? But where does this crazy idea come
              from?
            </AccordionTrigger>
            <AccordionContent>
              That&apos;s not that crazy, the team think the snake game is
              pretty boring, we just want to improve it ? 😇
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              Speedrun means competition, do we gain something?
            </AccordionTrigger>
            <AccordionContent>
              Yoo, here&apos;s a crazy question! First of all, it&apos;s only a
              beta; there&apos;s nothing to win. We haven&apos;t planned to
              create a competitive scene for the game yet, so let&apos;s wait
              until the beta ends for now.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              Speedrun means competition, do we gain something?
            </AccordionTrigger>
            <AccordionContent>
              Yoo, here&apos;s a crazy question! First of all, it&apos;s only a
              beta; there&apos;s nothing to win. We haven&apos;t planned to
              create a competitive scene for the game yet, so let&apos;s wait
              until the beta ends for now.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              What are your plans for the future?
            </AccordionTrigger>
            <AccordionContent>
              Firstly, we aim to enhance the editor as the user experience is
              currently lacking. Additionally, we plan to introduce more
              features to the game and improve the graphics.
            </AccordionContent>
          </AccordionItem>
        </AccordionMobile>
      </section>
    </div>
  );
}
