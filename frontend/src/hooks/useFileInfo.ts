import { useCallback, useState } from "react";

function useFileInfo(): [
    {
        imageURL?: string;
        imageFile?: File;
    },
    (event: React.ChangeEvent<HTMLInputElement>) => void,
    () => boolean
] {
    const [imageFileInfo, setImageFileInfo] = useState<{ imageURL?: string, imageFile?: File }>({
        imageURL: undefined,
        imageFile: undefined
    });

    const onChangeImageFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const file = (event.currentTarget.files as FileList)[0];

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setImageFileInfo({
				imageFile: file, 
				imageURL: fileReader.result as string
			});
		};

		fileReader.readAsDataURL(file);
	}, []);

    const validImageFileName = useCallback(() => {
		return imageFileInfo.imageFile !== undefined;
	}, [imageFileInfo]);

    return [imageFileInfo, onChangeImageFile, validImageFileName];
}

export default useFileInfo;