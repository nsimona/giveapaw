import { Card, CardMedia } from "@mui/material";
import "./flip-card.css";

const FlipCard = ({ title, subtitle, image }) => {
  return (
    <Card className="tile" sx={{ width: "100%" }}>
      <CardMedia sx={{ height: 270 }} image={image} className="tile-image" />
      <div className="details">
        <span className="title">{title}</span>
        <span className="info">{subtitle}</span>
      </div>
    </Card>
  );
};

export default FlipCard;
