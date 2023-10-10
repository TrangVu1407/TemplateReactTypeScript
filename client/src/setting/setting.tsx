import React, { useState, useEffect } from 'react';
import './setting.css'
import { IconSettings } from "@tabler/icons-react";
import { Tooltip, Fab, Drawer, Grid, FormControl, RadioGroup, FormControlLabel, Radio, Divider } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import Switch from '@mui/material/Switch';
import { useDispatch } from "react-redux";
import { SET_THEMES, SET_FONT_FAMILY } from "store/actions";
import type { action } from "store/customizationReducer"

import SettingCard from "ui-component/cards/Setting";
interface Props {
    change: (e: React.FormEvent) => void;
    themes: boolean;
    fontFamily: string;
    setFontFamily: React.Dispatch<React.SetStateAction<string>>;
}

const Setting: React.FC<Props> = ({ change, themes, fontFamily, setFontFamily }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        let newThemes = true;
        switch (themes) {
            case true:
                newThemes = true;
                break;
            case false:
            default:
                newThemes = false;
                break;
        }
        dispatch(actionSetTheme({ type: SET_THEMES, themes: newThemes }));
    }, [dispatch, themes]);
    const actionSetTheme = ({ type, themes }: action) => ({
        type: type,
        themes: themes
    });

    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case "Inter":
                newFont = "Inter";
                break;
            case "Poppins":
                newFont = "Poppins";
                break;
            case "Neucha":
                newFont = "Neucha";
                break;
            case "Roboto":
            default:
                newFont = "Roboto";
                break;
        }
        dispatch(actionSetFontFamily({ type: SET_FONT_FAMILY, fontFamily: newFont }));
    }, [dispatch, fontFamily]);
    const actionSetFontFamily = ({ type, fontFamily }: action) => ({
        type: type,
        fontFamily: fontFamily
    });

    const labelTheme = { inputProps: { 'aria-label': 'Background color' } };
    return (
        <>
            <Tooltip title="Cài đặt">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        top: "25%",
                        position: "fixed",
                        right: 10,
                    }}
                >
                    <IconSettings />
                </Fab>
            </Tooltip>
            {/* //from hiện lên khi ấn vào setting */}
            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280,
                    },
                }}
            >
                <PerfectScrollbar component="div">
                    <Grid container spacing={3} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            <SettingCard title="Font Family" sx={{ borderColor: 'red', borderColorHr: 'blue' }}>
                                <FormControl>
                                    <RadioGroup
                                        aria-label="font-family"
                                        value={fontFamily}
                                        onChange={(e) => setFontFamily(e.target.value)}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="Roboto"
                                            control={
                                                <Radio
                                                    style={{ color: "red" }}
                                                />
                                            }
                                            label="Roboto"
                                            sx={{
                                                "& .MuiSvgIcon-root": { fontSize: 28 },
                                                "& .MuiFormControlLabel-label": {
                                                    color: "red"
                                                },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Poppins"
                                            control={
                                                <Radio
                                                    style={{ color: "red" }}
                                                />
                                            }
                                            label="Poppins"
                                            sx={{
                                                "& .MuiSvgIcon-root": { fontSize: 28 },
                                                "& .MuiFormControlLabel-label": {
                                                    color: "red"
                                                },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Inter"
                                            control={
                                                <Radio
                                                    style={{ color: "red" }}
                                                />
                                            }
                                            label="Inter"
                                            sx={{
                                                "& .MuiSvgIcon-root": { fontSize: 28 },
                                                "& .MuiFormControlLabel-label": {
                                                    color: "red"
                                                },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Neucha"
                                            control={
                                                <Radio
                                                    style={{ color: "red" }}
                                                />
                                            }
                                            label="Neucha"
                                            sx={{
                                                "& .MuiSvgIcon-root": { fontSize: 28 },
                                                "& .MuiFormControlLabel-label": {
                                                    color: "red"
                                                },
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </SettingCard>

                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            <SettingCard title="Chủ đề" sx={{ borderColor: 'red', borderColorHr: 'blue' }}>
                                <FormControl>
                                    <RadioGroup
                                        aria-label="theme"
                                        value={themes ? 'dark' : 'light'}
                                        onChange={change}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="light"
                                            control={
                                                <Radio
                                                    style={{ color: "red" }}
                                                />
                                            }
                                            label="light"
                                            sx={{
                                                "& .MuiSvgIcon-root": { fontSize: 28 },
                                                "& .MuiFormControlLabel-label": {
                                                    color: "red"
                                                },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="dark"
                                            control={
                                                <Radio
                                                    style={{ color: "red" }}
                                                />
                                            }
                                            label="dark"
                                            sx={{
                                                "& .MuiSvgIcon-root": { fontSize: 28 },
                                                "& .MuiFormControlLabel-label": {
                                                    color: "red"
                                                },
                                            }}
                                        />
                                    </RadioGroup>

                                </FormControl>
                                <Divider sx={{ opacity: 1, borderColor: "red" }} />
                                <Switch {...labelTheme} color="default" onChange={change} checked={themes} />
                            </SettingCard>
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </Drawer>
        </>
    )
}

export default Setting