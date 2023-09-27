/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import Application from ".";
import { getApplication } from "../../services/api";
import { setAlert } from "../../redux/slices/app/appSlice";
import { useEffect, useState } from "react";

const ExisitingApplicationWrapper = ({ applictionId }) => {
  const [application, setApplication] = useState({});
  const dispatch = useDispatch();

  const getExistingApplication = async () => {
    try {
      const existingApplication = await getApplication(applictionId);
      setApplication(existingApplication);
    } catch (error) {
      dispatch(setAlert({ type: "error", message: error }));
    }
  };

  useEffect(() => {
    getExistingApplication();
  }, []);

  return <Application application={application} readOnly />;
};

export default ExisitingApplicationWrapper;
