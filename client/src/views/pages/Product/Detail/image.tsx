import * as React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, IconButton, Button, Grid } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Props {
    images: { featured: boolean; img: string; title: string }[];
    setImages: React.Dispatch<React.SetStateAction<{ featured: boolean; img: string; title: string }[]>>;
}

const Image: React.FC<Props> = ({ images, setImages }) => {
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];

            if (file) {
                // Kiểm tra xem file có phải là hình ảnh không
                if (!file.type.startsWith('image/')) {
                    console.warn("Chỉ chấp nhận tệp hình ảnh");
                    return;
                }

                const imageUrl = await readFileAsDataURL(file);

                // Kiểm tra xem imageUrl có giá trị hợp lệ và chưa tồn tại trong danh sách hay không
                if (imageUrl && !images.some(img => img.img === imageUrl)) {
                    setImages((prevImages) => [
                        ...prevImages,
                        {
                            featured: false,
                            img: imageUrl,
                            // chỗ này là lấy những ký tự trước dấu .
                            title: file.name.substring(0, file.name.lastIndexOf('.')),
                        },
                    ]);
                } else {
                    console.warn("Invalid image URL or image already exists");
                }
            }
        } catch (error) {
            console.error("Error handling file upload:", error);
        }
    };

    const readFileAsDataURL = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (typeof result === "string") {
                    resolve(result);
                } else {
                    reject(new Error("Failed to read file as data URL."));
                }
            };

            reader.onerror = () => {
                reject(new Error("Error reading file."));
            };

            reader.readAsDataURL(file);
        });
    };

    const calculateImageListHeight = (length: number) => {
        return length === 2 ? 350 : 280;
    };

    const calculateImageListHeight_v0 = (length: number) => {
        return length < 2 ? 0 : 350;
    };

    return (
        <div>
            {images.length > 0 ? (
                <ImageList
                    sx={{
                        height: calculateImageListHeight_v0(images.length),
                        overflow: 'auto',
                        scrollbarWidth: '0px',
                        '&::-webkit-scrollbar': {
                            width: '0px',
                        },
                    }}
                    rowHeight={calculateImageListHeight(images.length)}
                    gap={2}
                >
                    {images.slice(1).map((item, index) => {
                        let rows = 1;
                        const cols = index === 0 ? 2 : 1;

                        // Chỉnh chiều cao ảnh đầu tiên nếu nó lớn hơn 290
                        const adjustedHeight = images.length < 3 ? 320 : (index === 0 ? Math.min(290, rows * 200) : rows * 200);
                        return (
                            <ImageListItem key={index} cols={cols} rows={rows}>
                                <img src={item.img} alt={item.title} loading="lazy" style={{ height: adjustedHeight }} />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    }}
                                    title={item.title}
                                    position="top"
                                    actionIcon={
                                        <IconButton sx={{ color: 'white' }} aria-label={`star ${item.title}`}>
                                            <StarBorderIcon />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                />
                            </ImageListItem>
                        );
                    })}
                </ImageList>
            ) : (
                <p>Không có ảnh.</p>
            )}
            <Grid container justifyContent="center" style={{ marginTop: images.length < 2 ? 0 : 10 }}>
                <Grid item xs={12}>
                    <label htmlFor="upload-photo" style={{ width: '100%' }}>
                        <input
                            id="upload-photo"
                            type="file"
                            onChange={handleFileUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <Button
                            color={images.length < 2 ? 'error' : 'primary'}
                            startIcon={<CloudUploadIcon />}
                            variant="outlined"
                            component="span"
                            sx={{ width: '100%', height: images.length < 2 ? '350px' : '100%', }}
                        >
                            Tải lên ảnh
                        </Button>
                    </label>
                </Grid>
            </Grid>
        </div>
    );
};

export default Image;
