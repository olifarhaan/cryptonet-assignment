import React, { useEffect, useState } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNo: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://randomuser.me/api/?page=1&results=1&seed=abc",
          {
            method: "GET",
          }
        );
        const responseJSON = await res.json();
        console.log(responseJSON, "response jsobn");
        setData({
          image: responseJSON.results[0]?.picture?.large,
          firstName: responseJSON.results[0]?.name?.first,
          lastName: responseJSON.results[0]?.name?.last,
          gender: responseJSON.results[0]?.gender,
          phoneNo: responseJSON.results[0]?.phone,
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <main className="bg-[#060608] w-full min-h-screen px-2 text-white bg-[url('./assets/square.svg')]">
        Loading...
      </main>
    );

  return (
    <main className="bg-[#060608] w-full min-h-screen px-2 text-white bg-[url('./assets/square.svg')]">
      <div className="pt-40">
        <div className=" max-w-sm mx-auto self-center rounded-md bg-gradient-to-b from-[#848498] to-[#2F2D32] hover:bg-gradient-to-t transition  duration-500 ease-in-out p-[2px]">
          <div className="flex relative gap-3 w-full items-center justify-center rounded-md bg-[#17171B] p-4 sm:p-8">
            <div className="w-full h-full ">
              <div className="relative">
                <img
                  src={data.image}
                  alt={"User profile"}
                  className="border rounded-full"
                />
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-4">
              <div className="flex justify-start gap-8">
                <div className="flex flex-col">
                  <span className="text-[#A0A0AA] text-xs">First Name</span>
                  <span className="truncate">{data.firstName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#A0A0AA] text-xs">Last Name</span>
                  <span className="truncate">{data.lastName}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <span className="text-[#A0A0AA] text-xs">Gender</span>

                  {data.gender === "female" ? (
                    <span className="flex items-center">
                      Female <IoMdFemale className="text-[#958CF8]" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Male <IoMdMale className="text-[#958CF8]" />
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <span className="text-[#A0A0AA] text-xs">Phone</span>
                  <span>{data.phoneNo}</span>
                </div>
              </div>
            </div>

            <div className="absolute top-2 left-2 px-1 bg-[#958CF8] text-white rounded text-[0.7rem]">
              User
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
