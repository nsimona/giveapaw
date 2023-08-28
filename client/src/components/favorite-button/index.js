import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const FavoriteButton = ({
  isFavourite = false,
  onClick,
  isEditable = false,
}) => {
  return (
    <>
      {isEditable ? (
        <IconButton>
          <EditIcon color="secondary" />{" "}
        </IconButton>
      ) : (
        <IconButton
          sx={{
            backgroundColor: isFavourite ? "primary.main" : "neutral.grey",
          }}
          color={isFavourite ? "neutral" : "primary"}
          onClick={onClick}
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </>
  );
};

export default FavoriteButton;
