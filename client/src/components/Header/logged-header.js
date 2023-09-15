import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { adminTabs, userTabs } from "../../assets/account-menus";
import * as api from "../../services/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPetEditorData } from "../../redux/slices/petSlice";
import { setUser } from "../../redux/slices/user/userSlice";
import { setAlert } from "../../redux/slices/app/appSlice";

function LoggedHeader() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userMenu, setUserMenu] = React.useState([]);
  const userRole = useSelector((state) => state.user.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorElUser);

  React.useEffect(() => {
    if (userRole === "admin") {
      setUserMenu(adminTabs);
      return;
    }
    setUserMenu(userTabs);
  }, [userRole, userMenu]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signout = async () => {
    try {
      const response = await api.signout();
      dispatch(setUser(response));
      navigate("/", { replace: true }); // <-- redirect
    } catch (error) {
      dispatch(
        setAlert({
          severity: "error",
          message: `Грешка при изход, ${
            error.response.data.errors[0].message || ""
          }`,
        })
      );
    }
  };

  return (
    <>
      <NavLink to="/pet-editor">
        {userRole !== "admin" && (
          <Button
            variant="contained"
            sx={{ mr: { sm: 0, md: 3 }, px: { sm: 0, md: 3 } }}
            onClick={() => dispatch(resetPetEditorData())}
          >
            <AddCircleOutlineOutlinedIcon sx={{ mr: { sm: 0, md: 1 } }} />

            <Typography
              variant="body2"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              добави нов
            </Typography>
          </Button>
        )}
      </NavLink>

      <NavLink to="/favorites">
        <IconButton color="primary">
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </NavLink>
      {/* <IconButton color="primary" onClick={handleOpenNtfMenu}>
        <Badge color="secondary" variant="dot" overlap="circular">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton> */}
      {/* <Menu
        id="ntf-menu"
        anchorEl={anchorNtf}
        open={openNtf}
        onClose={handleCloseNtfMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem>Ntf</MenuItem>
      </Menu> */}
      <IconButton color="primary" onClick={handleOpenUserMenu}>
        <Person2OutlinedIcon />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorElUser}
        open={open}
        onClose={handleCloseUserMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        disableScrollLock={true}
      >
        {userMenu.map((menu, i) => (
          <MenuItem
            component="a"
            href={`/account?tab=${i}`}
            key={i}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/account?tab=${i}`);
            }}
          >
            {menu}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={signout}>Изход</MenuItem>
      </Menu>
    </>
  );
}

export default LoggedHeader;
