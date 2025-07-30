import React from "react";
import orange from '../assets/images/OrangeLink.png'
const Mission = () => {
  return (
    <div className="w-full mt-30">
      <div className="max-w-[1296px] mx-auto">
        <div className="flex  justify-between">
          <h1 className="text-5xl font-sans font-extralight">MISSION</h1>
          <p className="text-right w-[461px] text-md">
            AfroPhuket dolor sit amet consectetur. Sed elit lectus sit ut vel
            cursus ornare at. Ipsum senectus aliquam tellus amet. Ornare
            faucibus vitae tellus sollicitudin. Suspendisse est elit felis risus
            bibendum suscipit sed velit nec. Turpis nisi integer montes. inspire
            connection and drive change
          </p>
        </div>
        <div className="text-center mt-30">
          <h1 className="text-[67.13px] font-[300] font-sans ">AFROPHUKET</h1>
          <h2
            className="text-[48px] font-sans font-[300] bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(234, 67, 11, 1), rgba(79, 61, 236, 1))",
            }}
          >
            ARCHIEVES
          </h2>
          <p className="text-center inline-block text-sm w-[409px]">
            Missed an event? Don't worry we've got you covered! Relive the magic
            and explore recaps from past Afrophuket events to stay connected to
            the movement
          </p>
          <img src={orange} className="mt-10" />
        </div>
      </div>
    </div>
  );
};

export default Mission;
