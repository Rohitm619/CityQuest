import React from "react";
import { useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

function LeaderboardRankCard({ rank, item, setSelectedSociety }) {
  return (
    // <div className="leaderboard-rank1">
    //   <div className="leaderboard-feature-card">
    //     <h2 className="">1. Society 1</h2>
    //     <span>Address: xyz road, Pune- 411xx0</span>
    //     <img
    //       alt="image"
    //       src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=200"
    //       className="leaderboard-image1"
    //     />
    //   </div>
    // </div>
    <Card
      className="m-auto bg-gradient-to-r from-cyan-500 to-blue-500 border-0 hover:scale-105 transition-all"
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
      <div>{rank}</div>
      <AspectRatio ratio="1" sx={{ width: 70 }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {item.name}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description">
          <Link
            overlay
            underline="none"
            sx={{ color: "text.tertiary", marginBottom: 0 }}
          >
            {item.address}
          </Link>
        </Typography>
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: "none" }}
        >
          Explore more
        </Chip>
      </CardContent>
    </Card>
  );
}

export default LeaderboardRankCard;
