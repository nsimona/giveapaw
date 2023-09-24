import { Card, CardMedia } from "@mui/material";
import "./flip-card.css";

const FlipCard = ({ title, subtitle }) => {
  return (
    <Card className="tile" sx={{ width: "100%" }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://d.newsweek.com/en/full/2201052/dog.jpg?w=1600&h=1200&q=88&f=56687919043018e29fc48209d009e5ca"
        className="tile-image"
      />
      <div className="details">
        <span className="title">{title}</span>
        <span className="info">{subtitle}</span>
      </div>
    </Card>
  );
};

export default FlipCard;
