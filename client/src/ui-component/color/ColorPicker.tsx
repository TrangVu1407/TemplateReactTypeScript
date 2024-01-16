import React, { useState, useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { Button, Dialog, Paper, DialogActions } from '@mui/material';

interface ColorPickerProps {
    onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
    const [color, setColor] = useState<string>('#ffffff');
    const [isPickerOpen, setPickerOpen] = useState(false);
    const dialogContentRef = useRef<HTMLDivElement>(null);

    const handleColorChange = (newColor: any) => {
        setColor(newColor.hex);
        onChange(newColor.hex);
    };

    const handleOpenPicker = () => {
        setPickerOpen(true);
    };

    const handleClosePicker = () => {
        setPickerOpen(false);
    };

    const handleClickInsideDialog = (event: MouseEvent) => {
        if (dialogContentRef.current && dialogContentRef.current.contains(event.target as Node)) {
            // Nếu sự kiện click xảy ra trong nội dung của dialog, không đóng dialog
            return;
        }
    };

    useEffect(() => {
        if (isPickerOpen) {
            document.addEventListener('mousedown', handleClickInsideDialog);
        } else {
            document.removeEventListener('mousedown', handleClickInsideDialog);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickInsideDialog);
        };
    }, [isPickerOpen]);

    return (
        <div>
            <Button variant="outlined" onClick={handleOpenPicker}>
                Chọn màu
            </Button>
            <Dialog open={isPickerOpen} PaperComponent={Paper}>
                <SketchPicker color={color} onChange={handleColorChange} />
                <DialogActions>
                    <Button variant="outlined" onClick={handleClosePicker}>
                        Đóng
                    </Button>
                    <Button variant="contained" onClick={handleClosePicker}>
                        Chọn
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ColorPicker;
