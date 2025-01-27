import React, { useCallback, useEffect, useRef, useState } from "react";
import { SearchSvg } from "../../../../svg/SearchSvg";
import {
  useAddSearchHistoryMutation,
  useGetSearchhHistoryQuery,
  useRemoveSearchHistoryMutation,
  useSearchQueryMutation,
} from "../../../../feature/api/authApi";
import { NavLink } from "react-router-dom";
import avater from "../../../../assets/defaultImage/avatar.png";
import { CrossIcon } from "../../../../svg/Cross";
import { debounce } from "lodash";

function SearchBox() {
  const inputFocus = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    inputFocus.current.focus();
  }, []);
  const [searchQuery] = useSearchQueryMutation();
  const [addSearchHistory] = useAddSearchHistoryMutation();
  const [removeSearchHistory] = useRemoveSearchHistoryMutation();
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { data: getSearchhHistory, refetch } = useGetSearchhHistoryQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const handleSearch = async () => {
    if (searchText == "") {
      setSearchText();
    } else {
      const response = await searchQuery(searchText).unwrap();
      setSearchResult(response);
    }
  };

  const handleAddSearchUser = async (searchUser) => {
    try {
      const respons = await addSearchHistory({
        searchUser: searchUser,
      }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const DebounceRemoveSearch = useCallback(
    debounce(async (removesearchUser) => {
      try {
        const reponse = await removeSearchHistory({
          removeSearchUser: removesearchUser,
        }).unwrap();
        if (reponse.message === "ok") {
          refetch();
        } else {
          console.log("not romoving now");
        }
      } catch (error) {}
    }, 300),
    [removeSearchHistory, refetch]
  );
  const handleRemoveSearch = (removesearchUser) => {
    DebounceRemoveSearch(removesearchUser);
  };

  return (
    <div className="border-secondary_color border rounded-md shadow-md bg-white w-full md:w-[360px] lg:h-80 py-2 px-4 h-52 overflow-y-auto">
      <div className="flex gap-x-2 relative overflow-hidden bg-transparent border-b border-b-secondary_color pb-2 text-black">
        <div
          className={`text-black cursor-pointer ${
            showSearch
              ? "absolute -left-6 transition-all ease-out duration-200"
              : "left-0"
          }`}
          onClick={() => inputFocus.current.focus()}>
          <SearchSvg />
        </div>
        <div className="w-[91%] ">
          <input
            type="text"
            placeholder="Search"
            className={`w-full focus:outline-none bg-white font-gilNormal`}
            ref={inputFocus}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setShowSearch(false)}
            onKeyUp={() => handleSearch()}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-3">
        {searchText == "" ||
          (searchResult == "" && (
            <p className="font-gilBold text-sm ">Recent searches</p>
          ))}
        <div>
          {getSearchhHistory &&
            searchResult == "" &&
            getSearchhHistory.map((searchUser) => (
              <div
                className="flex justify-between items-center mt-2"
                key={searchUser?.user?._id}>
                <div
                  className="flex items-center gap-x-2 "
                  onClick={() => handleAddSearchUser(searchUser?.user?._id)}>
                  <NavLink to={`/profile/${searchUser?.user?.username}`}>
                    <img
                      src={searchUser?.user?.profilePicture || avater}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  </NavLink>
                  <NavLink to={`/profile/${searchUser?.user?.username}`}>
                    <span className="font-gilNormal text-black text-base">
                      {searchUser?.user?.fname + " " + searchUser?.user?.lname}
                    </span>
                  </NavLink>
                </div>
                <div
                  className="w-7 h-7 flex items-center justify-center rounded-full text-black hover:bg-blue cursor-pointer "
                  onClick={() => handleRemoveSearch(searchUser?.user?._id)}>
                  <CrossIcon />
                </div>
              </div>
            ))}
        </div>
        {searchResult.map((item) => (
          <div
            className="flex items-center gap-x-2 mt-2"
            key={item._id}
            onClick={() => handleAddSearchUser(item._id)}>
            <NavLink to={`/profile/${item.username}`}>
              <img
                src={item.profilePicture || avater}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </NavLink>
            <NavLink to={`/profile/${item.username}`}>
              <span className="font-gilNormal text-black text-base">
                {item?.fname + " " + item?.lname}
              </span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBox;
