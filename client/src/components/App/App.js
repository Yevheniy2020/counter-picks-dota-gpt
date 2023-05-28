import {sendChatGPT,postTeams, getTeams} from "../../http/api.js";
import React, {useEffect, useState, useRef} from "react";
import {Box, Button, Typography, Modal ,CircularProgress , TextField, Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Footer from '../Footer'
import Navigation from '../Navigation'
import HeaderTitles from '../HeaderTitles'
import Heroes from "../Heroes";

import * as styles from './App.styles'
import {isDisabled} from "@testing-library/user-event/dist/utils";

export default function App() {
    const [searchSomeHero, setSearchSomeHero]= useState('');
    const [selectedHeroes, setSelectedHeroes]= useState('');
    const [answerGPT, setAnswerGPT] = useState('');
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [loading, setLoading] = useState(true);
    const [teamDB, setTeamDB] = useState([])
    const [buttonDB, setbuttonDB] = useState(false)

    const descriptionElementRef = useRef(null);

    //handle
    const handleOpenModal1 = () => {
        setbuttonDB(false)
        setOpenModal1(true)

        if(selectedHeroes == ''){

            setAnswerGPT('You didn`t select heroes')
            setLoading(false)
        }else{

            getAnswerChatGPT(selectedHeroes).then(res => {
                setAnswerGPT(res.data)
                setLoading(false)
            });
        }
    };
    const handleCloseModal1 = () => {
        setOpenModal1(false)
        setAnswerGPT('')
        setLoading(true)
    };

    const handleOpenModal2 = (scrollType) => () => {
        setOpenModal2(true);
        setScroll(scrollType);
        getTeamsDB().then(res => {
            setTeamDB(res.data)
        }).catch(err => {
            console.log('useEffect error getTeamsDB');
        })
    };

    const handleCloseModal2 = () => {
        setOpenModal2(false);
    };

    const handleButton = () =>{
        postTeamsDB(selectedHeroes,answerGPT).then(res => {
        }).catch(err => console.log(err));
        setbuttonDB(true)
    }

    //effect

    useEffect(()=>{
        getTeamsDB().then(res => {
            setTeamDB(res.data)
            // console.log(teamDB)
        }).catch(err => {
            console.log('useEffect error getTeamsDB');
        })
    }, [])

    useEffect(() => {
        if (openModal2) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openModal2]);


    //api methods

    const getAnswerChatGPT = async (text) =>{

        const res = await sendChatGPT(text);
        return res
    }
    const postTeamsDB = async (team,answer) =>{

        const res = await postTeams(team,answer);
        return res
    }

    const getTeamsDB = async () =>{

        const res = await getTeams();
        return res
    }

    const connectSelectedHeroes = (data) =>{
        setSelectedHeroes(data)
    }

    let isDisabledTrue = false;
    if(loading || buttonDB) {
        isDisabledTrue = true
    }

    return (
        <Box sx={styles.mainContainer}>
            <HeaderTitles/>
            <Navigation>
                <div>
                    <Button  variant="contained"  onClick={handleOpenModal1}>find counterpicks</Button>
                    <Modal
                        open={openModal1}
                        onClose={handleCloseModal1}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styles.modal}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Сounterpicks
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, mb: '20px' }}>
                                {loading ? <CircularProgress/> : answerGPT}
                            </Typography>
                            <Button disabled={isDisabledTrue}  variant="contained"  onClick={handleButton}>Post team to Database</Button>
                        </Box>
                    </Modal>
                </div>
                <TextField focused sx={styles.textField}  onChange={(event)=>{
                    setSearchSomeHero(event.target.value)}} fullWidth  label="search" id="fullWidth"/>
                <div>
                    <Button variant="contained" onClick={handleOpenModal2('paper')}>previous</Button>
                    <Dialog
                        open={openModal2}
                        onClose={handleCloseModal2}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        sx={{'.MuiPaper-root': {maxWidth: '1200px', width: '100%', backgroundImage: 'linear-gradient(to right, #2a334a, #38466a, #475b8c, #5870af, #6985d3)'}}}
                    >
                        <DialogTitle id="scroll-dialog-title" sx={{color: '#EBEBEB'}}>Previous counterpicks</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                {teamDB?.map((item,i) => {
                                    return(
                                        <Box key={i} sx={styles.card}>
                                            <Typography sx={{pt: '20px'}}>
                                                Team: {item.team.map((el, j) =>{
                                                    return(
                                                        <span key={j}>{el}</span>
                                                    )
                                                })}
                                            </Typography>
                                            <Typography sx={{pt: '10px'}}>
                                                {item.answer}
                                            </Typography>
                                        </Box>
                                    )
                                })}
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
            </Navigation>

            <Heroes searchHero={searchSomeHero} connectSelectedHeroes={connectSelectedHeroes}/>
            <Footer/>
        </Box>
    );
}
