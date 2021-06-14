import React from "react";
import { Box } from "ui";

import { Object as RicObject } from "@rightech/types/objects";

interface PageProps {
  item: RicObject;
}

export default class extends React.Component<PageProps> {
  static servicePageTitle = "examples";

  remember() {
    return {};
  }

  render() {
    return (
      <Box md>
        ## Service Page
        {Box.nl}
        Hello from `exaxmples` module
      </Box>
    );
  }
}
