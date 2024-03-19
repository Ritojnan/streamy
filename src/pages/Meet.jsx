import React, { useState } from "react";
import axios from "axios";

function Meetings() {
  const [minutes, setMinutes] = useState("");
  const [pre, setPre] = useState("");
  const [summary, setSummary] = useState("");
  const [show, setShow] = useState(false);
  const transcript = `Project Manager (Sarah): Good morning, everyone. Thank you for joining us today. As you all know, we're here to discuss the launch of our newest product, EcoSpark. I'm thrilled to share with you the details of what we've been working on tirelessly for the past few months.

  Marketing Lead (Alex): Thanks, Sarah. I'll take it from here. Our marketing strategy for EcoSpark revolves around highlighting its unique features and addressing the pain points of our target audience. We'll start with teaser campaigns on social media, followed by a full-scale launch campaign across various platforms.
  
  Design Lead (Emily): Building on that, the design team has crafted visually appealing assets to accompany our marketing efforts. We have mockups, product images, and animations ready to go. Our goal is to ensure that every touchpoint reflects the elegance and functionality of EcoSpark.
  
  Sales Representative (Jason): From a sales perspective, our approach will be to emphasize the value proposition of EcoSpark. We'll equip our sales team with comprehensive training materials and provide them with the necessary resources to engage with potential customers effectively.
  
  Product Developer (Michael): I'm excited to see the culmination of our efforts. The development team has put in countless hours to ensure that EcoSpark meets the highest standards of quality and performance. We've conducted rigorous testing and gathered valuable feedback to refine the product further.
  
  Project Manager (Sarah): Great work, everyone. Now, let's move on to assigning tasks for the upcoming weeks. Alex, could you please finalize the social media calendar and coordinate with the design team for graphics?
  
  Marketing Lead (Alex): Absolutely, Sarah. I'll make sure we stay on track with our marketing schedule.
  
  Project Manager (Sarah): Emily, could you ensure that the product packaging and promotional materials are ready for production by the end of next week?
  
  Design Lead (Emily): Of course, Sarah. We'll prioritize these tasks to meet the deadline.
  
  Project Manager (Sarah): Jason, I need you to coordinate with the marketing team to develop sales collateral and training materials for our sales team.
  
  Sales Representative (Jason): No problem, Sarah. I'll collaborate closely with the marketing team to align our efforts.
  
  Project Manager (Sarah): And finally, Michael, could you provide an update on any additional features or enhancements that we can incorporate into EcoSpark before the launch?
  
  Product Developer (Michael): Certainly, Sarah. I'll review the feedback and see if there are any last-minute improvements we can make.
  
  Project Manager (Sarah): Excellent. Let's reconvene in two weeks to review our progress and address any challenges. Thank you all for your dedication and hard work.`;

  async function generateText() {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGZjMDdiMWItZDVhYS00MDEwLWJjMzEtYjRjMGJjNmNmOWJkIiwidHlwZSI6ImFwaV90b2tlbiJ9.FRpoCr6xHdRLkoW_ysOWdzAqW7gS-blH9cdHAo3NAaY",
      },
      data: {
        providers: "openai",
        text: `${transcript} generate the minutes of the meeting
        eg:-
        Attendess:......
        Agenda:......
        Discusion:.....
        Action Item:....
        Next Meeting:....
        `,
        temperature: 0.2,
        max_tokens: 1024,
        fallback_providers: "",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.openai.generated_text);
      setMinutes(response.data.openai.generated_text);
    } catch (error) {
      console.error(error);
    }
  }

  async function generatePre() {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGZjMDdiMWItZDVhYS00MDEwLWJjMzEtYjRjMGJjNmNmOWJkIiwidHlwZSI6ImFwaV90b2tlbiJ9.FRpoCr6xHdRLkoW_ysOWdzAqW7gS-blH9cdHAo3NAaY",
      },
      data: {
        providers: "openai",
        text: `this is the ${transcript} of the previous meeting, generate the pre-requisites that all the members require for next meeting`,
        temperature: 0.2,
        max_tokens: 1024,
        fallback_providers: "",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.openai.generated_text);
      setPre(response.data.openai.generated_text);
    } catch (error) {
      console.error(error);
    }
  }

  async function generateSummary() {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGZjMDdiMWItZDVhYS00MDEwLWJjMzEtYjRjMGJjNmNmOWJkIiwidHlwZSI6ImFwaV90b2tlbiJ9.FRpoCr6xHdRLkoW_ysOWdzAqW7gS-blH9cdHAo3NAaY",
      },
      data: {
        providers: "openai",
        text: `this is the transcript of meeting:-${transcript} generate the short meeting summary`,
        temperature: 0.2,
        max_tokens: 1024,
        fallback_providers: "",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.openai.generated_text);
      setSummary(response.data.openai.generated_text);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <h1
              onClick={() => setShow(true)}
              className="text-3xl font-bold tracking-tight"
            >
              Previous meetings
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Here are your previous meetings. You can chat with AI or get a
              summary of each meeting.
            </p>
          </div>
          <div className="grid gap-4">
            {show && (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="space-y-1.5 p-6 flex flex-col gap-1">
                  <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                    Sample Meeting
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Room code: eru-dsfl-ary
                  </p>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm text-muted-foreground">
                        <b>Participants</b>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Varun Tadoo
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ritojnan De
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Siddhima Mukherjee
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-0">
                  <div className="border-t border-gray-200 dark:border-gray-800">
                    <div className="grid gap-4 p-6">
                      <button
                        onClick={generatePre}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-end"
                      >
                        Pre-requisites for next meet
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-end"
                        onClick={generateSummary}
                      >
                        AI Summary
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-end"
                        onClick={generateText}
                      >
                        Minutes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="space-y-1.5 p-6 flex flex-col gap-1">
                <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                  Product Launch Meet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Room code: xsu-dvcj-tye
                </p>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm text-muted-foreground">
                      <b>Participants</b>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sarah Thompson
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Alex Rodriguez
                    </p>
                    <p className="text-sm text-muted-foreground">Emily Chen</p>
                    <p className="text-sm text-muted-foreground">Jason Patel</p>
                    <p className="text-sm text-muted-foreground">
                      Michael Johnson
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm text-muted-foreground">
                      <b>Start time</b>
                    </p>
                    <p className="text-sm text-muted-foreground">10:00 AM</p>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <div className="border-t border-gray-200 dark:border-gray-800">
                  <div className="grid gap-4 p-6">
                    <button
                      onClick={generatePre}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-end"
                    >
                      Pre-requisites for next meet
                    </button>
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-end"
                      onClick={generateSummary}
                    >
                      AI Summary
                    </button>
                    <button
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-end"
                      onClick={generateText}
                    >
                      Minutes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="space-y-1.5 p-6 flex flex-col gap-1">
                <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                  Design review
                </h3>
                <p className="text-sm text-muted-foreground">
                  Room code: 987 654
                </p>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm text-muted-foreground">
                      <b>Participants</b>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Emily Johnson
                    </p>
                    <p className="text-sm text-muted-foreground">Mike Brown</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm text-muted-foreground">
                      <b>Start time</b>
                    </p>
                    <p className="text-sm text-muted-foreground">2:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <div className="border-t border-gray-200 dark:border-gray-800">
                  <div className="grid gap-4 p-6">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-end">
                      Chat with AI
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-end">
                      AI Summary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meetings;
