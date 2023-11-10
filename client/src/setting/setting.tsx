import React, { useState, useEffect } from 'react';
import './setting.css'
import { IconSettings } from "@tabler/icons-react";
import { Tooltip, Fab, Drawer, Grid, FormControl, RadioGroup, FormControlLabel, Radio, Divider } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import Switch from '@mui/material/Switch';
import { useDispatch } from "react-redux";
import { SET_THEMES, SET_FONT_FAMILY } from "store/actions";
import type { action } from "store/customizationReducer"
import config from "config"
import i18next from "i18next"

import SettingCard from "ui-component/cards/Setting";

const Setting = () => {
    const [fontFamily, setFontFamily] = useState(config.fontFamily);
    const [darkMode, setDarkMode] = useState<boolean>(config.themes);
    const [language, setLanguage] = useState<string>(config.language);

    useEffect(() => {
        i18next.changeLanguage(language)
    }, [language])

    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const handleToggle = () => {
        setOpen(!open);
    };


    useEffect(() => {
        let newThemes = true;
        switch (darkMode) {
            case true:
                newThemes = true;
                break;
            case false:
            default:
                newThemes = false;
                break;
        }
        dispatch(actionSetTheme({ type: SET_THEMES, themes: newThemes }));
    }, [dispatch, darkMode]);
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

    var str2bool = (value: any) => {
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") return true;
            if (value.toLowerCase() === "false") return false;
        }
        return value;
    }

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
                                        value={darkMode}
                                        onChange={(e) => setDarkMode(str2bool(e.target.value))}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value={false}
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
                                            value={true}
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
                                <Switch {...labelTheme} color="default" onChange={(e) => setDarkMode(!darkMode)} checked={darkMode} />
                            </SettingCard>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            <SettingCard title="Language" sx={{ borderColor: 'red', borderColorHr: 'blue' }}>
                                <FormControl>
                                    <RadioGroup
                                        aria-label="language"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value="vn"
                                            control={
                                                <Radio
                                                    style={{ color: "red" }}
                                                />
                                            }
                                            label="Tiếng việt"
                                            sx={{
                                                "& .MuiSvgIcon-root": { fontSize: 28 },
                                                "& .MuiFormControlLabel-label": {
                                                    color: "red"
                                                },
                                            }}
                                        />
                                        <FormControlLabel
                                            value="en"
                                            control={
                                                <Radio
                                                    style={{ color: "red" }}
                                                />
                                            }
                                            label="English"
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
                </PerfectScrollbar>
            </Drawer>
        </>
    )
}

export default Setting