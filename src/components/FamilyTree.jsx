import React, { useEffect, useRef } from "react";
import { Divider, Container, Box, Typography, Grid } from "@mui/material";

import BFamilyTree from "@balkangraph/familytree.js";
import "./FamilyTree.css";

BFamilyTree.templates.tommy_male.field_2 =
  '<text style="font-size: 16px;" fill="#ffffff" x="11.8" y="51">{val}</text>';
BFamilyTree.templates.tommy_female.field_2 =
  '<text style="font-size: 16px;" fill="#ffffff" x="11.8" y="51">{val}</text>';

const FamilyTree = () => {
  const treeRef = useRef();

  useEffect(() => {
    new BFamilyTree(treeRef.current, {
      nodeBinding: {
        field_0: "name",
        field_1: "born",
        field_2: "gender",
      },
      nodes: [
        {
          id: 1,
          pids: [2],
          name: "Ell Selest",
          gender: "male",
          born: "10-05-2000",
        },
        { id: 2, pids: [1, 4, 5], name: "Bear Fuffy", gender: "female" },
        { id: 3, fid: 1, name: "Casper Selest", gender: "male" },
        { id: 4, pids: [2], name: "Darin Selest", gender: "male" },
        { id: 5, pids: [2], name: "Hadis Selest", gender: "male" },
      ],
    });
  }, []);
  return (
    <Grid>
      <Grid>
        <Container>
          <Box py={4}>
            <Box>
              <Typography variant="h4">Tree Membership</Typography>
            </Box>
            <Divider />
          </Box>
        </Container>
      </Grid>
      <Grid>
        <div ref={treeRef} />
      </Grid>
    </Grid>
  );
};

export default FamilyTree;
