import * as React from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { adminTabs, userTabs } from "../../assets/account-menus";
import Wrapper from "../../components/wrapper";
import UserPreferences from "../../components/user-preferences";
import UserPets from "../../components/user-pets";
import { useSelector } from "react-redux";
import PetsByStatusTab from "./pets-by-status-tab";
import SettingsTab from "./settings-tab";
import UserApplications from "../../components/user-applications";

const tabsContent = {
  user: [
    <UserPets />,
    <UserApplications />,
    <UserPreferences />,
    <SettingsTab />,
  ],
  admin: [
    <PetsByStatusTab status="pending" />,
    <PetsByStatusTab status="active" />,
    <PetsByStatusTab status="declined" />,
    <PetsByStatusTab status="archived" />,
    <SettingsTab />,
  ],
};
const getTabContent = (role, tabIndex) => tabsContent[role][tabIndex];

function Account() {
  const { search } = useLocation();
  const [value, setValue] = React.useState(0);
  const [tabs, setTabs] = React.useState(adminTabs);
  const userRole = useSelector((state) => state.user.role);

  React.useEffect(() => {
    if (userRole === "admin") {
      setTabs(adminTabs);
      return;
    }
    setTabs(userTabs);
  }, [userRole, tabs]);

  React.useEffect(() => {
    setValue(search ? parseInt(search.charAt(search.length - 1)) : 0);
  }, [search]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid>
      <Wrapper>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              {tabs.map((tab, i) => (
                <Tab label={tab} key={i} {...a11yProps(i)} />
              ))}
            </Tabs>
          </Box>
          {tabsContent[userRole].map((tab, index) => (
            <CustomTabPanel key={index} value={value} index={index}>
              {getTabContent(userRole, index)}
            </CustomTabPanel>
          ))}
        </Box>
      </Wrapper>
    </Grid>
  );
}

export default Account;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }
