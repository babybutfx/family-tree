import React, { useEffect, useRef } from "react";
import { Divider, Container, Box, Typography, Grid } from "@mui/material";

import BFamilyTree from "@balkangraph/familytree.js";
import "./FamilyTree.css";
import useFamilyInfoStore from "../hooks/useFamilyInfoStore";

BFamilyTree.templates.tommy_male.field_2 =
  '<text style="font-size: 16px;" fill="#ffffff" x="11.8" y="51">{val}</text>';
BFamilyTree.templates.tommy_female.field_2 =
  '<text style="font-size: 16px;" fill="#ffffff" x="11.8" y="51">{val}</text>';

BFamilyTree.templates.tommy_male.field_3 =
  '<text style="font-size: 16px;" fill="#ffffff" x="150" y="51">{val}</text>';
BFamilyTree.templates.tommy_female.field_3 =
  '<text style="font-size: 16px;" fill="#ffffff" x="150" y="51">{val}</text>';

const FamilyTree = () => {
  const { familyInfo } = useFamilyInfoStore();
  const treeRef = useRef();

  useEffect(() => {
    new BFamilyTree(treeRef.current, {
      nodeBinding: {
        field_0: "firstname",
        field_1: "lastname",
        field_2: "birthday",
        field_3: "gender",
      },
      nodes: [...familyInfo],
    });
  }, [familyInfo]);

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
