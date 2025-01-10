import { NextPage } from "next";

const ThanksPage: NextPage = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center">
      <p className="flex flex-wrap text-maincolor font-semibold text-2xl">
        Thanks for schedule an appointment with us!
      </p>
      <p className="flex flex-wrap text-center px-4">
        Now check the email with which you completed the authorization process,
        there will be a link to your shceduled appointment.
      </p>
    </div>
  );
};

export default ThanksPage;
