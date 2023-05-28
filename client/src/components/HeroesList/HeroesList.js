import {useEffect, useState} from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Snackbar,
    Typography
} from "@mui/material";
import * as styles from "./HeroesList.styles";

export default function HeroesList({heroes, connectSelectedHeroes}) {
    const [selectedHeroes, setSelectedHeroes] = useState([])
    const [listenClick, setListenClick] = useState(false)
    const [open, setOpen] = useState(false);

    let style = {}
    if(selectedHeroes.length > 5){
        const currentArray = [...selectedHeroes];
        currentArray.splice(0, 1);
        setSelectedHeroes(currentArray);
    }

    useEffect(()=>{
        if(selectedHeroes.length > 0){
            setOpen(true);
        }
        connectSelectedHeroes(selectedHeroes)

    }, [selectedHeroes, setSelectedHeroes])

    const toggleStyles = (item) => {

        if(listenClick && listenClick === item){
            return style = {
                width: 300,
                transition: 'all 0.3s easy',
                backgroundImage: 'linear-gradient(to top, #192348, #192348, #182248, #182248, #172248)',
                outline:' 6px solid #E9FF00',
            }

        }else{
            return style = {
                width: 300,
                backgroundImage: 'linear-gradient(to top, #192348, #192348, #182248, #182248, #172248)',
            }
        }
    };

    return(
        <>
            <Snackbar
                severity="success"
                open={open}
                message={`Team: ${selectedHeroes}`}
            />
            <Box sx={styles.boxConitaner}>
                {heroes.map((item,i)=>{
                    return(
                        <Card key={i} sx={toggleStyles(item.localized_name)} onClick={() => {
                            setSelectedHeroes([...selectedHeroes, `\n ${item.localized_name}`]);
                            setListenClick(item.localized_name);
                        }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={"https://api.opendota.com" + item.img}
                                    alt="green iguana"
                                />
                                <CardContent sx={styles.cardContent}>
                                    <Typography sx={styles.textTitle} variant="h6" component="div">
                                        {item.localized_name}
                                    </Typography>
                                    <Box >
                                        <Typography sx={styles.textContent}>Roles: {item.roles?.join(', ')}</Typography>
                                        <Typography sx={styles.textContent}>Attack type: {item?.attack_type}</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })}
            </Box>
        </>
    )
}