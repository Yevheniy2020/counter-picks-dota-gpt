import {Box, Typography} from "@mui/material";
import * as styles from './HeaderTitles.styles';

export default function HeaderTitles() {

    return(
        <Box  sx={styles.boxConitaner} data-testid="header-titles">
            <Typography sx={styles.title}>PICK YOUR TEAM</Typography>
            <Typography sx={styles.text}>
                Tactical wizards, brutal big men,
                and agile scouts - the choice of Dota 2 heroes is staggeringly huge and endlessly varied.
                On your way to victory, you will use incredible abilities and devastating ultimatum skills
            </Typography>
        </Box>
    )
}
