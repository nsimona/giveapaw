import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid";
import { IconButton, Tooltip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { setPetEditorData } from "../../redux/slices/petSlice";

const PetEditorUploadPhotos = () => {
  const { selectedFiles, selectedCoverIndex } = useSelector(
    (state) => state.petEditor
  );
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).map((file) => {
      return {
        name: file.name,
        url: window.URL.createObjectURL(file),
      };
    });
    dispatch(setPetEditorData({ selectedFiles: [...selectedFiles, ...files] }));
  };

  const handleDelete = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    dispatch(setPetEditorData({ selectedFiles: updatedFiles }));
    if (index === selectedCoverIndex) {
      dispatch(setPetEditorData({ setSelectedCoverIndex: 0 }));
    }
  };

  // const imageURLs = useMemo(
  //   () => selectedFiles.map((file) => URL.createObjectURL(file)),
  //   [selectedFiles]
  // );

  return (
    <Grid container>
      <Grid item sx={{ justifyContent: "center" }} xs={12}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="upload-files"
        />
        <label
          htmlFor="upload-files"
          style={{ display: "block", textAlign: "center" }}
        >
          <Button variant="contained" component="span">
            Качи снимки
          </Button>
        </label>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ textAlign: "center" }}
          sx={{ my: 2 }}
        >
          Избери до 6 снимки, не повече от 2MB всяка
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {selectedFiles.map((file, index) => {
          return (
            <Grid item md={4} sm={12} xs={12} key={file.name}>
              <Card key={index}>
                <CardMedia
                  component="div"
                  style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${selectedFiles[index].url})`,
                    height: 150,
                  }}
                />
                <CardActions sx={{ justifyContent: "end" }}>
                  <Tooltip title="Изтрий">
                    <IconButton
                      size="small"
                      aria-label="delete"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Направи главна">
                    <IconButton
                      size="small"
                      aria-label="star"
                      color={selectedCoverIndex === index ? "primary" : ""}
                      onClick={() =>
                        dispatch(
                          setPetEditorData({ selectedCoverIndex: index })
                        )
                      }
                    >
                      <StarIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default PetEditorUploadPhotos;
