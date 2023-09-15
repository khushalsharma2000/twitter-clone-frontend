import axios from "axios";
import React, {  useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

const UserPlaceholder = ({ setUserData, userData }) => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const location = useLocation().pathname;

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(`/users/find/${id}`);
        setUserData(userProfile.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id, setUserData]);

  return <div>{userData?.username}</div>;
};

export default UserPlaceholder;
