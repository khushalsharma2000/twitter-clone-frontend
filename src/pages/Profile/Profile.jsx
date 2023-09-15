import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import EditProfile from "../../components/EditProfile/EditProfile";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";

import { following } from "../../redux/userSlice";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweetsData = await axios.get(`${process.env.REACT_APP_PROXY}/tweets/user/all/${id}`);
        const userProfileData = await axios.get(`${process.env.REACT_APP_PROXY}/users/find/${id}`);

        setUserTweets(userTweetsData.data);
        setUserProfile(userProfileData.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [id]); // Removed currentUser dependency

  const handleFollow = async () => {
    if (!currentUser || !userProfile) {
      // Check if currentUser or userProfile is null before accessing _id
      return;
    }

    if (!currentUser.following.includes(id)) {
      try {
        // eslint-disable-next-line no-unused-vars
        const follow = await axios.put(`${process.env.REACT_APP_PROXY}/users/follow/${id}`, {
          id: currentUser._id,
        });
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
        // eslint-disable-next-line no-unused-vars
        const unfollow = await axios.put(`${process.env.REACT_APP_PROXY}/users/unfollow/${id}`, {
          id: currentUser._id,
        });

        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  return (
    <>
      {userProfile && (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <div className="flex justify-between items-center">
              <img
                src={userProfile.profilePicture}
                alt="Profile "
                className="w-12 h-12 rounded-full"
              />
              {currentUser && currentUser._id === id ? (
                <button
                  className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </button>
              ) : currentUser && currentUser.following.includes(id) ? (
                <button
                  className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                  onClick={handleFollow}
                >
                  Following
                </button>
              ) : (
                <button
                  className="px-4 -y-2 bg-blue-500 rounded-full text-white"
                  onClick={handleFollow}
                >
                  Follow
                </button>
              )}
            </div>
            <div className="mt-6">
              {userTweets &&
                userTweets.map((tweet) => {
                  return (
                    <div className="p-2" key={tweet._id}>
                      <Tweet tweet={tweet} setData={setUserTweets} />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;

