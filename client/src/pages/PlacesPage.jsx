import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../Perks";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState(" ");
  const [address, setAddress] = useState(" ");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [perks, setPerks] = useState([]);
  const [extrainfo, setExtraInfo] = useState(" ");
  const [checkin, setCheckIn] = useState(" ");
  const [checkout, setCheckOut] = useState(" ");
  const [maxguests, setMaxGuests] = useState(1);
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const {data:filename} =await axios.post('/upload-by-link', { link: photoLink });
    setAddedPhotos(prev =>{
        return [...prev,filename];
    });

    setPhotoLink('');
  }
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
            {preInput(
              "Title",
              "Title for your page must be short and catchy as in advertisement"
            )}
            {/* <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">Title for your page must be short and catchy as in advertisement</p> */}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="my lovely apartment"
            />
            {preInput("Address", "Address to your place")}
            {/* <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address to your place</p> */}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="address"
            />
            {preInput("Photos", "more = better")}
            {/* <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">more = better</p> */}
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                placeholder={"add using link...jpg"}
              ></input>
              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 px-4 rounded-2xl"
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-col-4 lg:grid-col-6">
                {addedPhotos.length>0 && addedPhotos.map(link => (
                    <div>
                        <img className="rounded-2xl" src={'http://localhost:4000/uploads/'+link} alt="" />

                    </div>
                ))}
              <button className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </button>
            </div>
            {preInput("Description", "description of the place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            ></textarea>

            {preInput("Perks", "select all the perks of your place")}
            {/* <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm">select all the perks of your place</p> */}

            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra info", "house rules,etc")}
            {/* <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">house rules,etc</p> */}
            <textarea
              value={extrainfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            ></textarea>
            {preInput(
              "Check in&out times",
              "add check-in and out times,remember to have some time window for cleaning the room between guests"
            )}
            {/* <h2 className="text-2xl mt-4">Check in&out times</h2>
                <p className="text-gray-500 text-sm">add check-in and out times,remember to have some time window for cleaning the room between guests</p> */}
            <div className="grid sm:grid-cols-3">
              <div>
                <h3 className="mt-2-mb-1">Check-in time</h3>
                <input
                  type="text"
                  value={checkin}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="14"
                ></input>
              </div>
              <div>
                <h3 className="mt-2-mb-1">Check-out time</h3>
                <input
                  type="text"
                  value={checkout}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="11"
                ></input>
              </div>
              <div>
                <h3 className="mt-2-mb-1">Max number of guests</h3>
                <input
                  type="number"
                  value={maxguests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                ></input>
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
