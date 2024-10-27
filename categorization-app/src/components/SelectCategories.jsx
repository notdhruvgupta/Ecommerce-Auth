import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import ReactPaginate from "react-paginate";
import "./CheckBox.css";
import "./Paginate.css";
import axios from "axios";
import { addPreference } from "../apiServices";

function SelectCategories() {
  const [data, setData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [itemOffset, setItemOffset] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const generateData = () => {
      const uniqueGenres = new Set();
      const randomData = [];

      for (let i = 0; i < 100; i++) {
        const genre = faker.book.genre();

        if (!uniqueGenres.has(genre)) {
          uniqueGenres.add(genre);
          randomData.push({ id: i, gen: genre });
        }
      }

      return randomData;
    };

    const savedData = localStorage.getItem("genresData");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      const newData = generateData();
      setData(newData);
      localStorage.setItem("genresData", JSON.stringify(newData));
    }

    const fetchPreferences = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await axios.get(
          `https://revispy-frontend-intern-assignment.onrender.com/auth/get-preferences/${userId}`
        );
        const savedGenres = response.data.preferences;
        setCheckedItems(savedGenres);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const itemLength = 6;

  const endOffset = itemOffset + itemLength;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemLength);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemLength) % data.length;
    setItemOffset(newOffset);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const handleSubmitPreferences = async () => {
    const selectedGenres = data
      .filter((item) => checkedItems[item.id])
      .map((item) => item.gen);

    console.log("Selected Genres:", selectedGenres);

    const userId = localStorage.getItem("userId");

    try {
      const response = await addPreference({
        userId: userId,
        genres: selectedGenres,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error updating preferences:", error);
    }
  };

  return (
    <div className="min-h-[80%] py-10 flex justify-center items-center">
      <div className="border border-black/40 p-10 rounded-xl w-[38%]">
        <p className="text-3xl pb-5 text-center font-semibold">
          Please mark you interests!
        </p>
        <p className="text-center">We will keep you notified</p>
        <hr />

        <div className="mx-5">
          <p className="pt-8 text-lg">My saved interests!</p>
          <Items
            currentItems={currentItems}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>

        <div className="mx-5 mb-3 flex justify-center">
          <button
            onClick={handleSubmitPreferences}
            className="p-2 px-3 rounded-md bg-black uppercase text-white font-medium"
          >
            Save Preferences
          </button>
        </div>
        {message && (
          <p className="flex justify-center items-center text-sm pb-4">{message}</p>
        )}

        <div className="flex justify-center">
          <ReactPaginate
            activeClassName={"active"}
            className="flex gap-2 text-black/40 items-end select-none font-medium"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}

function Items({ currentItems, checkedItems, handleCheckboxChange }) {
  return (
    <div className="space-y-2 pt-4 pb-8 text-lg">
      {currentItems.map((entry, index) => {
        const checkboxId = `checkbox-${index}`;

        return (
          <div key={index} className="flex gap-3">
            <div className="checkbox-wrapper-30 pt-1">
              <span className="checkbox">
                <input
                  type="checkbox"
                  id={checkboxId}
                  checked={!!checkedItems[entry.id]}
                  onChange={() => handleCheckboxChange(entry.id)}
                />
                <svg>
                  <use xlinkHref="#checkbox-30" className="checkbox"></use>
                </svg>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "none" }}
              >
                <symbol id="checkbox-30" viewBox="0 0 22 22">
                  <path
                    fill="none"
                    stroke="currentColor"
                    d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13
                    c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"
                  />
                </symbol>
              </svg>
            </div>
            <label htmlFor={checkboxId}>{entry.gen}</label>
          </div>
        );
      })}
    </div>
  );
}

export default SelectCategories;
