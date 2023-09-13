import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { selectIsInFavorites } from "../../redux/slices/user/userSlice";
import { updateFavorites } from "../../redux/slices/user/userThunk";
import { setPetEditorData } from "../../redux/slices/petSlice";
import { getPet } from "../../services/api";
import { useNavigate } from "react-router-dom";

const PetCardActionButton = ({ id, isEditable = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFavorite = useSelector(selectIsInFavorites(id));

  const handleEdit = async () => {
    const pet = await getPet(id);
    dispatch(setPetEditorData(pet));
    navigate("/pet-editor");
  };

  const handlePetFavorite = () => {
    dispatch(updateFavorites(id));
  };
  return (
    <>
      {isEditable ? (
        <IconButton onClick={handleEdit}>
          <EditIcon color="secondary" />
        </IconButton>
      ) : (
        <IconButton color="primary" onClick={handlePetFavorite}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      )}
    </>
  );
};

export default PetCardActionButton;
