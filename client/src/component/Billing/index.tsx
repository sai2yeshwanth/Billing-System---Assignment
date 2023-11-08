import { Box, Grid, Paper } from "@mui/material";
import Items from "../Items";
import MyBill from "../MyBill";
import NewBill from "../NewBill";
import Sales from "../Sales";
import { useEffect } from "react";

export const Billing = () => {
 
  useEffect(() => {
    getData()
  }, []);
  const getData = async ()=>{
    
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Paper>
            <MyBill />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{width: '100'}}>
            <Items />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <NewBill />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Sales />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
