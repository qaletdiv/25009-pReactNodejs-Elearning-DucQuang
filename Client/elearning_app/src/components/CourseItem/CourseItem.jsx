import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ course, base_url }) {
  return (
    <Card
      sx={{
        width: 300,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
      }}
    >
      <CardMedia
        sx={{
          height: 140,
          backgroundColor: "#f0f0f0", 
          objectFit: "contain",
        }}
        image={`${base_url}/${course.image}`}
        title={course.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {course.price}$
        </Typography>
         <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">Detail</Button>
      </CardActions>
    </Card>
  );
}
