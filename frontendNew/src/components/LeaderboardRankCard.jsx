import React from "react";
import { useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

function LeaderboardRankCard({
  rank,
  item,
  setSelectedSociety,
  selectedSociety,
}) {
  const isSocietySelected = selectedSociety.name === item.name;
  return (
    <Card
      className={`m-auto bg-gradient-to-r ${
        isSocietySelected
          ? `from-cyan-500 to-blue-500`
          : `from-slate-700 to-slate-900`
      } border-0 hover:scale-105 transition-all`}
      variant="outlined"
      orientation="horizontal"
      onClick={() => setSelectedSociety(item)}
      sx={{
        width: 320,
        height: 100,
        "&:hover": {
          boxShadow: "lg",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <div
        className={`${
          isSocietySelected ? "text-black" : "text-white"
        } font-bold underline`}
      >
        {rank}
      </div>
      <AspectRatio ratio="1" sx={{ width: 70 }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography
          level="title-lg"
          className={isSocietySelected ? "text-black" : "text-white"}
          id="card-description"
        >
          {item.name}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description">
          <Link overlay underline="none" sx={{ marginBottom: 0 }}>
            {item.address}
          </Link>
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: "none" }}
        >
          <p className="text-gray-500">Explore more</p>
        </Chip>
      </CardContent>
    </Card>
  );
}

export default LeaderboardRankCard;
