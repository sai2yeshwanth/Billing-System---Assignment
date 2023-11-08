import { Box, Typography } from "@mui/material";

const Items = () => {
  return (
    <Box sx={{m:1}}>
      <Box sx={{ border: "1px solid", width: "500px", height: "50px" }}>
        <Box sx={{ display: "flex" }}>
          <Typography>Book</Typography>
          <Typography>Rs:12</Typography>
        </Box>
        <Typography>sold:12</Typography>
      </Box>
    </Box>
  );
};
export default Items;
