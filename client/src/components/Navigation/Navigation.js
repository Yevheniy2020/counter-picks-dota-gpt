import {Box} from "@mui/material";
import * as styles from "./Navigation.styles";

export default function Navigation(props) {

    return(
        <Box sx={styles.boxNavigation}  data-testid="navigation">
            {props.children}
        </Box>
    )
}
